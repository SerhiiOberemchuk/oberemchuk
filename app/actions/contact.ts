"use server";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  getContactEmailMessages,
  getEmailLocale,
  getEmailMessage,
  getReadableContactValue,
  sendContactSubmission,
} from "@/lib/contact-email";
import { appLocales } from "@/i18n/locales";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  messageKey?:
    | "validation.nameRequired"
    | "validation.emailRequired"
    | "validation.emailInvalid"
    | "validation.messageRequired"
    | "submit.success"
    | "submit.error";
};

const contactRateLimitCookieName = "contact_rl";
const contactRateLimitWindowMs = 10 * 60 * 1000;
const contactRateLimitDayMs = 24 * 60 * 60 * 1000;
const contactRateLimitWindowMax = 3;
const contactRateLimitDayMax = 8;
const contactRateLimitCooldownMs = 45 * 1000;
const contactMinimumFillTimeMs = 3000;
const contactMaximumFillTimeMs = 24 * 60 * 60 * 1000;

const contactSchema = z.object({
  locale: z.enum(appLocales),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(180),
  phone: z.string().trim().max(80).optional(),
  service: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(2000),
});

const rateLimitStateSchema = z.object({
  windowStart: z.number().int().nonnegative(),
  windowCount: z.number().int().nonnegative(),
  dayStart: z.number().int().nonnegative(),
  dayCount: z.number().int().nonnegative(),
  lastAt: z.number().int().nonnegative(),
});

type RateLimitState = z.infer<typeof rateLimitStateSchema>;

function getFormString(formData: FormData, key: string) {
  return formData.get(key)?.toString() ?? "";
}

function getRateLimitSecret() {
  return (
    process.env.ESTIMATE_RATE_LIMIT_SECRET ??
    process.env.GMAIL_PASS ??
    process.env.GMAIL_USER ??
    "contact-form"
  );
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function encodeRateLimitState(state: RateLimitState, secret: string) {
  const payload = Buffer.from(JSON.stringify(state), "utf8").toString(
    "base64url",
  );
  return `${payload}.${signValue(payload, secret)}`;
}

function decodeRateLimitState(rawValue: string | undefined, secret: string) {
  if (!rawValue) {
    return null;
  }

  const [payload, signature] = rawValue.split(".");

  if (
    !payload ||
    !signature ||
    !safeEqual(signature, signValue(payload, secret))
  ) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    const parsed = rateLimitStateSchema.safeParse(decoded);

    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function getNextRateLimitState(current: RateLimitState | null, now: number) {
  const state: RateLimitState = current ?? {
    windowStart: now,
    windowCount: 0,
    dayStart: now,
    dayCount: 0,
    lastAt: 0,
  };

  if (now - state.windowStart > contactRateLimitWindowMs) {
    state.windowStart = now;
    state.windowCount = 0;
  }

  if (now - state.dayStart > contactRateLimitDayMs) {
    state.dayStart = now;
    state.dayCount = 0;
  }

  const limited =
    now - state.lastAt < contactRateLimitCooldownMs ||
    state.windowCount >= contactRateLimitWindowMax ||
    state.dayCount >= contactRateLimitDayMax;

  if (!limited) {
    state.windowCount += 1;
    state.dayCount += 1;
    state.lastAt = now;
  }

  return { limited, state };
}

function isSuspiciousPromotion(message: string) {
  const normalized = message.toLowerCase();

  return [
    "targeted instagram followers",
    "instagram presence",
    "manual outreach and ads",
    "add 300+",
    "brand-new profile",
  ].some((pattern) => normalized.includes(pattern));
}

function shouldDiscardSubmission(formData: FormData) {
  if (getFormString(formData, "company")) {
    return true;
  }

  const startedAt = Number(getFormString(formData, "startedAt"));
  const elapsed = Date.now() - startedAt;

  if (
    !Number.isFinite(startedAt) ||
    elapsed < contactMinimumFillTimeMs ||
    elapsed > contactMaximumFillTimeMs
  ) {
    return true;
  }

  return isSuspiciousPromotion(getFormString(formData, "message"));
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  if (shouldDiscardSubmission(formData)) {
    return { status: "success", messageKey: "submit.success" };
  }

  const locale = getEmailLocale(formData.get("locale")?.toString());
  const messages = getContactEmailMessages(locale);
  const fallbackNotProvided = getEmailMessage(
    messages,
    "fallbacks.notProvided",
  );

  const parsed = contactSchema.safeParse({
    locale,
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    service: getFormString(formData, "service"),
    budget: getFormString(formData, "budget"),
    message: getFormString(formData, "message"),
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    if (firstIssue?.path[0] === "name") {
      return { status: "error", messageKey: "validation.nameRequired" };
    }

    if (firstIssue?.path[0] === "email") {
      const rawEmail = formData.get("email")?.toString().trim();
      return {
        status: "error",
        messageKey: rawEmail
          ? "validation.emailInvalid"
          : "validation.emailRequired",
      };
    }

    if (firstIssue?.path[0] === "message") {
      return { status: "error", messageKey: "validation.messageRequired" };
    }

    return { status: "error", messageKey: "submit.error" };
  }

  const secret = getRateLimitSecret();
  const cookieStore = await cookies();
  const now = Date.now();
  const rateLimit = getNextRateLimitState(
    decodeRateLimitState(
      cookieStore.get(contactRateLimitCookieName)?.value,
      secret,
    ),
    now,
  );

  cookieStore.set(
    contactRateLimitCookieName,
    encodeRateLimitState(rateLimit.state, secret),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: Math.ceil(contactRateLimitDayMs / 1000),
      path: "/",
    },
  );

  if (rateLimit.limited) {
    return { status: "error", messageKey: "submit.error" };
  }

  try {
    await sendContactSubmission({
      locale: parsed.data.locale,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || fallbackNotProvided,
      service: getReadableContactValue(
        messages,
        "service",
        parsed.data.service || fallbackNotProvided,
      ),
      budget: getReadableContactValue(
        messages,
        "budget",
        parsed.data.budget || fallbackNotProvided,
      ),
      message: parsed.data.message,
    });

    return {
      status: "success",
      messageKey: "submit.success",
    };
  } catch (error) {
    console.error(getEmailMessage(messages, "errors.consolePrefix"), error);

    return {
      status: "error",
      messageKey: "submit.error",
    };
  }
}
