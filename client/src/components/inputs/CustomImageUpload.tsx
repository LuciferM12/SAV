'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { FiUpload } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

interface CustomImageUploadProps {
  onImagesSelect: (files: File[]) => void
  maxImages?: number
}

export function CustomImageUpload({ onImagesSelect, maxImages = 5 }: CustomImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const newFiles = files.slice(0, maxImages - previews.length)
    onImagesSelect(newFiles)

    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const removeImage = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        <FiUpload className="mx-auto text-gray-400 mb-2" size={48} />
        <p className="text-sm text-gray-500">
          Arrastra y suelta imágenes aquí o haz clic para seleccionar
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Máximo {maxImages} imágenes
        </p>
      </div>
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <Image
                src={preview}
                alt={`Vista previa ${index + 1}`}
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Eliminar imagen ${index + 1}`}
              >
                <IoMdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

