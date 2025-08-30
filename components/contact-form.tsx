"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, Mail, MessageCircle } from "lucide-react"

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
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Невірний формат email"
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
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Дякую за звернення!</h3>
          <p className="text-gray-600 mb-6">
            Ваше повідомлення успішно відправлено. Я зв'яжуся з вами найближчим часом для обговорення деталей проекту.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="mailto:serhiioberemchuk@gmail.com" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Написати email
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://t.me/SerhiiOberemchuk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Розкажіть про свій проект</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Ім'я <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ваше ім'я"
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
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
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
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+380..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Компанія</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Назва компанії"
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
                <SelectItem value="landing">Лендінг пейдж</SelectItem>
                <SelectItem value="corporate">Корпоративний сайт</SelectItem>
                <SelectItem value="ecommerce">Інтернет-магазин</SelectItem>
                <SelectItem value="redesign">Редизайн існуючого сайту</SelectItem>
                <SelectItem value="optimization">SEO-оптимізація</SelectItem>
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
                  <SelectItem value="asap">Якнайшвидше</SelectItem>
                  <SelectItem value="1-2weeks">1-2 тижні</SelectItem>
                  <SelectItem value="1month">1 місяць</SelectItem>
                  <SelectItem value="2-3months">2-3 місяці</SelectItem>
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
                  <SelectItem value="500-1000">$500 - $1000</SelectItem>
                  <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
                  <SelectItem value="2000-5000">$2000 - $5000</SelectItem>
                  <SelectItem value="5000+">$5000+</SelectItem>
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
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Розкажіть детальніше про ваш проект, цілі та побажання..."
              rows={4}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Відправляю...
              </>
            ) : (
              "Відправити повідомлення"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
