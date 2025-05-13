import { neon } from "@neondatabase/serverless"

// Створюємо підключення до бази даних
export const sql = neon(process.env.DATABASE_URL!)

// Допоміжна функція для перетворення snake_case в camelCase
export function snakeToCamel(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Перетворюємо snake_case в camelCase
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      result[camelKey] = obj[key]
    }
  }

  return result
}

// Допоміжна функція для пер����творення camelCase в snake_case
export function camelToSnake(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Перетворюємо camelCase в snake_case
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      result[snakeKey] = obj[key]
    }
  }

  return result
}
