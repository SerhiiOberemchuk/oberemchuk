import NotFoundPageShell from "@/components/not-found-page-shell";

const fallbackCopy = {
  eyebrow: "Page not found",
  status: "404",
  title: "This page does not exist",
  description:
    "The address may be outdated, the page may have moved or the link may be incorrect.",
  nextStepLabel: "Next step",
  nextStepTitle: "Return to the main routes and continue from there.",
  backHome: "Back to home",
  viewServices: "View services"
} as const;

export default function NotFound() {
  return (
    <NotFoundPageShell
      eyebrow={fallbackCopy.eyebrow}
      status={fallbackCopy.status}
      title={fallbackCopy.title}
      description={fallbackCopy.description}
      nextStepLabel={fallbackCopy.nextStepLabel}
      nextStepTitle={fallbackCopy.nextStepTitle}
      backHome={fallbackCopy.backHome}
      viewServices={fallbackCopy.viewServices}
    />
  );
}
