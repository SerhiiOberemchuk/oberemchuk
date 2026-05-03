import nodemailer from "nodemailer";
import enMessages from "@/messages/catalogs/en/ContactEmail.json";
import itMessages from "@/messages/catalogs/it/ContactEmail.json";
import ukMessages from "@/messages/catalogs/uk/ContactEmail.json";
import { contactEmail, contactTelegramHref } from "@/lib/contact-info";

export type ContactLocale = "uk" | "en" | "it";

export interface ContactSubmission {
  locale: ContactLocale;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

type ContactEmailMessages = typeof enMessages;

const contactEmailMessages = {
  en: enMessages,
  it: itMessages,
  uk: ukMessages,
} satisfies Record<ContactLocale, ContactEmailMessages>;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export function getEmailLocale(locale?: string): ContactLocale {
  return locale === "en" || locale === "it" || locale === "uk" ? locale : "uk";
}

export function getContactEmailMessages(locale: ContactLocale): ContactEmailMessages {
  return contactEmailMessages[locale];
}

export function getEmailMessage(messages: ContactEmailMessages, key: string): string {
  return key.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return "";
  }, messages) as string;
}

export function formatMessage(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export function getReadableContactValue(
  messages: ContactEmailMessages,
  key: "service" | "budget",
  value: string,
): string {
  if (key === "service") {
    const label = getEmailMessage(messages, `serviceTypes.${value}`);
    return label || value;
  }

  const label = getEmailMessage(messages, `budgets.${value}`);
  return label || value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function renderDetailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 0 0 10px; width: 170px; color: #64748b; font-size: 14px; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 0 0 10px; color: #0f172a; font-size: 14px; font-weight: 600; vertical-align: top;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function renderEmailLayout(params: {
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  detailsTitle: string;
  detailsTable: string;
  messageTitle: string;
  messageHtml: string;
  footerNote: string;
  brandSubtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}): string {
  const {
    eyebrow,
    title,
    intro,
    summary,
    detailsTitle,
    detailsTable,
    messageTitle,
    messageHtml,
    footerNote,
    brandSubtitle,
    ctaLabel,
    ctaHref,
  } = params;

  const ctaBlock =
    ctaLabel && ctaHref
      ? `
        <tr>
          <td style="padding: 0 32px 32px;">
            <a
              href="${escapeHtml(ctaHref)}"
              style="display: inline-block; padding: 14px 22px; border-radius: 999px; background: linear-gradient(135deg, #d4652d 0%, #b25d2f 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700;"
            >
              ${escapeHtml(ctaLabel)}
            </a>
          </td>
        </tr>
      `
      : "";

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 24px 12px; background: #f8fafc; color: #0f172a; font-family: Inter, Arial, Helvetica, sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 680px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 0 16px; text-align: center; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b25d2f; font-weight: 700;">
                    ${escapeHtml(eyebrow)}
                  </td>
                </tr>
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #20283a 100%); border-radius: 28px 28px 0 0; padding: 36px 32px 28px;">
                    <div style="display: inline-block; padding: 6px 12px; border-radius: 999px; background: rgba(255,255,255,0.12); color: #f0d5c2; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                      Serhii Oberemchuk
                    </div>
                    <h1 style="margin: 18px 0 10px; color: #ffffff; font-size: 32px; line-height: 1.15; font-weight: 800;">
                      ${escapeHtml(title)}
                    </h1>
                    <p style="margin: 0; color: #e6ddd5; font-size: 16px; line-height: 1.6;">
                      ${escapeHtml(intro)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background: #ffffff; padding: 32px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    <div style="padding: 20px 22px; border-radius: 20px; background: #f8fafc; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                      <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.7;">
                        ${escapeHtml(summary)}
                      </p>
                    </div>

                    <div style="border: 1px solid #e2e8f0; border-radius: 20px; padding: 22px; margin-bottom: 24px;">
                      <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 800;">${escapeHtml(detailsTitle)}</h2>
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        ${detailsTable}
                      </table>
                    </div>

                    <div style="border-radius: 20px; padding: 22px; background: #fff7f1; border: 1px solid #f1d3bf;">
                      <h2 style="margin: 0 0 12px; color: #6f3f22; font-size: 18px; font-weight: 800;">${escapeHtml(messageTitle)}</h2>
                      <p style="margin: 0; color: #6f3f22; font-size: 15px; line-height: 1.7;">
                        ${messageHtml}
                      </p>
                    </div>
                  </td>
                </tr>
                ${ctaBlock}
                <tr>
                  <td style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 28px 28px; padding: 0 32px 28px;">
                    <div style="padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0 0 10px; color: #0f172a; font-size: 14px; font-weight: 700;">Serhii Oberemchuk</p>
                      <p style="margin: 0 0 6px; color: #475569; font-size: 13px;">${escapeHtml(brandSubtitle)}</p>
                      <p style="margin: 0 0 6px; color: #475569; font-size: 13px;">Email: <a href="mailto:${escapeHtml(contactEmail)}" style="color: #b25d2f; text-decoration: none;">${escapeHtml(contactEmail)}</a></p>
                      <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.6;">${escapeHtml(footerNote)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function renderAdminEmail(
  messages: ContactEmailMessages,
  data: ContactSubmission,
): string {
  return renderEmailLayout({
    eyebrow: getEmailMessage(messages, "admin.eyebrow"),
    title: formatMessage(getEmailMessage(messages, "admin.title"), {name: data.name}),
    intro: getEmailMessage(messages, "admin.intro"),
    summary: getEmailMessage(messages, "admin.summary"),
    detailsTitle: getEmailMessage(messages, "layout.detailsTitle"),
    detailsTable: [
      renderDetailRow(getEmailMessage(messages, "fields.name"), data.name),
      renderDetailRow(getEmailMessage(messages, "fields.email"), data.email),
      renderDetailRow(getEmailMessage(messages, "fields.phone"), data.phone),
      renderDetailRow(getEmailMessage(messages, "fields.service"), data.service),
      renderDetailRow(getEmailMessage(messages, "fields.budget"), data.budget),
    ].join(""),
    messageTitle: getEmailMessage(messages, "layout.messageTitle"),
    messageHtml: nl2br(data.message),
    footerNote: getEmailMessage(messages, "admin.footerNote"),
    brandSubtitle: getEmailMessage(messages, "layout.brandSubtitle"),
    ctaLabel: getEmailMessage(messages, "admin.ctaLabel"),
    ctaHref: `mailto:${data.email}`,
  });
}

function renderClientEmail(
  messages: ContactEmailMessages,
  data: ContactSubmission,
): string {
  return renderEmailLayout({
    eyebrow: getEmailMessage(messages, "client.eyebrow"),
    title: getEmailMessage(messages, "client.title"),
    intro: formatMessage(getEmailMessage(messages, "client.intro"), {name: data.name}),
    summary: getEmailMessage(messages, "client.summary"),
    detailsTitle: getEmailMessage(messages, "layout.detailsTitle"),
    detailsTable: [
      renderDetailRow(getEmailMessage(messages, "fields.phone"), data.phone),
      renderDetailRow(getEmailMessage(messages, "fields.service"), data.service),
      renderDetailRow(getEmailMessage(messages, "fields.budget"), data.budget),
    ].join(""),
    messageTitle: getEmailMessage(messages, "layout.messageTitle"),
    messageHtml: nl2br(data.message),
    footerNote: getEmailMessage(messages, "client.footerNote"),
    brandSubtitle: getEmailMessage(messages, "layout.brandSubtitle"),
    ctaLabel: getEmailMessage(messages, "client.ctaLabel"),
    ctaHref: contactTelegramHref,
  });
}

export async function sendContactSubmission(data: ContactSubmission): Promise<void> {
  const messages = getContactEmailMessages(data.locale);

  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: formatMessage(getEmailMessage(messages, "admin.subject"), {name: data.name}),
    html: renderAdminEmail(messages, data),
  };

  const clientMailOptions = {
    from: process.env.GMAIL_USER,
    to: data.email,
    subject: getEmailMessage(messages, "client.subject"),
    html: renderClientEmail(messages, data),
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ]);
}
