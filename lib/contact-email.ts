import nodemailer from "nodemailer";
import enMessages from "@/messages/catalogs/en/ContactEmail.json";
import itMessages from "@/messages/catalogs/it/ContactEmail.json";
import ukMessages from "@/messages/catalogs/uk/ContactEmail.json";
import { contactEmail, contactTelegramHref } from "@/lib/contact-info";
import { getSiteUrl } from "@/lib/site-config";

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

export interface EstimateLeadSubmission {
  locale: ContactLocale;
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  pagesCount: string;
  designReadiness: string;
  deadline: string;
  budget: string;
  integrations: string;
  features: string;
  projectDescription: string;
  goals: string;
  estimateSummary: string;
  estimateRange: string;
  estimateTimeline: string;
  estimateConfidence: string;
  estimateFormat: string;
  estimateDetails: string;
}

type ContactEmailMessages = typeof enMessages;

const contactEmailMessages = {
  en: enMessages,
  it: itMessages,
  uk: ukMessages,
} satisfies Record<ContactLocale, ContactEmailMessages>;

const siteUrl = getSiteUrl();
const logoUrl = `${siteUrl}/Logo.svg`;

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
          <td style="background: #ffffff; padding: 0 32px 32px; border-left: 1px solid #d5dde8; border-right: 1px solid #d5dde8;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
              <tr>
                <td bgcolor="#c65f2b" style="background: #c65f2b; border-radius: 999px; mso-padding-alt: 14px 24px;">
                  <a
                    href="${escapeHtml(ctaHref)}"
                    style="display: inline-block; padding: 14px 24px; border-radius: 999px; background: #c65f2b; color: #ffffff; text-decoration: none; font-size: 14px; line-height: 1.2; font-weight: 800;"
                  >
                    ${escapeHtml(ctaLabel)}
                  </a>
                </td>
              </tr>
            </table>
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
      <body style="margin: 0; padding: 24px 12px; background: #f6f9fc; color: #181f2b; font-family: Manrope, Inter, Arial, Helvetica, sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 680px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 0 16px; text-align: center;">
                    <a href="${escapeHtml(siteUrl)}" style="display: inline-block; text-decoration: none;">
                      <img src="${escapeHtml(logoUrl)}" width="44" height="44" alt="Serhii Oberemchuk" style="display: block; width: 44px; height: 44px; margin: 0 auto 10px; border: 0; border-radius: 12px;" />
                      <span style="display: block; color: #b84916; font-size: 12px; line-height: 1.4; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 800;">
                        ${escapeHtml(eyebrow)}
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#181f2b" style="background: #181f2b; border-radius: 28px 28px 0 0; padding: 36px 32px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 10px 0 0; vertical-align: middle;">
                          <img src="${escapeHtml(logoUrl)}" width="36" height="36" alt="" style="display: block; width: 36px; height: 36px; border: 0; border-radius: 10px;" />
                        </td>
                        <td style="vertical-align: middle; color: #f0d5c2; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
                          Serhii Oberemchuk
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin: 18px 0 10px; color: #ffffff; font-size: 32px; line-height: 1.15; font-weight: 800;">
                      ${escapeHtml(title)}
                    </h1>
                    <p style="margin: 0; color: #e6ddd5; font-size: 16px; line-height: 1.6;">
                      ${escapeHtml(intro)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background: #ffffff; padding: 32px; border-left: 1px solid #d5dde8; border-right: 1px solid #d5dde8;">
                    <div style="padding: 20px 22px; border-radius: 20px; background: #f6f9fc; border: 1px solid #d5dde8; margin-bottom: 24px;">
                      <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.7;">
                        ${escapeHtml(summary)}
                      </p>
                    </div>

                    <div style="border: 1px solid #d5dde8; border-radius: 20px; padding: 22px; margin-bottom: 24px;">
                      <h2 style="margin: 0 0 16px; color: #181f2b; font-size: 18px; font-weight: 800;">${escapeHtml(detailsTitle)}</h2>
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
                  <td style="background: #ffffff; border: 1px solid #d5dde8; border-top: 0; border-radius: 0 0 28px 28px; padding: 0 32px 28px;">
                    <div style="padding-top: 20px; border-top: 1px solid #d5dde8;">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 10px;">
                        <tr>
                          <td style="padding: 0 10px 0 0; vertical-align: middle;">
                            <img src="${escapeHtml(logoUrl)}" width="32" height="32" alt="" style="display: block; width: 32px; height: 32px; border: 0; border-radius: 9px;" />
                          </td>
                          <td style="vertical-align: middle; color: #181f2b; font-size: 14px; font-weight: 800;">Serhii Oberemchuk</td>
                        </tr>
                      </table>
                      <p style="margin: 0 0 6px; color: #475569; font-size: 13px;">${escapeHtml(brandSubtitle)}</p>
                      <p style="margin: 0 0 6px; color: #475569; font-size: 13px;">Email: <a href="mailto:${escapeHtml(contactEmail)}" style="color: #b84916; text-decoration: none;">${escapeHtml(contactEmail)}</a></p>
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

export async function sendEstimateLeadSubmission(
  data: EstimateLeadSubmission,
): Promise<void> {
  const messages = getContactEmailMessages(data.locale);

  const detailsTable = [
    renderDetailRow(getEmailMessage(messages, "fields.name"), data.name),
    renderDetailRow(getEmailMessage(messages, "fields.email"), data.email),
    renderDetailRow(getEmailMessage(messages, "fields.phone"), data.phone),
    renderDetailRow("Тип проєкту", data.projectType),
    renderDetailRow("Обсяг", data.pagesCount),
    renderDetailRow("Стан дизайну", data.designReadiness),
    renderDetailRow("Термін", data.deadline),
    renderDetailRow(getEmailMessage(messages, "fields.budget"), data.budget),
    renderDetailRow("Інтеграції", data.integrations),
    renderDetailRow("Функції", data.features),
    renderDetailRow("AI бюджет", data.estimateRange),
    renderDetailRow("AI терміни", data.estimateTimeline),
    renderDetailRow("AI точність", data.estimateConfidence),
    renderDetailRow("Формат роботи", data.estimateFormat),
  ].join("");

  const messageHtml = [
    `<strong>Коментар клієнта:</strong><br />${nl2br(data.message)}`,
    `<br /><br /><strong>Опис проєкту:</strong><br />${nl2br(data.projectDescription)}`,
    data.goals
      ? `<br /><br /><strong>Бізнес-цілі:</strong><br />${nl2br(data.goals)}`
      : "",
    `<br /><br /><strong>AI summary:</strong><br />${nl2br(data.estimateSummary)}`,
    `<br /><br /><strong>AI details:</strong><br />${nl2br(data.estimateDetails)}`,
  ].join("");

  const adminEmailHtml = renderEmailLayout({
    eyebrow: "AI розрахунок",
    title: `Клієнт залишив контакти: ${data.name}`,
    intro: "Клієнт переглянув AI-розрахунок і відправив контактні дані для продовження розмови.",
    summary: data.estimateSummary,
    detailsTitle: "Контакти, параметри і розрахунок",
    detailsTable,
    messageTitle: "Запит клієнта і AI-розрахунок",
    messageHtml,
    footerNote: "Автоматичне повідомлення зі сторінки онлайн-розрахунку.",
    brandSubtitle: getEmailMessage(messages, "layout.brandSubtitle"),
    ctaLabel: "Відповісти клієнту",
    ctaHref: `mailto:${data.email}`,
  });

  const clientEmailHtml = renderEmailLayout({
    eyebrow: "AI розрахунок",
    title: `${data.name}, ваш розрахунок отримано`,
    intro: "Дякую за запит. Нижче копія попереднього AI-розрахунку та дані, які ви відправили для обговорення проєкту.",
    summary: data.estimateSummary,
    detailsTitle: "Ваші параметри і попередній розрахунок",
    detailsTable,
    messageTitle: "Ваш запит",
    messageHtml,
    footerNote: "Це автоматична копія розрахунку. Я перегляну запит і відповім вам окремим листом.",
    brandSubtitle: getEmailMessage(messages, "layout.brandSubtitle"),
    ctaLabel: getEmailMessage(messages, "client.ctaLabel"),
    ctaHref: contactTelegramHref,
  });

  await Promise.all([
    transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    replyTo: data.email,
    subject: `AI розрахунок + контакти від ${data.name} - Serhii Oberemchuk`,
      html: adminEmailHtml,
    }),
    transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: data.email,
      replyTo: process.env.GMAIL_USER,
      subject: "Копія вашого AI-розрахунку - Serhii Oberemchuk",
      html: clientEmailHtml,
    }),
  ]);
}
