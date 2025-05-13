"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

export default function ProjectForm() {
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

  const handleRadioChange = (name: string, value: string) => {
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

      toast({
        title: "Дякуємо за ваше повідомлення!",
        description: "Ми зв'яжемося з вами найближчим часом.",
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

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Дякуємо за ваше повідомлення!</h3>
        <p className="text-gray-600 mb-6">
          Ми отримали вашу заявку і зв'яжемося з вами найближчим часом для обговорення деталей вашого проекту.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Надіслати ще одне повідомлення</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">Ваше ім'я *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Введіть ваше ім'я"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введіть ваш email"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Введіть ваш номер телефону"
          />
          <p className="text-xs text-gray-500">Необов'язково, але допоможе нам швидше зв'язатися з вами</p>
        </div>
      </div>

      <div className="mb-8">
        <Label className="mb-4 block text-lg font-medium">Тип сайту *</Label>
        <RadioGroup
          value={formData.websiteType}
          onValueChange={(value) => handleRadioChange("websiteType", value)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          required
        >
          <label
            htmlFor="landing"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="landing" id="landing" />
            <span>Лендінг</span>
          </label>
          <label
            htmlFor="ecommerce"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="ecommerce" id="ecommerce" />
            <span>Інтернет-магазин</span>
          </label>
          <label
            htmlFor="corporate"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="corporate" id="corporate" />
            <span>Корпоративний сайт</span>
          </label>
          <label
            htmlFor="blog"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="blog" id="blog" />
            <span>Блог</span>
          </label>
          <label
            htmlFor="portfolio"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="portfolio" id="portfolio" />
            <span>Портфоліо</span>
          </label>
          <label
            htmlFor="other"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="other" id="other" />
            <span>Інше</span>
          </label>
        </RadioGroup>
      </div>

      <div className="mb-8">
        <Label className="mb-4 block text-lg font-medium">Бажана платформа *</Label>
        <RadioGroup
          value={formData.platform}
          onValueChange={(value) => handleRadioChange("platform", value)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          required
        >
          <label
            htmlFor="custom"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="custom" id="custom" />
            <span>Кастомне рішення</span>
          </label>
          <label
            htmlFor="wordpress"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="wordpress" id="wordpress" />
            <span>WordPress</span>
          </label>
          <label
            htmlFor="webflow"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="webflow" id="webflow" />
            <span>Webflow</span>
          </label>
          <label
            htmlFor="shopify"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="shopify" id="shopify" />
            <span>Shopify</span>
          </label>
          <label
            htmlFor="wix"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="wix" id="wix" />
            <span>Wix</span>
          </label>
          <label
            htmlFor="platform-other"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="other" id="platform-other" />
            <span>Інше</span>
          </label>
        </RadioGroup>
      </div>

      <div className="mb-8">
        <Label className="mb-4 block text-lg font-medium">Бажані терміни виконання *</Label>
        <RadioGroup
          value={formData.timeline}
          onValueChange={(value) => handleRadioChange("timeline", value)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          required
        >
          <label
            htmlFor="urgent"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="urgent" id="urgent" />
            <span>Терміново (до 2 тижнів)</span>
          </label>
          <label
            htmlFor="1month"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="1month" id="1month" />
            <span>До 1 місяця</span>
          </label>
          <label
            htmlFor="2months"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="2months" id="2months" />
            <span>1-2 місяці</span>
          </label>
          <label
            htmlFor="3months"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="3months" id="3months" />
            <span>2-3 місяці</span>
          </label>
          <label
            htmlFor="flexible"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="flexible" id="flexible" />
            <span>Гнучкі терміни</span>
          </label>
          <label
            htmlFor="timeline-undecided"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="undecided" id="timeline-undecided" />
            <span>Ще не визначився</span>
          </label>
        </RadioGroup>
      </div>

      <div className="mb-8">
        <Label className="mb-4 block text-lg font-medium">Бюджет проєкту *</Label>
        <RadioGroup
          value={formData.budget}
          onValueChange={(value) => handleRadioChange("budget", value)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          required
        >
          <label
            htmlFor="budget1"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="до $500" id="budget1" />
            <span>до $500</span>
          </label>
          <label
            htmlFor="budget2"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="$500-$1000" id="budget2" />
            <span>$500-$1000</span>
          </label>
          <label
            htmlFor="budget3"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="$1000-$2000" id="budget3" />
            <span>$1000-$2000</span>
          </label>
          <label
            htmlFor="budget4"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="$2000-$5000" id="budget4" />
            <span>$2000-$5000</span>
          </label>
          <label
            htmlFor="budget5"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="$5000+" id="budget5" />
            <span>$5000+</span>
          </label>
          <label
            htmlFor="budget-undecided"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer w-full"
          >
            <RadioGroupItem value="Не визначено" id="budget-undecided" />
            <span>Ще не визначився</span>
          </label>
        </RadioGroup>
      </div>

      <div className="mb-8">
        <div className="space-y-2">
          <Label htmlFor="message">Деталі проєкту *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Розкажіть більше про ваш проєкт, цілі та очікування"
            rows={5}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Відправка..." : "Надіслати запит"}
      </Button>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Натискаючи кнопку "Надіслати запит", ви погоджуєтеся з нашою{" "}
        <a href="/privacy-policy" className="text-green-600 hover:underline">
          Політикою конфіденційності
        </a>
        . Ваші дані будуть надіслані на serhiioberemchuk@gmail.com
      </p>
    </form>
  )
}
