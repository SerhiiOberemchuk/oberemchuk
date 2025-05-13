import { del } from "@vercel/blob"

// Функція для видалення файлу з Vercel Blob
export async function deleteFromBlob(url: string): Promise<boolean> {
  try {
    // Перевіряємо, чи URL відноситься до Vercel Blob
    if (!url || !isVercelBlobUrl(url)) {
      console.log("Не Blob URL або порожній URL:", url)
      return false
    }

    // Видаляємо файл з Blob
    await del(url)
    console.log("Файл видалено з Blob:", url)
    return true
  } catch (error) {
    console.error("Помилка видалення файлу з Blob:", error)
    return false
  }
}

// Функція для перевірки, чи URL відноситься до Vercel Blob
export function isVercelBlobUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    // Перевіряємо, чи хост URL відноситься до Vercel Blob
    // Зазвичай URL Vercel Blob має формат: https://<project-name>.public.blob.vercel-storage.com/...
    return parsedUrl.hostname.includes("blob.vercel-storage.com")
  } catch (error) {
    return false
  }
}

// Функція для видалення списку файлів з Vercel Blob
export async function deleteManyFromBlob(urls: string[]): Promise<{ success: number; failed: number }> {
  let success = 0
  let failed = 0

  // Видаляємо файли послідовно, щоб запобігти перевантаженню API
  for (const url of urls) {
    const result = await deleteFromBlob(url)
    if (result) {
      success++
    } else {
      failed++
    }
  }

  return { success, failed }
}
