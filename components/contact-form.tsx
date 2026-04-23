"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

type Option = {
  value: string;
  label: string;
};

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const services = t.raw("services") as Option[];
  const budgets = t.raw("budgets") as Option[];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formHintId = "contact-form-hint";
  const messageHintId = "contact-form-message-hint";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim()) {
      toast.error(t("validation.nameRequired"));
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      toast.error(t("validation.emailRequired"));
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error(t("validation.emailInvalid"));
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim()) {
      toast.error(t("validation.messageRequired"));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(t("submit.success"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || t("submit.error"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("submit.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-describedby={formHintId}>
      <p id={formHintId} className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">
        {t("formHint")}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("fields.name")}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
            aria-required="true"
            placeholder={t("fields.namePlaceholder")}
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("fields.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-required="true"
            placeholder={t("fields.emailPlaceholder")}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="service">{t("fields.service")}</Label>
          <Select
            value={formData.service}
            onValueChange={(value) => handleSelectChange("service", value)}
          >
            <SelectTrigger aria-label={t("fields.serviceAria")} aria-describedby={formHintId}>
              <SelectValue placeholder={t("fields.servicePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>{service.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">{t("fields.budget")}</Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => handleSelectChange("budget", value)}
          >
            <SelectTrigger aria-label={t("fields.budgetAria")} aria-describedby={formHintId}>
              <SelectValue placeholder={t("fields.budgetPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>{budget.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("fields.phone")}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder={t("fields.phonePlaceholder")}
          autoComplete="tel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("fields.message")}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          aria-required="true"
          aria-describedby={messageHintId}
          placeholder={t("fields.messagePlaceholder")}
          rows={5}
        />
        <p id={messageHintId} className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">
          {t("fields.messageHint")}
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("submit.loading")}
          </>
        ) : (
          t("submit.button")
        )}
      </Button>
    </form>
  );
}
