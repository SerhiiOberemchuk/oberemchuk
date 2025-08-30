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
        throw new Error("Помилка відправки форми")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Помилка відправки форми. Спробуйте ще раз або зв'яжіться зі мною напряму.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center p-8">
        <CardContent className="space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Дякую за звернення!</h3>
            <p className="text-gray-600 mb-6">
              Ваше повідомлення успішно відправлено. Я зв'яжуся з вами протягом 24 годин.
            </p>
          </div>
          <div className="space-y-3">
            <Button asChild className="w-full bg-transparent" variant="outline">
              <Link href="mailto:hello@oberemchuk.com">
                <Mail className="w-4 h-4 mr-2" />
                hello@oberemchuk.com
              </Link>
            </Button>
            <Button asChild className="w-full bg-transparent" variant="outline">
              <Link href="https://t.me/SerhiiOberemchuk" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                @SerhiiOberemchuk
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ім'я *</Label>
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
          <Label htmlFor="email">Email *</Label>
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

      {/* Phone and Company */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+380 XX XXX XX XX"
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

      {/* Project Type */}
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
            <SelectItem value="webapp">Веб-додаток</SelectItem>
            <SelectItem value="redesign">Редизайн існуючого сайту</SelectItem>
            <SelectItem value="other">Інше</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline and Budget */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Терміни</Label>
          <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Коли потрібно завершити?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">Якнайшвидше</SelectItem>
              <SelectItem value="1month">До 1 місяця</SelectItem>
              <SelectItem value="2months">До 2 місяців</SelectItem>
              <SelectItem value="3months">До 3 місяців</SelectItem>
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
              <SelectItem value="under500">До $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1000</SelectItem>
              <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
              <SelectItem value="2000-5000">$2000 - $5000</SelectItem>
              <SelectItem value="over5000">Понад $5000</SelectItem>
              <SelectItem value="discuss">Обговоримо</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Повідомлення *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Розкажіть детальніше про ваш проект, цілі та вимоги..."
          rows={5}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Відправляю..." : "Відправити повідомлення"}
      </Button>
    </form>
  )
}
