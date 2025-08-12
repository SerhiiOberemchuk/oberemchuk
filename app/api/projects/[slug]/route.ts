import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const response = await axios.get("https://v0-adminca-bk.vercel.app/api/projects")

    if (response.status === 200 && response.data.success) {
      const project = response.data.data.find((p: any) => p.slug === slug)

      if (project) {
        return NextResponse.json({
          success: true,
          data: project,
        })
      } else {
        return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
      }
    }

    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
