"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface InViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: InViewOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Оновлюємо стан, коли елемент стає видимим
        if (entry.isIntersecting) {
          setIsInView(true)
          // Якщо потрібно спрацювати тільки один раз, відключаємо спостереження
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          // Якщо не triggerOnce, то змінюємо стан назад, коли елемент виходить з видимої області
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}
