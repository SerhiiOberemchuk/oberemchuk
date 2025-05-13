"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { trackContactFormSubmission } from "@/lib/analytics"

interface FormData {
  name: string
  email: string
  phone: string
  websiteType: string
  platform: string
  timeline: string
  budget: string
  message: string
}

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    websiteType: "",
    platform: "",
    timeline: "",
    budget: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Щось пішло не так")
      }

      // Відстежуємо успішну відправку форми
      trackContactFormSubmission()

      setIsSubmitting(false)
      setIsSubmitted(true)
      // Очистити форму
      setFormData({
        name: "",
        email: "",
        phone: "",
        websiteType: "",
        platform: "",
        timeline: "",
        budget: "",
        message: "",
      })
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Помилка",
        description: error instanceof Error ? error.message : "Виникла помилка при відправці повідомлення",
        variant: "destructive",
      })
    }
  }

  // Решта коду залишається без змін
}
