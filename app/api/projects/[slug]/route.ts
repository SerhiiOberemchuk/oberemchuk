import { NextResponse } from "next/server"
import { getProjectBySlug } from "@/lib/projects-db"

// Отримання проекту за slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const project = await getProjectBySlug(params.slug)

    if (!project) {
      return NextResponse.json({ error: "Проект не знайдено" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Помилка при отриманні проекту:", error)
    return NextResponse.json({ error: "Виникла помилка при отриманні проекту" }, { status: 500 })
  }
}
