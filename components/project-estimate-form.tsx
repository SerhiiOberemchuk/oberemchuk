"use client";

import {useActionState, useEffect, useState} from "react";
import {useFormStatus} from "react-dom";
import {useLocale, useTranslations} from "next-intl";
import {toast} from "sonner";
import {
  calculateProjectEstimate,
  submitProjectEstimateLead,
  type EstimateLeadActionState,
  type ProjectEstimateActionState,
  type ProjectEstimateResult,
} from "@/app/actions/project-estimate";
import NativeSelect, {type NativeSelectOption} from "@/components/ui/native-select";
import styles from "./project-estimate-form.module.css";

const rateLimitCooldownSeconds = 60;

type FormValues = {
  projectType: string;
  description: string;
  goals: string;
  pagesCount: string;
  designReadiness: string;
  deadline: string;
  budget: string;
  integrations: string;
  features: string[];
};

const initialValues: FormValues = {
  projectType: "",
  description: "",
  goals: "",
  pagesCount: "",
  designReadiness: "",
  deadline: "",
  budget: "",
  integrations: "",
  features: [],
};

const initialProjectEstimateState: ProjectEstimateActionState = {
  status: "idle",
};

const initialEstimateLeadState: EstimateLeadActionState = {
  status: "idle",
};

type EstimateLeadSnapshot = {
  projectType: string;
  pagesCount: string;
  designReadiness: string;
  deadline: string;
  budget: string;
  integrations: string;
  features: string;
  projectDescription: string;
  goals: string;
};

function SubmitButton({
  disabled,
  cooldownSeconds,
}: {
  disabled: boolean;
  cooldownSeconds: number;
}) {
  const t = useTranslations("EstimatePage.form");
  const {pending} = useFormStatus();

  return (
    <button type="submit" className={styles.submitButton} disabled={pending || disabled}>
      <span className={pending ? styles.spinner : styles.submitIcon} aria-hidden="true" />
      {pending
        ? t("loading")
        : cooldownSeconds > 0
          ? t("cooldownButton", {seconds: cooldownSeconds})
          : t("submit")}
    </button>
  );
}

function LeadSubmitButton() {
  const t = useTranslations("EstimatePage.lead");
  const {pending} = useFormStatus();

  return (
    <button type="submit" className={styles.leadButton} disabled={pending}>
      <span className={pending ? styles.spinner : styles.submitIcon} aria-hidden="true" />
      {pending ? t("loading") : t("button")}
    </button>
  );
}

function EstimateResult({
  result,
  snapshot,
}: {
  result: ProjectEstimateResult;
  snapshot: EstimateLeadSnapshot;
}) {
  const t = useTranslations("EstimatePage.result");
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: result.currency,
    maximumFractionDigits: 0,
  });

  return (
    <section className={styles.resultPanel} aria-live="polite">
      <div className={styles.resultHeader}>
        <div className={styles.resultMark} aria-hidden="true" />
        <div>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 className={styles.resultPrice}>
            {formatter.format(result.costMin)} - {formatter.format(result.costMax)}
          </h2>
          <p className={styles.resultSummary}>{result.summary}</p>
        </div>
      </div>

      <div className={styles.metrics}>
        <Metric label={t("timeline")} value={`${result.timelineMinWeeks}-${result.timelineMaxWeeks} ${t("weeks")}`} />
        <Metric label={t("format")} value={result.recommendedFormat} />
        <Metric label={t("confidence")} value={t(`confidenceValues.${result.confidence}`)} />
      </div>

      <div className={styles.resultGrid}>
        <div>
          <h3 className={styles.sectionTitle}>{t("phases")}</h3>
          <div className={styles.phases}>
            {result.phases.map((phase) => (
              <article key={`${phase.title}-${phase.duration}`} className={styles.phase}>
                <div className={styles.phaseTopline}>
                  <h4>{phase.title}</h4>
                  <span>{phase.duration}</span>
                </div>
                <p>{phase.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.resultLists}>
          <ResultList title={t("included")} items={result.includedScope} />
          <ResultList title={t("assumptions")} items={result.assumptions} />
          <ResultList title={t("risks")} items={result.risks} />
          <ResultList title={t("questions")} items={result.nextQuestions} />
        </div>
      </div>

      <EstimateLeadForm result={result} snapshot={snapshot} />
    </section>
  );
}

function EstimateLeadForm({
  result,
  snapshot,
}: {
  result: ProjectEstimateResult;
  snapshot: EstimateLeadSnapshot;
}) {
  const t = useTranslations("EstimatePage");
  const locale = useLocale();
  const [state, formAction] = useActionState(
    submitProjectEstimateLead,
    initialEstimateLeadState,
  );
  const estimateRange = `${result.costMin} - ${result.costMax} ${result.currency}`;
  const estimateTimeline = `${result.timelineMinWeeks}-${result.timelineMaxWeeks} ${t("result.weeks")}`;
  const estimateConfidence = t(`result.confidenceValues.${result.confidence}`);
  const estimateDetails = [
    `${t("result.phases")}: ${result.phases.map((phase) => `${phase.title} (${phase.duration})`).join("; ")}`,
    `${t("result.included")}: ${result.includedScope.join("; ")}`,
    `${t("result.assumptions")}: ${result.assumptions.join("; ")}`,
    `${t("result.risks")}: ${result.risks.join("; ")}`,
    `${t("result.questions")}: ${result.nextQuestions.join("; ")}`,
  ].join("\n\n");

  useEffect(() => {
    if (state.status === "success" && state.messageKey) {
      toast.success(t(state.messageKey));
    }

    if (state.status === "error" && state.messageKey) {
      toast.error(t(state.messageKey));
    }
  }, [state, t]);

  return (
    <form action={formAction} className={styles.leadForm}>
      <input type="hidden" name="locale" value={locale} />
      <input
        type="text"
        name="estimateLeadCompany"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="projectType" value={snapshot.projectType} />
      <input type="hidden" name="pagesCount" value={snapshot.pagesCount} />
      <input type="hidden" name="designReadiness" value={snapshot.designReadiness} />
      <input type="hidden" name="deadline" value={snapshot.deadline} />
      <input type="hidden" name="budget" value={snapshot.budget} />
      <input type="hidden" name="integrations" value={snapshot.integrations} />
      <input type="hidden" name="features" value={snapshot.features} />
      <input type="hidden" name="projectDescription" value={snapshot.projectDescription} />
      <input type="hidden" name="goals" value={snapshot.goals} />
      <input type="hidden" name="estimateSummary" value={result.summary} />
      <input type="hidden" name="estimateRange" value={estimateRange} />
      <input type="hidden" name="estimateTimeline" value={estimateTimeline} />
      <input type="hidden" name="estimateConfidence" value={estimateConfidence} />
      <input type="hidden" name="estimateFormat" value={result.recommendedFormat} />
      <input type="hidden" name="estimateDetails" value={estimateDetails} />

      <div className={styles.leadIntro}>
        <p className={styles.eyebrow}>{t("lead.eyebrow")}</p>
        <h3>{t("lead.title")}</h3>
        <p>{t("lead.description")}</p>
      </div>

      <div className={styles.leadGrid}>
        <div className={styles.field}>
          <label htmlFor="estimateLeadName">{t("lead.fields.name")}</label>
          <input
            id="estimateLeadName"
            name="name"
            className={styles.input}
            autoComplete="name"
            required
            placeholder={t("lead.placeholders.name")}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="estimateLeadEmail">{t("lead.fields.email")}</label>
          <input
            id="estimateLeadEmail"
            name="email"
            type="email"
            className={styles.input}
            autoComplete="email"
            required
            placeholder={t("lead.placeholders.email")}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="estimateLeadPhone">{t("lead.fields.phone")}</label>
        <input
          id="estimateLeadPhone"
          name="phone"
          className={styles.input}
          autoComplete="tel"
          placeholder={t("lead.placeholders.phone")}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="estimateLeadMessage">{t("lead.fields.message")}</label>
        <textarea
          id="estimateLeadMessage"
          name="message"
          className={styles.textarea}
          rows={4}
          required
          placeholder={t("lead.placeholders.message")}
        />
      </div>

      {state.status === "success" ? (
        <p className={styles.leadSuccess} role="status">
          {t("lead.submit.success")}
        </p>
      ) : null}

      <LeadSubmitButton />
    </form>
  );
}

function Metric({label, value}: {label: string; value: string}) {
  return (
    <div className={styles.metric}>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function ResultList({title, items}: {title: string; items: string[]}) {
  return (
    <div>
      <h3 className={styles.listTitle}>{title}</h3>
      <ul className={styles.resultList}>
        {items.map((item) => (
          <li key={item}>
            <span aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectEstimateForm() {
  const t = useTranslations("EstimatePage");
  const locale = useLocale();
  const [state, formAction] = useActionState(
    calculateProjectEstimate,
    initialProjectEstimateState,
  );
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submittedSnapshot, setSubmittedSnapshot] =
    useState<EstimateLeadSnapshot | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const projectTypes = t.raw("options.projectTypes") as NativeSelectOption[];
  const pageCounts = t.raw("options.pageCounts") as NativeSelectOption[];
  const designOptions = t.raw("options.designReadiness") as NativeSelectOption[];
  const deadlineOptions = t.raw("options.deadlines") as NativeSelectOption[];
  const budgetOptions = t.raw("options.budgets") as NativeSelectOption[];
  const featureOptions = t.raw("options.features") as NativeSelectOption[];
  const getOptionLabel = (options: NativeSelectOption[], value: string) =>
    options.find((option) => option.value === value)?.label || value;
  const buildEstimateLeadSnapshot = (): EstimateLeadSnapshot => ({
    projectType: getOptionLabel(projectTypes, values.projectType),
    pagesCount: getOptionLabel(pageCounts, values.pagesCount),
    designReadiness: getOptionLabel(designOptions, values.designReadiness),
    deadline: getOptionLabel(deadlineOptions, values.deadline),
    budget: getOptionLabel(budgetOptions, values.budget),
    integrations: values.integrations,
    features: values.features
      .map((feature) => getOptionLabel(featureOptions, feature))
      .join(", "),
    projectDescription: values.description,
    goals: values.goals,
  });

  useEffect(() => {
    if (state.status === "error" && state.messageKey) {
      toast.error(t(state.messageKey));

      if (state.messageKey === "submit.rateLimited") {
        setCooldownSeconds(rateLimitCooldownSeconds);
        window.localStorage.setItem(
          "estimate-rate-limit-until",
          String(Date.now() + rateLimitCooldownSeconds * 1000),
        );
      }
    }
  }, [state, t]);

  useEffect(() => {
    const getRemainingSeconds = () => {
      const rawValue = window.localStorage.getItem("estimate-rate-limit-until");
      const until = rawValue ? Number(rawValue) : 0;
      return Number.isFinite(until)
        ? Math.max(0, Math.ceil((until - Date.now()) / 1000))
        : 0;
    };

    setCooldownSeconds(getRemainingSeconds());

    const intervalId = window.setInterval(() => {
      const remainingSeconds = getRemainingSeconds();
      setCooldownSeconds(remainingSeconds);

      if (remainingSeconds <= 0) {
        window.localStorage.removeItem("estimate-rate-limit-until");
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const setField = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({...prev, [name]: value}));
  };

  const toggleFeature = (value: string) => {
    setValues((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((item) => item !== value)
        : [...prev.features, value],
    }));
  };

  return (
    <div className={styles.shell}>
      <form
        action={formAction}
        className={styles.form}
        onSubmit={() => setSubmittedSnapshot(buildEstimateLeadSnapshot())}
      >
        <input type="hidden" name="locale" value={locale} />
        <input
          type="text"
          name="company"
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input type="hidden" name="projectType" value={values.projectType} />
        <input type="hidden" name="pagesCount" value={values.pagesCount} />
        <input type="hidden" name="designReadiness" value={values.designReadiness} />
        <input type="hidden" name="deadline" value={values.deadline} />
        <input type="hidden" name="budget" value={values.budget} />
        {values.features.map((feature) => (
          <input key={feature} type="hidden" name="features" value={feature} />
        ))}

        <div className={styles.field}>
          <label htmlFor="projectType">{t("form.fields.projectType")}</label>
          <NativeSelect
            id="projectType"
            value={values.projectType}
            placeholder={t("form.placeholders.projectType")}
            options={projectTypes}
            onChange={(value) => setField("projectType", value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">{t("form.fields.description")}</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={(event) => setField("description", event.target.value)}
            minLength={40}
            rows={7}
            required
            placeholder={t("form.placeholders.description")}
            className={styles.textarea}
          />
          <p className={styles.hint}>{t("form.hints.description")}</p>
        </div>

        <div className={styles.field}>
          <label htmlFor="goals">{t("form.fields.goals")}</label>
          <textarea
            id="goals"
            name="goals"
            value={values.goals}
            onChange={(event) => setField("goals", event.target.value)}
            rows={3}
            placeholder={t("form.placeholders.goals")}
            className={styles.textarea}
          />
        </div>

        <div className={styles.twoColumns}>
          <SelectField
            id="pagesCount"
            label={t("form.fields.pagesCount")}
            placeholder={t("form.placeholders.pagesCount")}
            value={values.pagesCount}
            options={pageCounts}
            onChange={(value) => setField("pagesCount", value)}
          />
          <SelectField
            id="designReadiness"
            label={t("form.fields.designReadiness")}
            placeholder={t("form.placeholders.designReadiness")}
            value={values.designReadiness}
            options={designOptions}
            onChange={(value) => setField("designReadiness", value)}
          />
        </div>

        <div className={styles.twoColumns}>
          <SelectField
            id="deadline"
            label={t("form.fields.deadline")}
            placeholder={t("form.placeholders.deadline")}
            value={values.deadline}
            options={deadlineOptions}
            onChange={(value) => setField("deadline", value)}
          />
          <SelectField
            id="budget"
            label={t("form.fields.budget")}
            placeholder={t("form.placeholders.budget")}
            value={values.budget}
            options={budgetOptions}
            onChange={(value) => setField("budget", value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="integrations">{t("form.fields.integrations")}</label>
          <input
            id="integrations"
            name="integrations"
            value={values.integrations}
            onChange={(event) => setField("integrations", event.target.value)}
            placeholder={t("form.placeholders.integrations")}
            className={styles.input}
          />
        </div>

        <fieldset className={styles.fieldset}>
          <legend>{t("form.fields.features")}</legend>
          <div className={styles.featureGrid}>
            {featureOptions.map((option) => (
              <label key={option.value} className={styles.feature}>
                <input
                  type="checkbox"
                  checked={values.features.includes(option.value)}
                  onChange={() => toggleFeature(option.value)}
                />
                <span aria-hidden="true" />
                <strong>{option.label}</strong>
              </label>
            ))}
          </div>
        </fieldset>

        {cooldownSeconds > 0 ? (
          <p className={styles.cooldownMessage} role="status">
            {t("form.cooldownMessage", {seconds: cooldownSeconds})}
          </p>
        ) : null}

        <SubmitButton
          disabled={cooldownSeconds > 0}
          cooldownSeconds={cooldownSeconds}
        />
      </form>

      {state.status === "success" && state.result ? (
        <EstimateResult
          result={state.result}
          snapshot={submittedSnapshot ?? buildEstimateLeadSnapshot()}
        />
      ) : (
        <aside className={styles.emptyPanel}>
          <p className={styles.eyebrow}>{t("empty.eyebrow")}</p>
          <h2>{t("empty.title")}</h2>
          <p>{t("empty.description")}</p>
          <ul>
            {(t.raw("empty.points") as string[]).map((point) => (
              <li key={point}>
                <span aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  options: NativeSelectOption[];
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <NativeSelect
        id={id}
        value={value}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        required
      />
    </div>
  );
}
