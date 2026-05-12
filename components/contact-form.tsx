"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { submitContactForm, type ContactActionState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NativeSelect from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

type Option = {
  value: string;
  label: string;
};

type ContactFormValues = {
  locale: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

const initialValues = (locale: string): ContactFormValues => ({
  locale,
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
});

const initialContactActionState: ContactActionState = {
  status: "idle",
};

function SubmitButton({ label, loadingLabel }: { label: string; loadingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const services = t.raw("services") as Option[];
  const budgets = t.raw("budgets") as Option[];
  const [state, formAction] = useActionState(submitContactForm, initialContactActionState);
  const [formValues, setFormValues] = useState<ContactFormValues>(initialValues(locale));
  const formHintId = "contact-form-hint";
  const messageHintId = "contact-form-message-hint";

  useEffect(() => {
    if (state.status === "success" && state.messageKey) {
      toast.success(t(state.messageKey));
      setFormValues(initialValues(locale));
    }

    if (state.status === "error" && state.messageKey) {
      toast.error(t(state.messageKey));
    }
  }, [locale, state, t]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: "service" | "budget", value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="space-y-6" aria-describedby={formHintId}>
      <input type="hidden" name="locale" value={formValues.locale} />
      <input type="hidden" name="service" value={formValues.service} />
      <input type="hidden" name="budget" value={formValues.budget} />

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
            value={formValues.name}
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
            value={formValues.email}
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
          <NativeSelect
            id="service"
            value={formValues.service}
            placeholder={t("fields.servicePlaceholder")}
            options={services}
            onChange={(value) => handleSelectChange("service", value)}
            describedBy={formHintId}
            ariaLabel={t("fields.serviceAria")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">{t("fields.budget")}</Label>
          <NativeSelect
            id="budget"
            value={formValues.budget}
            placeholder={t("fields.budgetPlaceholder")}
            options={budgets}
            onChange={(value) => handleSelectChange("budget", value)}
            describedBy={formHintId}
            ariaLabel={t("fields.budgetAria")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("fields.phone")}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formValues.phone}
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
          value={formValues.message}
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

      <SubmitButton
        label={t("submit.button")}
        loadingLabel={t("submit.loading")}
      />
    </form>
  );
}
