'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Compass, Sprout, Send, Check, Sparkles } from 'lucide-react'

interface PropositoFlowProps {
  onComplete: (plan: { llamado: string; formado: string; enviado: string }) => void
  onBack: () => void
}

const fases = [
  {
    id: 'llamado',
    Icono: Compass,
    titulo: 'LLAMADO',
    subtitulo: '"Ven y sígueme"',
    gradiente: 'from-blue-100 to-indigo-100',
    acento: 'text-blue-600',
    borde: 'border-blue-200',
    pregunta: '¿En qué área de tu vida sientes que Dios te está hablando?',
    opciones: [
      'Mis relaciones personales',
      'Mi trabajo o estudios',
      'Mi familia',
      'Mi servicio a otros',
      'No estoy seguro aún',
    ],
  },
  {
    id: 'formado',
    Icono: Sprout,
    titulo: 'FORMADO',
    subtitulo: '"Aprende de mí"',
    gradiente: 'from-emerald-100 to-teal-100',
    acento: 'text-emerald-600',
    borde: 'border-emerald-200',
    pregunta: '¿Qué talento o experiencia tienes que puede bendecir a otros?',
    opciones: [
      'Escuchar y aconsejar',
      'Enseñar o explicar',
      'Organizar y liderar',
      'Crear o diseñar',
      'Servir en lo práctico',
    ],
  },
  {
    id: 'enviado',
    Icono: Send,
    titulo: 'ENVIADO',
    subtitulo: '"Id y haced discípulos"',
    gradiente: 'from-amber-100 to-orange-100',
    acento: 'text-amber-600',
    borde: 'border-amber-200',
    pregunta: '¿A quién puedes invitar a conocer a Jesús esta semana?',
    opciones: [
      'Un amigo cercano',
      'Un familiar',
      'Un compañero de trabajo o estudio',
      'Alguien de mi comunidad',
      'Aún no tengo a nadie en mente',
    ],
  },
]

export function PropositoFlow({ onComplete, onBack }: PropositoFlowProps) {
  const [faseActual, setFaseActual] = useState(0)
  const [respuestas, setRespuestas] = useState<string[]>(['', '', ''])
  const [seleccion, setSeleccion] = useState<string | null>(null)

  const fase = fases[faseActual]
  const { Icono } = fase

  const handleSeleccion = (opcion: string) => {
    setSeleccion(opcion)
  }

  const handleContinuar = () => {
    if (!seleccion) return
    
    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[faseActual] = seleccion
    setRespuestas(nuevasRespuestas)
    setSeleccion(null)

    if (faseActual < fases.length - 1) {
      setFaseActual(faseActual + 1)
    } else {
      onComplete({
        llamado: nuevasRespuestas[0],
        formado: nuevasRespuestas[1],
        enviado: nuevasRespuestas[2],
      })
    }
  }

  const handleAtras = () => {
    if (faseActual > 0) {
      setFaseActual(faseActual - 1)
      setSeleccion(respuestas[faseActual - 1])
    } else {
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardContent className="p-8 md:p-12">
          {/* Header de fase */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${fase.gradiente} mb-6 shadow-lg`}>
              <Icono className={`w-10 h-10 ${fase.acento}`} strokeWidth={1.5} />
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${fase.gradiente} ${fase.acento} text-xs font-bold tracking-wider mb-3`}>
              FASE {faseActual + 1} DE 3
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
              {fase.titulo}
            </h2>
            <p className="text-slate-500 italic text-lg">
              {fase.subtitulo}
            </p>
          </div>

          {/* Pregunta */}
          <div className="mb-8">
            <p className="text-xl text-slate-700 text-center font-medium leading-relaxed">
              {fase.pregunta}
            </p>
          </div>

          {/* Opciones */}
          <div className="space-y-3 mb-10">
            {fase.opciones.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => handleSeleccion(opcion)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 group ${
                  seleccion === opcion
                    ? `${fase.borde} bg-gradient-to-r ${fase.gradiente} shadow-lg scale-[1.02]`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    seleccion === opcion 
                      ? `${fase.acento} border-current bg-white` 
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}>
                    {seleccion === opcion && <Check className="w-4 h-4" strokeWidth={3} />}
                  </div>
                  <span className={`font-medium ${seleccion === opcion ? 'text-slate-800' : 'text-slate-600'}`}>
                    {opcion}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleAtras}
              className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
            <Button
              onClick={handleContinuar}
              disabled={!seleccion}
              className={`flex-1 bg-gradient-to-r ${fase.gradiente} ${fase.acento} hover:opacity-90 text-white font-bold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all`}
              style={{
                background: seleccion 
                  ? undefined 
                  : 'linear-gradient(to right, #e2e8f0, #e2e8f0)',
                color: '#94a3b8'
              }}
            >
              {faseActual < fases.length - 1 ? 'Continuar' : 'Ver mi propósito'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Indicador de progreso */}
          <div className="flex justify-center gap-2 mt-8">
            {fases.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === faseActual 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-900 w-12' 
                    : idx < faseActual 
                      ? 'bg-slate-400 w-6' 
                      : 'bg-slate-200 w-6'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}