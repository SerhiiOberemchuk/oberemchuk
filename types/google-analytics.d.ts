interface Window {
  gtag: (
    command: "config" | "event" | "set" | "consent",
    targetId: string | { [key: string]: string },
    config?: Record<string, any> | undefined,
  ) => void
}
