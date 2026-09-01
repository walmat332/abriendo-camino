'use client'

import { useState } from 'react'
import { X, Copy, Share2, Quote, Check } from 'lucide-react'
import { Versiculo } from '@/lib/versiculos'

interface VersiculoModalProps {
  versiculo: Versiculo
  onClose: () => void
}

export function VersiculoModal({ versiculo, onClose }: VersiculoModalProps) {
  const [copiado, setCopiado] = useState(false)

  const handleCopiar = async () => {
    const texto = `"${versiculo.texto}"\n\n— ${versiculo.referencia}`
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  const handleCompartir = async () => {
    const texto = `"${versiculo.texto}" — ${versiculo.referencia}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo del Día',
          text: texto,
        })
      } catch (err) {
        console.log('Error al compartir:', err)
      }
    } else {
      handleCopiar()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-slide-up">
        
        {/* Barra superior de color */}
        <div className="h-2 bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400" />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        <div className="p-8 md:p-10">
          {/* Categoría */}
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-wider uppercase">
              Versículo del día
            </span>
          </div>

          {/* Icono de comillas */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <Quote className="w-6 h-6 text-blue-600" fill="currentColor" />
            </div>
          </div>

          {/* Texto del versículo */}
          <blockquote className="text-center mb-6">
            <p className="text-xl md:text-2xl text-slate-800 font-serif italic leading-relaxed">
              "{versiculo.texto}"
            </p>
          </blockquote>

          {/* Referencia */}
          <div className="text-center mb-8">
            <p className="text-lg font-bold text-slate-900">
              — {versiculo.referencia}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={handleCopiar}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all"
            >
              {copiado ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar
                </>
              )}
            </button>

            <button
              onClick={handleCompartir}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}