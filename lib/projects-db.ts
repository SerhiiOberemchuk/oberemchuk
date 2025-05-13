import { sql, snakeToCamel } from "./db"
import { deleteFromBlob } from "./blob-utils"
import type { Project } from "@/data/projects"

// Функція для отримання всіх проектів
export async function getProjects(): Promise<Project[]> {
  try {
    const result = await sql`
      SELECT * FROM projects ORDER BY created_at DESC
    `

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    return result.map((row) => {
      const project = snakeToCamel(row) as any

      // Переконуємося, що масиви правильно перетворені
      if (typeof project.technologies === "string") {
        project.technologies = JSON.parse(project.technologies)
      }

      if (typeof project.features === "string") {
        project.features = JSON.parse(project.features)
      }

      return project as Project
    })
  } catch (error) {
    console.error("Помилка отримання проектів з бази даних:", error)
    return []
  }
}

// Функція для отримання проекту за slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const result = await sql`
      SELECT * FROM projects WHERE slug = ${slug}
    `

    if (result.length === 0) {
      return null
    }

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    const project = snakeToCamel(result[0]) as any

    // Переконуємося, що масиви правильно перетворені
    if (typeof project.technologies === "string") {
      project.technologies = JSON.parse(project.technologies)
    }

    if (typeof project.features === "string") {
      project.features = JSON.parse(project.features)
    }

    return project as Project
  } catch (error) {
    console.error("Помилка отримання проекту з бази даних:", error)
    return null
  }
}

// Змінюємо функцію addProject, щоб вона правильно обробляла масиви
export async function addProject(project: Project): Promise<Project> {
  try {
    console.log("Додавання проекту в базу даних:", project)

    // Перевіряємо наявність обов'язкових полів
    if (!project.title || !project.slug || !project.category || !project.imageSrc) {
      console.error("Відсутні обов'язкові поля проекту:", {
        title: !!project.title,
        slug: !!project.slug,
        category: !!project.category,
        imageSrc: !!project.imageSrc,
      })
      throw new Error("Не всі обов'язкові поля заповнені")
    }

    // Переконуємося, що technologies і features є масивами
    const technologies = Array.isArray(project.technologies) ? project.technologies : []
    const features = Array.isArray(project.features) ? project.features : []

    // Встановлюємо значення за замовчуванням для необов'язкових полів
    const description = project.description || ""
    const year = project.year || new Date().getFullYear().toString()
    const client = project.client || ""
    const websiteUrl = project.websiteUrl || ""

    // Виконуємо SQL запит для додавання проекту, передаючи масиви як text[]
    const result = await sql`
      INSERT INTO projects (
        slug, title, category, image_src, description, 
        technologies, features, year, client, website_url
      ) VALUES (
        ${project.slug}, 
        ${project.title}, 
        ${project.category}, 
        ${project.imageSrc}, 
        ${description}, 
        ${technologies}::text[], 
        ${features}::text[], 
        ${year}, 
        ${client}, 
        ${websiteUrl}
      ) RETURNING *
    `

    console.log("Проект успішно додано в базу даних:", result[0])

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    const newProject = snakeToCamel(result[0]) as any

    return newProject as Project
  } catch (error) {
    console.error("Помилка додавання проекту до бази даних:", error)
    throw error
  }
}

// Функція для оновлення проекту
// Оновлюємо функцію updateProject для правильної обробки масивів
export async function updateProject(slug: string, project: Project): Promise<Project> {
  try {
    console.log("Оновлення проекту в базі даних:", { slug, project })

    // Спочатку отримуємо поточний проект, щоб перевірити, чи змінилося зображення
    const currentProject = await getProjectBySlug(slug)

    if (!currentProject) {
      throw new Error("Проект не знайдено")
    }

    // Якщо змінилося зображення, видаляємо старе
    if (currentProject.imageSrc !== project.imageSrc && currentProject.imageSrc) {
      try {
        await deleteFromBlob(currentProject.imageSrc)
      } catch (deleteError) {
        console.error("Помилка видалення зображення:", deleteError)
        // Продовжуємо виконання, навіть якщо видалення не вдалося
      }
    }

    // Переконуємося, що technologies і features є масивами
    const technologies = Array.isArray(project.technologies) ? project.technologies : []
    const features = Array.isArray(project.features) ? project.features : []

    console.log("Підготовлені дані для оновлення:", {
      slug: project.slug,
      title: project.title,
      category: project.category,
      technologies,
      features,
    })

    // Виконуємо SQL запит для оновлення проекту
    const result = await sql`
      UPDATE projects SET
        title = ${project.title},
        category = ${project.category},
        image_src = ${project.imageSrc},
        description = ${project.description || ""},
        technologies = ${technologies}::text[],
        features = ${features}::text[],
        year = ${project.year || new Date().getFullYear().toString()},
        client = ${project.client || ""},
        website_url = ${project.websiteUrl || ""},
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = ${slug}
      RETURNING *
    `

    if (result.length === 0) {
      throw new Error("Проект не знайдено")
    }

    console.log("Результат оновлення проекту:", result[0])

    // Якщо slug змінився, оновлюємо його окремим запитом
    if (slug !== project.slug) {
      console.log("Оновлення slug проекту:", { oldSlug: slug, newSlug: project.slug })

      const slugUpdateResult = await sql`
        UPDATE projects SET
          slug = ${project.slug}
        WHERE slug = ${slug}
        RETURNING *
      `

      if (slugUpdateResult.length === 0) {
        throw new Error("Не вдалося оновити slug проекту")
      }

      console.log("Slug проекту успішно оновлено")
    }

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    const updatedProject = snakeToCamel(result[0]) as any

    // Переконуємося, що масиви правильно перетворені
    if (typeof updatedProject.technologies === "string") {
      updatedProject.technologies = JSON.parse(updatedProject.technologies)
    }

    if (typeof updatedProject.features === "string") {
      updatedProject.features = JSON.parse(updatedProject.features)
    }

    // Встановлюємо оновлений slug
    if (slug !== project.slug) {
      updatedProject.slug = project.slug
    }

    return updatedProject as Project
  } catch (error) {
    console.error("Помилка оновлення проекту в базі даних:", error)
    throw error
  }
}

// Функція для видалення проекту
export async function deleteProject(slug: string): Promise<void> {
  try {
    // Спочатку отримуємо проект, щоб видалити зображення
    const project = await getProjectBySlug(slug)

    if (!project) {
      throw new Error("Проект не знайдено")
    }

    // Видаляємо зображення з Vercel Blob, якщо воно є
    if (project.imageSrc) {
      try {
        await deleteFromBlob(project.imageSrc)
      } catch (deleteError) {
        console.error("Помилка видалення зображення:", deleteError)
        // Продовжуємо виконання, навіть якщо видалення не вдалося
      }
    }

    // Видаляємо проект з бази даних
    await sql`
      DELETE FROM projects WHERE slug = ${slug}
    `
  } catch (error) {
    console.error("Помилка видалення проекту з бази даних:", error)
    throw error
  }
}

// Функція для перевірки, чи існує проект з таким slug
export async function projectExists(slug: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT COUNT(*) FROM projects WHERE slug = ${slug}
    `

    return Number.parseInt(result[0].count) > 0
  } catch (error) {
    console.error("Помилка перевірки існування проекту:", error)
    throw error
  }
}
