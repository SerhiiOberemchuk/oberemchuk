"use server";

import {createGateway, generateObject} from "ai";
import {createHmac, timingSafeEqual} from "crypto";
import {cookies, headers} from "next/headers";
import {z} from "zod";
import {
  getContactEmailMessages,
  getEmailLocale,
  getEmailMessage,
  sendEstimateLeadSubmission,
} from "@/lib/contact-email";
import { appLocales } from "@/i18n/locales";

const localeSchema = z.enum(appLocales);
const rateLimitCookieName = "estimate_rl";
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitDayMs = 24 * 60 * 60 * 1000;
const rateLimitWindowMax = 3;
const rateLimitDayMax = 10;
const rateLimitCooldownMs = 45 * 1000;
const estimateLeadRateLimitCookieName = "estimate_lead_rl";
const estimateLeadRateLimitWindowMax = 4;

const projectEstimateInputSchema = z.object({
  locale: localeSchema,
  projectType: z.string().trim().min(1),
  description: z.string().trim().min(40).max(2200),
  goals: z.string().trim().max(800).optional(),
  pagesCount: z.string().trim().min(1),
  designReadiness: z.string().trim().min(1),
  deadline: z.string().trim().min(1),
  budget: z.string().trim().optional(),
  integrations: z.string().trim().max(600).optional(),
  features: z.array(z.string().trim()).max(10).default([]),
});

const projectEstimateLeadSchema = z.object({
  locale: localeSchema,
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(80).optional(),
  message: z.string().trim().min(1).max(1200),
  projectType: z.string().trim().max(160).optional(),
  pagesCount: z.string().trim().max(160).optional(),
  designReadiness: z.string().trim().max(160).optional(),
  deadline: z.string().trim().max(160).optional(),
  budget: z.string().trim().max(160).optional(),
  integrations: z.string().trim().max(600).optional(),
  features: z.string().trim().max(600).optional(),
  projectDescription: z.string().trim().max(2200).optional(),
  goals: z.string().trim().max(800).optional(),
  estimateSummary: z.string().trim().max(1800).optional(),
  estimateRange: z.string().trim().max(160).optional(),
  estimateTimeline: z.string().trim().max(160).optional(),
  estimateConfidence: z.string().trim().max(80).optional(),
  estimateFormat: z.string().trim().max(260).optional(),
  estimateDetails: z.string().trim().max(4000).optional(),
});

const rateLimitStateSchema = z.object({
  windowStart: z.number().int().nonnegative(),
  windowCount: z.number().int().nonnegative(),
  dayStart: z.number().int().nonnegative(),
  dayCount: z.number().int().nonnegative(),
  lastAt: z.number().int().nonnegative(),
});

type RateLimitState = z.infer<typeof rateLimitStateSchema>;

const estimateResultSchema = z.object({
  summary: z.string(),
  costMin: z.number().int().positive(),
  costMax: z.number().int().positive(),
  currency: z.enum(["EUR", "USD", "UAH"]),
  timelineMinWeeks: z.number().int().positive(),
  timelineMaxWeeks: z.number().int().positive(),
  confidence: z.enum(["low", "medium", "high"]),
  recommendedFormat: z.string(),
  phases: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      description: z.string(),
    }),
  ).min(3).max(6),
  includedScope: z.array(z.string()).min(3).max(8),
  assumptions: z.array(z.string()).min(2).max(6),
  risks: z.array(z.string()).min(1).max(5),
  nextQuestions: z.array(z.string()).min(2).max(5),
});

export type ProjectEstimateResult = z.infer<typeof estimateResultSchema>;

export type ProjectEstimateActionState = {
  status: "idle" | "success" | "error";
  messageKey?:
    | "validation.description"
    | "validation.required"
    | "submit.missingKey"
    | "submit.rateLimited"
    | "submit.error";
  result?: ProjectEstimateResult;
};

export type EstimateLeadActionState = {
  status: "idle" | "success" | "error";
  messageKey?:
    | "lead.validation.nameRequired"
    | "lead.validation.emailRequired"
    | "lead.validation.emailInvalid"
    | "lead.validation.messageRequired"
    | "lead.submit.rateLimited"
    | "lead.submit.success"
    | "lead.submit.error";
};

function getFormString(formData: FormData, key: string) {
  return formData.get(key)?.toString() ?? "";
}

function getSignatureSecret(apiKey: string) {
  return process.env.ESTIMATE_RATE_LIMIT_SECRET ?? apiKey;
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function encodeRateLimitState(state: RateLimitState, secret: string) {
  const payload = Buffer.from(JSON.stringify(state), "utf8").toString("base64url");
  return `${payload}.${signValue(payload, secret)}`;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function decodeRateLimitState(rawValue: string | undefined, secret: string) {
  if (!rawValue) {
    return null;
  }

  const [payload, signature] = rawValue.split(".");

  if (!payload || !signature || !safeEqual(signature, signValue(payload, secret))) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
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

  if (now - state.windowStart > rateLimitWindowMs) {
    state.windowStart = now;
    state.windowCount = 0;
  }

  if (now - state.dayStart > rateLimitDayMs) {
    state.dayStart = now;
    state.dayCount = 0;
  }

  const limited =
    now - state.lastAt < rateLimitCooldownMs ||
    state.windowCount >= rateLimitWindowMax ||
    state.dayCount >= rateLimitDayMax;

  if (!limited) {
    state.windowCount += 1;
    state.dayCount += 1;
    state.lastAt = now;
  }

  return {limited, state};
}

function getNextEstimateLeadRateLimitState(
  current: RateLimitState | null,
  now: number,
) {
  const state: RateLimitState = current ?? {
    windowStart: now,
    windowCount: 0,
    dayStart: now,
    dayCount: 0,
    lastAt: 0,
  };

  if (now - state.windowStart > rateLimitWindowMs) {
    state.windowStart = now;
    state.windowCount = 0;
  }

  if (now - state.dayStart > rateLimitDayMs) {
    state.dayStart = now;
    state.dayCount = 0;
  }

  const limited =
    now - state.lastAt < rateLimitCooldownMs ||
    state.windowCount >= estimateLeadRateLimitWindowMax ||
    state.dayCount >= rateLimitDayMax;

  if (!limited) {
    state.windowCount += 1;
    state.dayCount += 1;
    state.lastAt = now;
  }

  return {limited, state};
}

function maskIp(ip: string) {
  if (!ip) {
    return "unknown";
  }

  if (ip.includes(":")) {
    return `${ip.split(":").slice(0, 3).join(":")}:…`;
  }

  const parts = ip.split(".");
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.x` : ip;
}

function getRequestIp(requestHeaders: Headers) {
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    ""
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function trimForTelegram(value: string, maxLength = 900) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

async function notifyTelegram({
  input,
  result,
  ip,
  userAgent,
}: {
  input: z.infer<typeof projectEstimateInputSchema>;
  result: ProjectEstimateResult;
  ip: string;
  userAgent: string;
}) {
  const botToken =
    process.env.OBEREMCHUK_ONLINE_TELEGRAM_BOT_TOKEN ??
    process.env.TELEGRAM_BOT_TOKEN;
  const chatId =
    process.env.OBEREMCHUK_ONLINE_TELEGRAM_CHAT_ID ??
    process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return;
  }

  const text = [
    "<b>Новий AI-розрахунок проєкту</b>",
    "",
    `<b>Тип:</b> ${escapeHtml(input.projectType)}`,
    `<b>Обсяг:</b> ${escapeHtml(input.pagesCount)}`,
    `<b>Дизайн:</b> ${escapeHtml(input.designReadiness)}`,
    `<b>Термін:</b> ${escapeHtml(input.deadline)}`,
    `<b>Бюджет:</b> ${escapeHtml(input.budget || "не вказано")}`,
    `<b>Функції:</b> ${escapeHtml(input.features.join(", ") || "не вказано")}`,
    "",
    `<b>Оцінка:</b> ${result.costMin}-${result.costMax} ${result.currency}, ${result.timelineMinWeeks}-${result.timelineMaxWeeks} тиж.`,
    `<b>Точність:</b> ${escapeHtml(result.confidence)}`,
    "",
    `<b>Опис:</b>\n${escapeHtml(trimForTelegram(input.description))}`,
    input.goals ? `\n<b>Цілі:</b>\n${escapeHtml(trimForTelegram(input.goals, 500))}` : "",
    input.integrations
      ? `\n<b>Інтеграції:</b>\n${escapeHtml(trimForTelegram(input.integrations, 400))}`
      : "",
    "",
    `<b>IP:</b> ${escapeHtml(maskIp(ip))}`,
    `<b>User-Agent:</b> ${escapeHtml(trimForTelegram(userAgent || "unknown", 180))}`,
  ].filter(Boolean).join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (error) {
    console.error("Project estimate Telegram notification failed", error);
  }
}

export async function calculateProjectEstimate(
  _prevState: ProjectEstimateActionState,
  formData: FormData,
): Promise<ProjectEstimateActionState> {
  if (getFormString(formData, "company")) {
    return {
      status: "error",
      messageKey: "submit.error",
    };
  }

  const parsed = projectEstimateInputSchema.safeParse({
    locale: getFormString(formData, "locale"),
    projectType: getFormString(formData, "projectType"),
    description: getFormString(formData, "description"),
    goals: getFormString(formData, "goals"),
    pagesCount: getFormString(formData, "pagesCount"),
    designReadiness: getFormString(formData, "designReadiness"),
    deadline: getFormString(formData, "deadline"),
    budget: getFormString(formData, "budget"),
    integrations: getFormString(formData, "integrations"),
    features: formData.getAll("features").map((item) => item.toString()),
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    return {
      status: "error",
      messageKey:
        firstIssue?.path[0] === "description"
          ? "validation.description"
          : "validation.required",
    };
  }

  const apiKey =
    process.env.OBEREMCHUK_ONLINE_AI_GATEWAY_API_KEY ??
    process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    return {
      status: "error",
      messageKey: "submit.missingKey",
    };
  }

  const gateway = createGateway({apiKey});
  const cookieStore = await cookies();
  const secret = getSignatureSecret(apiKey);
  const now = Date.now();
  const rateLimit = getNextRateLimitState(
    decodeRateLimitState(cookieStore.get(rateLimitCookieName)?.value, secret),
    now,
  );

  cookieStore.set(rateLimitCookieName, encodeRateLimitState(rateLimit.state, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: Math.ceil(rateLimitDayMs / 1000),
    path: "/",
  });

  if (rateLimit.limited) {
    return {
      status: "error",
      messageKey: "submit.rateLimited",
    };
  }

  try {
    const {object} = await generateObject({
      model: gateway("openai/gpt-5.4-mini"),
      schema: estimateResultSchema,
      temperature: 0.2,
      maxOutputTokens: 1200,
      system: [
        "You are a senior web product estimator for freelance and small business projects.",
        "Return only realistic planning ranges, not fixed promises.",
        "Use the user's locale for all prose fields.",
        "Use EUR as the default currency unless the request clearly asks for another currency.",
        "Estimate for professional custom web development: discovery, UX/UI, frontend, backend/CMS when relevant, QA, launch support.",
        "Do not invent exact third-party prices. Mention assumptions and risks instead.",
      ].join("\n"),
      prompt: JSON.stringify({
        locale: parsed.data.locale,
        projectType: parsed.data.projectType,
        description: parsed.data.description,
        goals: parsed.data.goals || "not specified",
        pagesCount: parsed.data.pagesCount,
        designReadiness: parsed.data.designReadiness,
        deadline: parsed.data.deadline,
        budget: parsed.data.budget || "not specified",
        integrations: parsed.data.integrations || "not specified",
        features: parsed.data.features,
      }),
    });

    const requestHeaders = await headers();
    await notifyTelegram({
      input: parsed.data,
      result: object,
      ip: getRequestIp(requestHeaders),
      userAgent: requestHeaders.get("user-agent") ?? "",
    });

    return {
      status: "success",
      result: object,
    };
  } catch (error) {
    console.error("Project estimate AI calculation failed", error);

    return {
      status: "error",
      messageKey: "submit.error",
    };
  }
}

export async function submitProjectEstimateLead(
  _prevState: EstimateLeadActionState,
  formData: FormData,
): Promise<EstimateLeadActionState> {
  if (getFormString(formData, "estimateLeadCompany")) {
    return {
      status: "error",
      messageKey: "lead.submit.error",
    };
  }

  const locale = getEmailLocale(getFormString(formData, "locale"));
  const messages = getContactEmailMessages(locale);
  const fallbackNotProvided = getEmailMessage(messages, "fallbacks.notProvided");

  const parsed = projectEstimateLeadSchema.safeParse({
    locale,
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    message: getFormString(formData, "message"),
    projectType: getFormString(formData, "projectType"),
    pagesCount: getFormString(formData, "pagesCount"),
    designReadiness: getFormString(formData, "designReadiness"),
    deadline: getFormString(formData, "deadline"),
    budget: getFormString(formData, "budget"),
    integrations: getFormString(formData, "integrations"),
    features: getFormString(formData, "features"),
    projectDescription: getFormString(formData, "projectDescription"),
    goals: getFormString(formData, "goals"),
    estimateSummary: getFormString(formData, "estimateSummary"),
    estimateRange: getFormString(formData, "estimateRange"),
    estimateTimeline: getFormString(formData, "estimateTimeline"),
    estimateConfidence: getFormString(formData, "estimateConfidence"),
    estimateFormat: getFormString(formData, "estimateFormat"),
    estimateDetails: getFormString(formData, "estimateDetails"),
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    if (firstIssue?.path[0] === "name") {
      return {status: "error", messageKey: "lead.validation.nameRequired"};
    }

    if (firstIssue?.path[0] === "email") {
      return {
        status: "error",
        messageKey: getFormString(formData, "email")
          ? "lead.validation.emailInvalid"
          : "lead.validation.emailRequired",
      };
    }

    if (firstIssue?.path[0] === "message") {
      return {status: "error", messageKey: "lead.validation.messageRequired"};
    }

    return {status: "error", messageKey: "lead.submit.error"};
  }

  const secretSource =
    process.env.ESTIMATE_RATE_LIMIT_SECRET ??
    process.env.GMAIL_PASS ??
    process.env.GMAIL_USER ??
    "estimate-lead";
  const cookieStore = await cookies();
  const now = Date.now();
  const rateLimit = getNextEstimateLeadRateLimitState(
    decodeRateLimitState(
      cookieStore.get(estimateLeadRateLimitCookieName)?.value,
      secretSource,
    ),
    now,
  );

  cookieStore.set(
    estimateLeadRateLimitCookieName,
    encodeRateLimitState(rateLimit.state, secretSource),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: Math.ceil(rateLimitDayMs / 1000),
      path: "/",
    },
  );

  if (rateLimit.limited) {
    return {status: "error", messageKey: "lead.submit.rateLimited"};
  }

  try {
    await sendEstimateLeadSubmission({
      locale: parsed.data.locale,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || fallbackNotProvided,
      message: parsed.data.message,
      projectType: parsed.data.projectType || fallbackNotProvided,
      pagesCount: parsed.data.pagesCount || fallbackNotProvided,
      designReadiness: parsed.data.designReadiness || fallbackNotProvided,
      deadline: parsed.data.deadline || fallbackNotProvided,
      budget: parsed.data.budget || fallbackNotProvided,
      integrations: parsed.data.integrations || fallbackNotProvided,
      features: parsed.data.features || fallbackNotProvided,
      projectDescription: parsed.data.projectDescription || fallbackNotProvided,
      goals: parsed.data.goals || fallbackNotProvided,
      estimateSummary: parsed.data.estimateSummary || fallbackNotProvided,
      estimateRange: parsed.data.estimateRange || fallbackNotProvided,
      estimateTimeline: parsed.data.estimateTimeline || fallbackNotProvided,
      estimateConfidence: parsed.data.estimateConfidence || fallbackNotProvided,
      estimateFormat: parsed.data.estimateFormat || fallbackNotProvided,
      estimateDetails: parsed.data.estimateDetails || fallbackNotProvided,
    });

    return {
      status: "success",
      messageKey: "lead.submit.success",
    };
  } catch (error) {
    console.error("Project estimate lead email failed", error);

    return {
      status: "error",
      messageKey: "lead.submit.error",
    };
  }
}
