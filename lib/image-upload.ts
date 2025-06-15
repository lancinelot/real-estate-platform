"use server"

// Simulation d'upload avec Vercel Blob
export async function uploadImage(formData: FormData): Promise<{ url: string; success: boolean }> {
  // Simulation - remplacer par la vraie logique Vercel Blob
  const file = formData.get("file") as File

  if (!file) {
    throw new Error("No file provided")
  }

  // Simulation d'upload
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Retourner une URL simulée
  const simulatedUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(file.name)}`

  return {
    url: simulatedUrl,
    success: true,
  }
}

// Exemple avec Vercel Blob (décommentez si configuré)
/*
import { put } from '@vercel/blob'

export async function uploadImage(formData: FormData): Promise<{ url: string; success: boolean }> {
  const file = formData.get('file') as File
  
  if (!file) {
    throw new Error('No file provided')
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
    })

    return {
      url: blob.url,
      success: true
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload image')
  }
}
*/

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    const result = await uploadImage(formData)
    return result.url
  })

  return Promise.all(uploadPromises)
}
