import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  try {
    const response = await axios.get("https://v0-adminca-bk.vercel.app/api/projects")

    if (response.status === 200 && response.data.success) {
      return NextResponse.json({
        success: true,
        data: response.data.data,
      })
    }

    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
