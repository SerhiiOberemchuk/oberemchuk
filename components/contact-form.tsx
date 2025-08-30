"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  timeline: string
  budget: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове"
    if (!formData.email.trim()) newErrors.email = "Email обов'язковий"
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email"
    }
    if (!formData.message.trim()) newErrors.message = "Повідомлення обов'язкове"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Track form submission
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "form_submit", {
            event_category: "Contact",
            event_label: "Contact Form",
          })
        }
      } else {
        throw new Error("Помилка відправки")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Помилка відправки форми. Спробуйте ще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center p-8">
        <CardContent className="p-0">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Дякую за звернення!</h3>
          <p className="text-gray-600 mb-6">
            Ваше повідомлення отримано. Я зв'яжуся з вами протягом 24 годин для обговорення деталей проекту.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="mailto:serhii.oberemchuk@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                Написати email
              </Link>
            </Button>
            <Button asChild>
              <Link href="https://t.me/SerhiiOberemchuk" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Ім'я <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Ваше ім'я"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+380 XX XXX XX XX"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Компанія</Label>
          <Input
            id="company"
            type="text"
            placeholder="Назва компанії"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Тип проекту</Label>
        <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Оберіть тип проекту" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="landing">Лендінг сторінка</SelectItem>
            <SelectItem value="corporate">Корпоративний сайт</SelectItem>
            <SelectItem value="ecommerce">Інтернет-магазин</SelectItem>
            <SelectItem value="webapp">Веб-додаток</SelectItem>
            <SelectItem value="redesign">Редизайн існуючого сайту</SelectItem>
            <SelectItem value="other">Інше</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Терміни</Label>
          <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Коли потрібно завершити?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">Якомога швидше</SelectItem>
              <SelectItem value="1month">До 1 місяця</SelectItem>
              <SelectItem value="2months">1-2 місяці</SelectItem>
              <SelectItem value="3months">2-3 місяці</SelectItem>
              <SelectItem value="flexible">Гнучкі терміни</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Бюджет</Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Орієнтовний бюджет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
              <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
              <SelectItem value="5000+">$5,000+</SelectItem>
              <SelectItem value="discuss">Обговоримо</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Опис проекту <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Розкажіть детальніше про ваш проект, цілі та побажання..."
          rows={5}
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Відправляю..." : "Відправити повідомлення"}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Натискаючи кнопку, ви погоджуєтесь з{" "}
        <Link href="/privacy-policy" className="text-blue-600 hover:underline">
          політикою конфіденційності
        </Link>
      </p>
    </form>
  )
}
