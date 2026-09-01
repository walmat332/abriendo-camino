'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Check, Heart, Sprout, HandHeart, Users } from 'lucide-react'

interface DiagnosticFlowProps {
  seccion: 'conexion' | 'crecimiento' | 'servicio' | 'multiplicacion'
  onComplete: (respuestas: string[]) => void
  onBack: () => void
}

const secciones = {
  conexion: {
    titulo: 'MI CONEXIÓN',
    subtitulo: 'CONOCE A CRISTO • CONECTA CON OTROS • ENCUENTRA TU COMUNIDAD',
    Icono: Heart,
    fondo: 'bg-[#1a6bff]',
    colorAcento: '#1a6bff',
    opciones: {
      bg: 'bg-blue-100',
      texto: 'text-blue-900',
      hover: 'hover:bg-blue-200',
      selected: 'bg-white border-blue-500',
      radio: 'bg-white border-blue-300',
    },
    preguntas: [
      '¿Ya conoces a Cristo personalmente?',
      '¿Estás conectado a un grupo de creyentes?',
      '¿Tienes personas con quienes caminar en tu fe?',
    ],
  },
  crecimiento: {
    titulo: 'MI CRECIMIENTO',
    subtitulo: 'CRECE COMO DISCÍPULO • APRENDE • SÉ TRANSFORMADO',
    Icono: Sprout,
    fondo: 'bg-[#10b981]',
    colorAcento: '#10b981',
    opciones: {
      bg: 'bg-green-100',
      texto: 'text-green-900',
      hover: 'hover:bg-green-200',
      selected: 'bg-white border-green-500',
      radio: 'bg-white border-green-300',
    },
    preguntas: [
      '¿Estás siendo formado intencionalmente en tu fe?',
      '¿Estás creciendo en tu relación con Jesús?',
    ],
  },
  servicio: {
    titulo: 'MI SERVICIO',
    subtitulo: 'DESCUBRE TUS DONES • SIRVE • BENDICE A OTROS',
    Icono: HandHeart,
    fondo: 'bg-[#f97316]',
    colorAcento: '#f97316',
    opciones: {
      bg: 'bg-orange-100',
      texto: 'text-orange-900',
      hover: 'hover:bg-orange-200',
      selected: 'bg-white border-orange-500',
      radio: 'bg-white border-orange-300',
    },
    preguntas: [
      '¿Conoces tus dones y talentos espirituales?',
      '¿Los estás poniendo al servicio de otros?',
    ],
  },
  multiplicacion: {
    titulo: 'MI MULTIPLICACIÓN',
    subtitulo: 'FORMA A OTROS • HAZ DISCÍPULOS • AYUDA A OTROS A CRECER',
    Icono: Users,
    fondo: 'bg-[#8b5cf6]',
    colorAcento: '#8b5cf6',
    opciones: {
      bg: 'bg-purple-100',
      texto: 'text-purple-900',
      hover: 'hover:bg-purple-200',
      selected: 'bg-white border-purple-500',
      radio: 'bg-white border-purple-300',
    },
    preguntas: [
      '¿A quién estás ayudando a conocer a Jesús?',
      '¿Estás ayudando a otros a crecer en su fe?',
    ],
  },
}

const opciones = [
  { valor: 'si', texto: 'SÍ, CLARAMENTE' },
  { valor: 'mas_o_menos', texto: 'MÁS O MENOS' },
  { valor: 'no', texto: 'NO, TODAVÍA' },
  { valor: 'no_seguro', texto: 'NO ESTOY SEGURO' },
]

export function DiagnosticFlow({ seccion, onComplete, onBack }: DiagnosticFlowProps) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<string[]>([])
  const [seleccion, setSeleccion] = useState<string | null>(null)

  const config = secciones[seccion]
  const { Icono } = config
  const pregunta = config.preguntas[preguntaActual]

  const handleSeleccion = (valor: string) => {
    setSeleccion(valor)
  }

  const handleContinuar = () => {
    if (!seleccion) return
    
    const nuevasRespuestas = [...respuestas, seleccion]
    setRespuestas(nuevasRespuestas)
    setSeleccion(null)

    if (preguntaActual < config.preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      onComplete(nuevasRespuestas)
    }
  }

  const handleAtras = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1)
      setSeleccion(respuestas[preguntaActual - 1])
    } else {
      onBack()
    }
  }

  return (
    <div className={`min-h-screen ${config.fondo} p-4 flex items-center justify-center`}>
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white">
        <CardContent className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg"
              style={{ backgroundColor: config.colorAcento }}
            >
              <Icono className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {config.titulo}
            </h2>
            <p className="text-xs font-bold tracking-wider" style={{ color: config.colorAcento }}>
              {config.subtitulo}
            </p>
          </div>

          {/* Pregunta */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-wider" style={{ color: config.colorAcento }}>
                PREGUNTA {preguntaActual + 1} DE {config.preguntas.length}
              </span>
            </div>
            <p className="text-xl text-slate-900 text-center font-bold leading-relaxed">
              {pregunta}
            </p>
          </div>

          {/* Opciones */}
          <div className="space-y-3 mb-10">
            {opciones.map((opcion) => (
              <button
                key={opcion.valor}
                onClick={() => handleSeleccion(opcion.valor)}
                className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 font-bold text-base tracking-wide ${
                  seleccion === opcion.valor
                    ? `${config.opciones.selected} shadow-lg scale-[1.02]`
                    : `${config.opciones.bg} ${config.opciones.texto} border-transparent ${config.opciones.hover}`
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    seleccion === opcion.valor 
                      ? 'border-green-500 bg-green-500' 
                      : config.opciones.radio
                  }`}>
                    {seleccion === opcion.valor && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>
                  <span className="flex-1">
                    {opcion.texto}
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
              className="flex-1 text-white font-bold shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: seleccion ? config.colorAcento : '#e2e8f0',
              }}
            >
              {preguntaActual < config.preguntas.length - 1 ? 'Siguiente' : 'Ver mi mapa'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Indicador de progreso */}
          <div className="flex justify-center gap-2 mt-8">
            {config.preguntas.map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: idx === preguntaActual ? config.colorAcento : idx < preguntaActual ? config.colorAcento + '80' : '#e2e8f0',
                  width: idx === preguntaActual ? '3rem' : '1.5rem',
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}