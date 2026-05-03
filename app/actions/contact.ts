"use server";

import { z } from "zod";
import {
  getContactEmailMessages,
  getEmailLocale,
  getEmailMessage,
  getReadableContactValue,
  sendContactSubmission,
  type ContactLocale,
} from "@/lib/contact-email";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  messageKey?: "validation.nameRequired" | "validation.emailRequired" | "validation.emailInvalid" | "validation.messageRequired" | "submit.success" | "submit.error";
};

const contactSchema = z.object({
  locale: z.enum(["uk", "en", "it"]),
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  service: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(1),
});

export const initialContactActionState: ContactActionState = {
  status: "idle",
};

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const locale = getEmailLocale(formData.get("locale")?.toString());
  const messages = getContactEmailMessages(locale);
  const fallbackNotProvided = getEmailMessage(messages, "fallbacks.notProvided");

  const parsed = contactSchema.safeParse({
    locale,
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    message: formData.get("message"),
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
        messageKey: rawEmail ? "validation.emailInvalid" : "validation.emailRequired",
      };
    }

    if (firstIssue?.path[0] === "message") {
      return { status: "error", messageKey: "validation.messageRequired" };
    }

    return { status: "error", messageKey: "submit.error" };
  }

  try {
    await sendContactSubmission({
      locale: parsed.data.locale as ContactLocale,
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
