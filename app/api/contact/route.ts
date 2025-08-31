import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  platform?: string;
  timeline?: string;
  budget?: string;
  message?: string;
}

function getReadableValue(key: string, value: string): string {
  const websiteTypes: Record<string, string> = {
    landing: "Лендінг",
    ecommerce: "Інтернет-магазин",
    corporate: "Корпоративний сайт",
    blog: "Блог",
    portfolio: "Портфоліо",
    other: "Інше",
  };

  const platforms: Record<string, string> = {
    custom: "Кастомне рішення",
    wordpress: "WordPress",
    webflow: "Webflow",
    shopify: "Shopify",
    wix: "Wix",
    other: "Інше",
    undecided: "Ще не визначився",
  };

  const timelines: Record<string, string> = {
    urgent: "Терміново (до 2 тижнів)",
    "1month": "До 1 місяця",
    "2months": "1-2 місяці",
    "3months": "2-3 місяці",
    flexible: "Гнучкі терміни",
    undecided: "Ще не визначився",
  };

  if (key === "websiteType" && value in websiteTypes) {
    return websiteTypes[value];
  }

  if (key === "platform" && value in platforms) {
    return platforms[value];
  }

  if (key === "timeline" && value in timelines) {
    return timelines[value];
  }

  return value;
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
    const {
      name,
      email,
      phone,
      service = "не вказано",
      budget = "не вказано",
      message,
    } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Будь ласка, заповніть всі обов'язкові поля" },
        { status: 400 }
      );
    }

    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Нове повідомлення від ${name} - Oberemchuk Serhii`,
      html: `
        <h1>Нове повідомлення з форми контактів</h1>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || "Не вказано"}</p>
        <p><strong>Тип послуги:</strong> ${getReadableValue(
          "websiteType",
          service
        )}</p>
        <p><strong>Бюджет проєкту:</strong> ${budget}</p>
        <p><strong>Деталі проєкту:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    const clientMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Дякуємо за ваше звернення",
      html: `
        <h1>Дякуємо за ваше звернення!</h1>
        <p>Шановний(а) ${name},</p>
        <p>Ми отримали ваше повідомлення та зв'яжемося з вами найближчим часом.</p>
        <p>Ось копія вашого запиту:</p>
        <p><strong>Телефон:</strong> ${phone || "Не вказано"}</p>
        <p><strong>Тип послуги:</strong> ${getReadableValue(
          "websiteType",
          service
        )}</p>
        <p><strong>Бюджет проєкту:</strong> ${budget}</p>
        <p><strong>Деталі проєкту:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <br>
        <p>З повагою,</p>
        <p>Oberemchuk Serhii</p>
        <p>Email: serhiioberemchuk@gmail.com</p>
      `,
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
