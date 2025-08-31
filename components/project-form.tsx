"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, Plus, X } from "lucide-react"

interface ProjectFormData {
  title: string
  description: string
  category: string
  technologies: string[]
  status: string
  client: string
  duration: string
  budget: string
  features: string[]
  challenges: string
  results: string
  imageUrl: string
  liveUrl: string
  githubUrl: string
}

export default function ProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "",
    technologies: [],
    status: "",
    client: "",
    duration: "",
    budget: "",
    features: [],
    challenges: "",
    results: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTechnology, setNewTechnology] = useState("")
  const [newFeature, setNewFeature] = useState("")

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

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }))
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Валідація
    if (!formData.title.trim()) {
      toast.error("Будь ласка, введіть назву проекту")
      setIsSubmitting(false)
      return
    }

    if (!formData.description.trim()) {
      toast.error("Будь ласка, введіть опис проекту")
      setIsSubmitting(false)
      return
    }

    if (!formData.category) {
      toast.error("Будь ласка, оберіть категорію проекту")
      setIsSubmitting(false)
      return
    }

    try {
      // Тут буде логіка відправки на сервер
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Імітація запиту

      toast.success("Проект успішно додано!")

      // Очищення форми
      setFormData({
        title: "",
        description: "",
        category: "",
        technologies: [],
        status: "",
        client: "",
        duration: "",
        budget: "",
        features: [],
        challenges: "",
        results: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: "",
      })
    } catch (error) {
      console.error("Error:", error)
      toast.error("Помилка при додаванні проекту")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Додати новий проект</CardTitle>
        <CardDescription>Заповніть форму для додавання нового проекту до портфоліо</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основна інформація */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Основна інформація</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Назва проекту *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Назва вашого проекту"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категорія *</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger aria-label="Оберіть категорію проекту">
                    <SelectValue placeholder="Оберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Веб-розробка</SelectItem>
                    <SelectItem value="mobile-app">Мобільний додаток</SelectItem>
                    <SelectItem value="e-commerce">E-commerce</SelectItem>
                    <SelectItem value="landing-page">Лендінг</SelectItem>
                    <SelectItem value="corporate">Корпоративний сайт</SelectItem>
                    <SelectItem value="portfolio">Портфоліо</SelectItem>
                    <SelectItem value="blog">Блог</SelectItem>
                    <SelectItem value="other">Інше</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Опис проекту *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Детальний опис проекту..."
                rows={4}
              />
            </div>
          </div>

          {/* Технології */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Технології</h3>

            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Додати технологію"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Деталі проекту */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Деталі проекту</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger aria-label="Оберіть статус проекту">
                    <SelectValue placeholder="Статус проекту" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Завершено</SelectItem>
                    <SelectItem value="in-progress">В процесі</SelectItem>
                    <SelectItem value="planned">Заплановано</SelectItem>
                    <SelectItem value="on-hold">Призупинено</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Тривалість</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="2 місяці"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Бюджет</Label>
                <Input
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="$5,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Клієнт</Label>
              <Input
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="Назва компанії або клієнта"
              />
            </div>
          </div>

          {/* Особливості */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Особливості проекту</h3>

            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Додати особливість"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <Badge key={feature} variant="outline" className="flex items-center gap-1">
                  {feature}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Виклики та результати */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Виклики та результати</h3>

            <div className="space-y-2">
              <Label htmlFor="challenges">Виклики</Label>
              <Textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                placeholder="Які виклики виникли під час роботи над проектом?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="results">Результати</Label>
              <Textarea
                id="results"
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                placeholder="Які результати були досягнуті?"
                rows={3}
              />
            </div>
          </div>

          {/* Посилання */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Посилання</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL зображення</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl">Посилання на сайт</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub репозиторій</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Додаємо проект...
              </>
            ) : (
              "Додати проект"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
