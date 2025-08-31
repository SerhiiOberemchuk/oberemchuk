"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Валідація
    if (!formData.name.trim()) {
      toast.error("Будь ласка, введіть ваше ім'я")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim()) {
      toast.error("Будь ласка, введіть ваш email")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.includes("@")) {
      toast.error("Будь ласка, введіть коректний email")
      setIsSubmitting(false)
      return
    }

    if (!formData.message.trim()) {
      toast.error("Будь ласка, введіть ваше повідомлення")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Повідомлення успішно відправлено!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Помилка при відправці повідомлення")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Помилка при відправці повідомлення")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Ім'я *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Ваше ім'я"
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+380 XX XXX XX XX"
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Тип послуги</Label>
          <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
            <SelectTrigger aria-label="Оберіть тип послуги">
              <SelectValue placeholder="Оберіть послугу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Створення сайту</SelectItem>
              <SelectItem value="redesign">Редизайн сайту</SelectItem>
              <SelectItem value="seo">SEO оптимізація</SelectItem>
              <SelectItem value="maintenance">Підтримка сайту</SelectItem>
              <SelectItem value="consultation">Консультація</SelectItem>
              <SelectItem value="other">Інше</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Бюджет проекту</Label>
        <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
          <SelectTrigger aria-label="Оберіть бюджет проекту">
            <SelectValue placeholder="Оберіть бюджет" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-1000">До $1,000</SelectItem>
            <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
            <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
            <SelectItem value="over-10000">Понад $10,000</SelectItem>
            <SelectItem value="discuss">Обговорити індивідуально</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Повідомлення *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Розкажіть детальніше про ваш проект..."
          rows={5}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Відправляємо...
          </>
        ) : (
          "Відправити повідомлення"
        )}
      </Button>
    </form>
  )
}
