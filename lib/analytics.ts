// Функція для відстеження подій в Google Analytics
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Функція для відстеження кліків по кнопці "Замовити сайт"
export function trackOrderButtonClick(location: string) {
  trackEvent("click", "order_button", location)
}

// Функція для відстеження відправки форми контакту
export function trackContactFormSubmission() {
  trackEvent("submit", "contact_form", "contact_page")
}

// Функція для відстеження перегляду проекту в портфоліо
export function trackProjectView(projectTitle: string) {
  trackEvent("view", "portfolio_project", projectTitle)
}
