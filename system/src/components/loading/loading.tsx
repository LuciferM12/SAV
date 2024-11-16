import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-primary">Cargando...</h2>
      </div>
    </div>
  )
}