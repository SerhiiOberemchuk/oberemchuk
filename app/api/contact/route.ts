import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactEmail, contactTelegramHref } from "@/lib/contact-info";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
}

function getReadableValue(key: string, value: string): string {
  const serviceTypes: Record<string, string> = {
    website: "Створення сайту",
    redesign: "Редизайн сайту",
    seo: "SEO оптимізація",
    maintenance: "Підтримка сайту",
    consultation: "Консультація",
    other: "Інше",
  };

  const budgets: Record<string, string> = {
    "under-1000": "До $1,000",
    "1000-3000": "$1,000 - $3,000",
    "3000-5000": "$3,000 - $5,000",
    "5000-10000": "$5,000 - $10,000",
    "over-10000": "Понад $10,000",
    discuss: "Обговорити індивідуально",
  };

  if (key === "service" && value in serviceTypes) {
    return serviceTypes[value];
  }

  if (key === "budget" && value in budgets) {
    return budgets[value];
  }

  return value;
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
  detailsTable: string;
  messageHtml: string;
  footerNote: string;
  ctaLabel?: string;
  ctaHref?: string;
}): string {
  const {
    eyebrow,
    title,
    intro,
    summary,
    detailsTable,
    messageHtml,
    footerNote,
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
    <html lang="uk">
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
                      <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 800;">Деталі заявки</h2>
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        ${detailsTable}
                      </table>
                    </div>

                    <div style="border-radius: 20px; padding: 22px; background: #fff7f1; border: 1px solid #f1d3bf;">
                      <h2 style="margin: 0 0 12px; color: #6f3f22; font-size: 18px; font-weight: 800;">Опис задачі</h2>
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
                      <p style="margin: 0 0 6px; color: #475569; font-size: 13px;">Розробка сайтів, веб-додатків і технічне SEO для бізнесу в Європі</p>
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

function renderAdminEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}): string {
  return renderEmailLayout({
    eyebrow: "Нова заявка",
    title: `Нове звернення від ${data.name}`,
    intro: "На сайті з'явилась нова заявка з форми зворотного зв'язку.",
    summary:
      "Лист оформлений так, щоб ви могли швидко оцінити контекст, бюджет і тип послуги без пошуку деталей по сирому тексту.",
    detailsTable: [
      renderDetailRow("Ім'я", data.name),
      renderDetailRow("Email", data.email),
      renderDetailRow("Телефон", data.phone),
      renderDetailRow("Тип послуги", data.service),
      renderDetailRow("Бюджет", data.budget),
    ].join(""),
    messageHtml: nl2br(data.message),
    footerNote: "Автоматичне повідомлення з контактної форми сайту.",
    ctaLabel: "Відповісти клієнту",
    ctaHref: `mailto:${data.email}`,
  });
}

function renderClientEmail(data: {
  name: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}): string {
  return renderEmailLayout({
    eyebrow: "Запит отримано",
    title: "Дякую за звернення",
    intro: `Вітаю, ${data.name}. Я отримав вашу заявку і повернусь з відповіддю після перегляду деталей.`,
    summary:
      "Нижче зберіг копію вашого запиту. Це допоможе швидко звірити контекст, якщо ми продовжимо обговорення поштою або в Telegram.",
    detailsTable: [
      renderDetailRow("Телефон", data.phone),
      renderDetailRow("Тип послуги", data.service),
      renderDetailRow("Бюджет", data.budget),
    ].join(""),
    messageHtml: nl2br(data.message),
    footerNote: "Якщо хочете доповнити бриф, просто відповідайте на цей лист або напишіть у Telegram.",
    ctaLabel: "Написати в Telegram",
    ctaHref: contactTelegramHref,
  });
}

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

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    const name = data.name?.trim() || "";
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "Не вказано";
    const service = getReadableValue("service", data.service?.trim() || "Не вказано");
    const budget = getReadableValue("budget", data.budget?.trim() || "Не вказано");
    const message = data.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Будь ласка, заповніть всі обов'язкові поля" },
        { status: 400 }
      );
    }

    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Нова заявка від ${name} - Serhii Oberemchuk`,
      html: renderAdminEmail({
        name,
        email,
        phone,
        service,
        budget,
        message,
      }),
    };

    const clientMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Дякую за звернення",
      html: renderClientEmail({
        name,
        phone,
        service,
        budget,
        message,
      }),
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Помилка відправки листа:", error);
    return NextResponse.json(
      { error: "Виникла помилка при відправці повідомлення" },
      { status: 500 }
    );
  }
}
