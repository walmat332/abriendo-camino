'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Sprout, HandHeart, Users, ArrowRight, RotateCcw, Check, AlertCircle, Share2, Play, Calendar, MessageCircle } from 'lucide-react'

interface ResultMapProps {
  resultados: {
    conexion: string[]
    crecimiento: string[]
    servicio: string[]
    multiplicacion: string[]
  }
  onReiniciar: () => void
}

const secciones = [
  {
    id: 'conexion',
    titulo: 'MI CONEXIÓN',
    Icono: Heart,
    color: 'from-blue-50 to-sky-50',
    borde: 'border-l-blue-500',
    acento: 'text-blue-600',
    iconoBg: 'bg-blue-100',
    accion: 'Únete a un grupo de conexión esta semana',
    accionIcono: '👥',
  },
  {
    id: 'crecimiento',
    titulo: 'MI CRECIMIENTO',
    Icono: Sprout,
    color: 'from-green-50 to-emerald-50',
    borde: 'border-l-green-500',
    acento: 'text-green-600',
    iconoBg: 'bg-green-100',
    accion: 'Dedica 15 min diarios a la Palabra',
    accionIcono: '',
  },
  {
    id: 'servicio',
    titulo: 'MI SERVICIO',
    Icono: HandHeart,
    color: 'from-orange-50 to-amber-50',
    borde: 'border-l-orange-500',
    acento: 'text-orange-600',
    iconoBg: 'bg-orange-100',
    accion: 'Sirve a alguien esta semana con tus dones',
    accionIcono: '',
  },
  {
    id: 'multiplicacion',
    titulo: 'MI MULTIPLICACIÓN',
    Icono: Users,
    color: 'from-purple-50 to-violet-50',
    borde: 'border-l-purple-500',
    acento: 'text-purple-600',
    iconoBg: 'bg-purple-100',
    accion: 'Invita a 1 persona a conocer a Jesús',
    accionIcono: '',
  },
]

function getNivel(respuestas: string[]): { nivel: string; color: string; siguientePaso: string } {
  const si = respuestas.filter(r => r === 'si').length
  const total = respuestas.length
  const porcentaje = total > 0 ? si / total : 0

  if (porcentaje >= 0.7) {
    return { nivel: 'Fuerte', color: 'text-emerald-700 bg-emerald-100', siguientePaso: 'Ayuda a otros en esta área' }
  } else if (porcentaje >= 0.4) {
    return { nivel: 'En desarrollo', color: 'text-amber-700 bg-amber-100', siguientePaso: 'Profundiza en esta área' }
  } else {
    return { nivel: 'Área de crecimiento', color: 'text-rose-700 bg-rose-100', siguientePaso: 'Este es tu siguiente paso' }
  }
}

export function ResultMap({ resultados, onReiniciar }: ResultMapProps) {
  
  const handleCompartirWhatsApp = () => {
    const conexionNivel = getNivel(resultados.conexion).nivel
    const crecimientoNivel = getNivel(resultados.crecimiento).nivel
    const servicioNivel = getNivel(resultados.servicio).nivel
    const multiplicacionNivel = getNivel(resultados.multiplicacion).nivel

    const mensaje = ` *Acabo de descubrir mi Camino de Propósito* \n\n` +
      ` Conexión: ${conexionNivel}\n` +
      `🌱 Crecimiento: ${crecimientoNivel}\n` +
      ` Servicio: ${servicioNivel}\n` +
      `🚀 Multiplicación: ${multiplicacionNivel}\n\n` +
      `Jesús llamó, formó, envió y multiplicó. ¡Tú también puedes vivir tu propósito!\n\n` +
      `Descubre el tuyo aquí: ${typeof window !== 'undefined' ? window.location.origin + '/abriendo-camino/proposito' : ''}`

    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  // Identificar el área más débil para priorizar
  const areasOrdenadas = secciones
    .map(s => ({ ...s, nivel: getNivel(resultados[s.id as keyof typeof resultados]) }))
    .sort((a, b) => {
      const orden = { 'Área de crecimiento': 0, 'En desarrollo': 1, 'Fuerte': 2 }
      return orden[a.nivel.nivel] - orden[b.nivel.nivel]
    })

  const areaPrioritaria = areasOrdenadas[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-3xl border-0 shadow-2xl bg-white/90 backdrop-blur-xl animate-slide-up">
        <CardContent className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-6 shadow-lg">
              <Check className="w-10 h-10 text-slate-700" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
              TU MAPA DE PROPÓSITO
            </h2>
            <p className="text-slate-500 italic text-lg">
              "Descubre dónde estás y cuál es tu siguiente paso"
            </p>
          </div>

          {/* Las 4 secciones */}
          <div className="space-y-4 mb-10">
            {secciones.map((seccion) => {
              const { Icono } = seccion
              const respuestas = resultados[seccion.id as keyof typeof resultados]
              const { nivel, color, siguientePaso } = getNivel(respuestas)

              return (
                <div key={seccion.id} className={`bg-gradient-to-r ${seccion.color} border-l-4 ${seccion.borde} p-6 rounded-2xl`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${seccion.iconoBg} shadow-sm flex items-center justify-center flex-shrink-0`}>
                      <Icono className={`w-6 h-6 ${seccion.acento}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <h3 className="font-bold text-slate-800 text-sm tracking-wider">{seccion.titulo}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>{nivel}</span>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{siguientePaso}</p>
                      <div className="flex gap-1 mb-3">
                        {respuestas.map((r, idx) => (
                          <div key={idx} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            r === 'si' ? 'bg-emerald-200 text-emerald-700' : r === 'mas_o_menos' ? 'bg-amber-200 text-amber-700' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {r === 'si' ? '✓' : r === 'mas_o_menos' ? '~' : '·'}
                          </div>
                        ))}
                      </div>
                      {/* Acción concreta */}
                      <div className="bg-white/60 rounded-lg p-3 border border-white">
                        <p className="text-sm font-semibold text-slate-800">
                          <span className="mr-2">{seccion.accionIcono}</span>
                          {seccion.accion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Área prioritaria destacada */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl mb-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Tu próximo paso prioritario</p>
                <h4 className="text-xl font-black mb-2">{areaPrioritaria.titulo}</h4>
                <p className="text-slate-200 leading-relaxed">
                  {areaPrioritaria.accionIcono} {areaPrioritaria.accion}
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button
              onClick={handleCompartirWhatsApp}
              className="w-full py-6 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
            >
              <Share2 className="mr-2 h-6 w-6" />
              Compartir mi propósito por WhatsApp
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => window.location.href = '/abriendo-camino/dashboard'}
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 py-4"
              >
                <Play className="mr-2 h-4 w-4" />
                Continuar reto
              </Button>

              <Button
                onClick={() => {
                  const texto = `Hola, acabo de descubrir mi Camino de Propósito y quiero crecer en ${areaPrioritaria.titulo.toLowerCase()}. ¿Me puedes acompañar?`
                  const url = `https://wa.me/?text=${encodeURIComponent(texto)}`
                  window.open(url, '_blank')
                }}
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 py-4"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Buscar mentor
              </Button>
            </div>

            <Button
              onClick={onReiniciar}
              variant="ghost"
              className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Hacer el diagnóstico de nuevo
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.location.href = '/abriendo-camino'}
              className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            >
              Volver al inicio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}