'use client'

import { Calendar, Zap } from 'lucide-react'

interface ModoRetosModalProps {
  isOpen: boolean
  onSelect: (modo: 'diario' | 'intensivo') => void
}

export function ModoRetosModal({ isOpen, onSelect }: ModoRetosModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white text-center">
          <h2 className="text-2xl font-black mb-2">
            ¿Cómo quieres hacer el reto?
          </h2>
          <p className="text-amber-100 text-sm">
            Elige el modo que mejor se adapte a ti
          </p>
        </div>

        {/* Opciones */}
        <div className="p-6 space-y-4">
          
          {/* Modo Diario */}
          <button
            onClick={() => onSelect('diario')}
            className="w-full p-6 border-2 border-blue-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-slate-900 mb-1">
                  Modo Diario
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Un día por día durante 7 días. Ideal para crear un hábito real y duradero.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-blue-700">
                  <li>✅ 15 minutos al día</li>
                  <li>✅ Creación de hábito</li>
                  <li>✅ Recordatorios diarios</li>
                  <li>✅ Mejor retención</li>
                </ul>
              </div>
            </div>
          </button>

          {/* Modo Intensivo */}
          <button
            onClick={() => onSelect('intensivo')}
            className="w-full p-6 border-2 border-orange-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-slate-900 mb-1">
                  Modo Intensivo
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Completa los 7 días en una sola sesión. Perfecto si tienes poco tiempo.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-orange-700">
                  <li>⚡ 1-2 horas total</li>
                  <li>⚡ Todo de una vez</li>
                  <li>⚡ Sin esperas</li>
                  <li>⚡ Rápido y directo</li>
                </ul>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 text-center text-xs text-slate-500">
          Puedes cambiar de modo en cualquier momento
        </div>
      </div>
    </div>
  )
}