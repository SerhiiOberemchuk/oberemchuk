export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackOrderButtonClick(location: string) {
  trackEvent("click", "order_button", location);
}

export function trackContactFormSubmission() {
  trackEvent("submit", "contact_form", "contact_page");
}

export function trackProjectView(projectTitle: string) {
  trackEvent("view", "portfolio_project", projectTitle);
}
