import { NextResponse } from "next/server"
import { getProjects } from "@/lib/projects-db"

// Отримання всіх проектів
export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Помилка при отриманні проектів:", error)
    return NextResponse.json({ error: "Виникла помилка при отриманні проектів" }, { status: 500 })
  }
}
