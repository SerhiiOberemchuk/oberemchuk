import { sql, snakeToCamel, camelToSnake } from "./db"

// Типи для завдань
export interface Todo {
  id: number
  title: string
  description: string | null
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string | null
  projectId: number
  createdAt: string
  updatedAt: string
}

// Типи для створення/оновлення завдання
export interface TodoInput {
  title: string
  description?: string
  status?: "pending" | "in_progress" | "completed"
  priority?: "low" | "medium" | "high"
  dueDate?: string | null
  projectId: number
}

// Функція для отримання всіх завдань
export async function getTodos(): Promise<Todo[]> {
  try {
    const result = await sql`
      SELECT * FROM todos ORDER BY due_date ASC
    `

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    return result.map((row) => snakeToCamel(row) as unknown as Todo)
  } catch (error) {
    console.error("Помилка отримання завдань з бази даних:", error)
    throw error
  }
}

// Функція для отримання завдань за проектом
export async function getTodosByProject(projectId: number): Promise<Todo[]> {
  try {
    const result = await sql`
      SELECT * FROM todos WHERE project_id = ${projectId} ORDER BY due_date ASC
    `

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    return result.map((row) => snakeToCamel(row) as unknown as Todo)
  } catch (error) {
    console.error("Помилка отримання завдань за проектом:", error)
    throw error
  }
}

// Функція для отримання завдання за ID
export async function getTodoById(id: number): Promise<Todo | null> {
  try {
    const result = await sql`
      SELECT * FROM todos WHERE id = ${id}
    `

    if (result.length === 0) {
      return null
    }

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    return snakeToCamel(result[0]) as unknown as Todo
  } catch (error) {
    console.error("Помилка отримання завдання з бази даних:", error)
    throw error
  }
}

// Функція для додавання нового завдання
export async function addTodo(todo: TodoInput): Promise<Todo> {
  try {
    // Перетворюємо camelCase поля в snake_case для БД
    const snakeTodo = camelToSnake(todo)

    const result = await sql`
      INSERT INTO todos (
        title, description, status, priority, due_date, project_id
      ) VALUES (
        ${snakeTodo.title}, 
        ${snakeTodo.description || null}, 
        ${snakeTodo.status || "pending"}, 
        ${snakeTodo.priority || "medium"}, 
        ${snakeTodo.due_date || null}, 
        ${snakeTodo.project_id}
      ) RETURNING *
    `

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    return snakeToCamel(result[0]) as unknown as Todo
  } catch (error) {
    console.error("Помилка додавання завдання до бази даних:", error)
    throw error
  }
}

// Функція для оновлення завдання
export async function updateTodo(id: number, todo: Partial<TodoInput>): Promise<Todo | null> {
  try {
    // Спочатку перевіряємо, чи існує завдання
    const existingTodo = await getTodoById(id)

    if (!existingTodo) {
      return null
    }

    // Перетворюємо camelCase поля в snake_case для БД
    const snakeTodo = camelToSnake(todo)

    // Створюємо динамічний SQL запит для оновлення тільки наданих полів
    let updateQuery = "UPDATE todos SET "
    const updateValues: any[] = []
    const updateFields: string[] = []

    if (snakeTodo.title !== undefined) {
      updateFields.push("title = $" + (updateValues.length + 1))
      updateValues.push(snakeTodo.title)
    }

    if (snakeTodo.description !== undefined) {
      updateFields.push("description = $" + (updateValues.length + 1))
      updateValues.push(snakeTodo.description)
    }

    if (snakeTodo.status !== undefined) {
      updateFields.push("status = $" + (updateValues.length + 1))
      updateValues.push(snakeTodo.status)
    }

    if (snakeTodo.priority !== undefined) {
      updateFields.push("priority = $" + (updateValues.length + 1))
      updateValues.push(snakeTodo.priority)
    }

    if (snakeTodo.due_date !== undefined) {
      updateFields.push("due_date = $" + (updateValues.length + 1))
      updateValues.push(snakeTodo.due_date)
    }

    if (snakeTodo.project_id !== undefined) {
      updateFields.push("project_id = $" + (updateValues.length + 1))
      updateValues.push(snakeTodo.project_id)
    }

    // Додаємо оновлення часу
    updateFields.push("updated_at = CURRENT_TIMESTAMP")

    // Якщо немає полів для оновлення, повертаємо існуюче завдання
    if (updateFields.length === 1) {
      return existingTodo
    }

    updateQuery += updateFields.join(", ")
    updateQuery += " WHERE id = $" + (updateValues.length + 1)
    updateValues.push(id)
    updateQuery += " RETURNING *"

    const result = await sql.unsafe(updateQuery, ...updateValues)

    // Перетворюємо snake_case поля з БД в camelCase для фронтенду
    return snakeToCamel(result[0]) as unknown as Todo
  } catch (error) {
    console.error("Помилка оновлення завдання в базі даних:", error)
    throw error
  }
}

// Функція для видалення завдання
export async function deleteTodo(id: number): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM todos WHERE id = ${id} RETURNING id
    `

    return result.length > 0
  } catch (error) {
    console.error("Помилка видалення завдання з бази даних:", error)
    throw error
  }
}

// Функція для отримання статистики завдань за проектом
export async function getTodoStatsByProject(projectId: number): Promise<{
  total: number
  completed: number
  inProgress: number
  pending: number
}> {
  try {
    const result = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'pending') as pending
      FROM todos 
      WHERE project_id = ${projectId}
    `

    const stats = result[0]

    return {
      total: Number(stats.total),
      completed: Number(stats.completed),
      inProgress: Number(stats.in_progress),
      pending: Number(stats.pending),
    }
  } catch (error) {
    console.error("Помилка отримання статистики завдань:", error)
    throw error
  }
}
