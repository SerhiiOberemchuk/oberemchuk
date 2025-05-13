// Типи для проектів
export interface Project {
  id?: number
  slug: string
  title: string
  category: string
  imageSrc: string
  description: string
  technologies: string[]
  features: string[]
  year: string
  client: string
  websiteUrl: string
  createdAt?: string
  updatedAt?: string
}

// Функція для отримання всіх проектів
export async function getAllProjects(): Promise<Project[]> {
  try {
    // Імпортуємо функцію getProjects з lib/projects-db
    const { getProjects } = await import("@/lib/projects-db")
    return await getProjects()
  } catch (error) {
    console.error("Помилка при отриманні проектів:", error)
    return []
  }
}

// Функція для отримання проекту за slug
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    // Імпортуємо функцію getProjectBySlug з lib/projects-db
    const { getProjectBySlug: getProject } = await import("@/lib/projects-db")
    const project = await getProject(slug)
    return project || undefined
  } catch (error) {
    console.error("Помилка при отриманні проекту:", error)
    return undefined
  }
}

// Змінюємо функцію getRelatedProjects, щоб вона повертала всі проекти без обмежень

export async function getRelatedProjects(currentSlug: string): Promise<Project[]> {
  try {
    // Імпортуємо функцію getProjects з lib/projects-db
    const { getProjects } = await import("@/lib/projects-db")
    const projects = await getProjects()

    // Фільтруємо проекти, виключаючи поточний, і повертаємо всі без обмежень
    return projects.filter((project) => project.slug !== currentSlug)
  } catch (error) {
    console.error("Помилка при отриманні пов'язаних проектів:", error)
    return []
  }
}

// Функція для отримання всіх категорій
export async function getAllCategories(): Promise<string[]> {
  try {
    // Імпортуємо функцію getProjects з lib/projects-db
    const { getProjects } = await import("@/lib/projects-db")
    const projects = await getProjects()
    const categories = new Set(projects.map((project) => project.category))
    return Array.from(categories)
  } catch (error) {
    console.error("Помилка при отриманні категорій:", error)
    return []
  }
}
