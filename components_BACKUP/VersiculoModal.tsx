'use client'

import { useState, useEffect } from 'react'
import { X, BookOpen } from 'lucide-react'
import { getVersiculoDelDia, type Versiculo } from '@/lib/versiculos'

interface VersiculoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VersiculoModal({ isOpen, onClose }: VersiculoModalProps) {
  const [versiculo, setVersiculo] = useState<Versiculo | null>(null)
  const [loading, setLoading] = useState(true)

  // Cada vez que el modal se abre, busca el versículo en Supabase
  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      getVersiculoDelDia().then((data) => {
        setVersiculo(data)
        setLoading(false)
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-slide-up">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Versículo del Día
          </h3>
          <p className="text-slate-500 text-sm">
            Una palabra de aliento para hoy
          </p>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="text-slate-500 mt-2">Cargando...</p>
          </div>
        ) : versiculo ? (
          <div className="space-y-4">
            <blockquote className="text-xl text-slate-800 italic leading-relaxed text-center">
              "{versiculo.texto}"
            </blockquote>
            <p className="text-center font-bold text-amber-600 text-lg">
              — {versiculo.referencia}
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No se pudo cargar el versículo. Intenta de nuevo más tarde.
          </div>
        )}

        {/* Botón de acción */}
        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}