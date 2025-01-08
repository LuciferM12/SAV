'use client'

import { useState } from 'react'
import { CustomImageUpload } from '@/components/inputs/CustomImageUpload'

export default function Home() {
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleImagesSelect = (files: File[]) => {
    setSelectedImages(prev => [...prev, ...files])
    console.log('Imágenes seleccionadas:', files.map(f => f.name))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Galería de Imágenes</h1>
      <CustomImageUpload onImagesSelect={handleImagesSelect} maxImages={1} />
      {selectedImages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Imágenes Seleccionadas:</h2>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {selectedImages.map((image, index) => (
              <li key={index}>{image.name}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

