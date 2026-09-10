'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Quote } from 'lucide-react'
import type { Testimonio } from '@/lib/oracion/types'

interface TestimonyCardProps {
  testimonio: Testimonio & {
    nombre_autor?: string
    texto_peticion?: string
  }
}

function tiempoTranscurrido(fecha: string): string {
  const ahora = new Date()
  const fechaTestimonio = new Date(fecha)
  const diffMs = ahora.getTime() - fechaTestimonio.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDias === 0) return 'hoy'
  if (diffDias === 1) return 'hace 1 día'
  if (diffDias < 30) return `hace ${diffDias} días`
  return `hace ${Math.floor(diffDias / 30)} meses`
}

export function TestimonyCard({ testimonio }: TestimonyCardProps) {
  return (
    <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide">
              Dios respondió
            </h4>
            <p className="text-xs text-blue-300">
              {tiempoTranscurrido(testimonio.created_at)}
            </p>
          </div>
        </div>

        {testimonio.texto_peticion && (
          <div className="mb-3 pl-4 border-l-2 border-white/10">
            <p className="text-xs text-blue-200 italic mb-1">Petición original:</p>
            <p className="text-sm text-blue-100 italic">"{testimonio.texto_peticion}"</p>
          </div>
        )}

        <div className="relative mb-4">
          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-amber-500/20" />
          <p className="text-white text-base leading-relaxed pl-4">
            {testimonio.texto}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-white/10">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-white">
            {testimonio.nombre_autor?.charAt(0).toUpperCase() || '?'}
          </div>
          <span className="text-sm text-blue-200 font-medium">
            {testimonio.nombre_autor || 'Anónimo'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}