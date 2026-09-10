'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Clock, Users, MessageCircle, Check } from 'lucide-react'
import type { Peticion, CategoriaOracion } from '@/lib/oracion/types'
import { CATEGORIAS, MENSAJES_ANIMO } from '@/lib/oracion/types'
import { orarPorPeticion } from '@/lib/oracion/mutations'
import { getOrCreateUserId } from '@/lib/oracion/identity'
import { PrayerSupporters } from './prayer-supporters'

interface PrayerCardProps {
  peticion: Peticion & { nombre_autor?: string }
  onOrar: (peticionId: string) => void
}

function getEmojiCategoria(categoria: CategoriaOracion): string {
  return CATEGORIAS.find((c) => c.value === categoria)?.emoji || '🙏'
}

function getLabelCategoria(categoria: CategoriaOracion): string {
  return CATEGORIAS.find((c) => c.value === categoria)?.label || categoria
}

function tiempoTranscurrido(fecha: string): string {
  const ahora = new Date()
  const fechaPeticion = new Date(fecha)
  const diffMs = ahora.getTime() - fechaPeticion.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHoras = Math.floor(diffMin / 60)
  const diffDias = Math.floor(diffHoras / 24)

  if (diffMin < 1) return 'hace un momento'
  if (diffMin < 60) return `hace ${diffMin} min`
  if (diffHoras < 24) return `hace ${diffHoras}h`
  if (diffDias === 1) return 'hace 1 día'
  return `hace ${diffDias} días`
}

export function PrayerCard({ peticion, onOrar }: PrayerCardProps) {
  const [yaOre, setYaOre] = useState(false)
  const [orando, setOrando] = useState(false)
  const [mostrarAnimo, setMostrarAnimo] = useState(false)
  const [mostrarOradores, setMostrarOradores] = useState(false)
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<string | null>(null)
  const [mensajeCustom, setMensajeCustom] = useState('')

  const handleOrar = async () => {
    const usuarioId = getOrCreateUserId()
    setOrando(true)

    const resultado = await orarPorPeticion({
      peticion_id: peticion.id,
      usuario_id: usuarioId,
      mensaje: mensajeCustom || mensajeSeleccionado || undefined,
    })

    setOrando(false)

    if (resultado.ya_oro) {
      setYaOre(true)
      return
    }

    if (resultado.success) {
      setYaOre(true)
      onOrar(peticion.id)
      setMostrarAnimo(true)
    }
  }

  const handleEnviarAnimo = () => {
    setMostrarAnimo(false)
    setMensajeCustom('')
    setMensajeSeleccionado(null)
  }

  // Detección visual simple para situaciones sensibles (palabras clave)
  const esSensible = /depresion|morir|suicidio|crisis|dolor profundo/i.test(peticion.texto)

  return (
    <>
      <Card className={`bg-white border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-2xl overflow-hidden ${esSensible ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-100'}`}>
        <CardContent className="p-5 md:p-6">
          {/* Categoría */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{getEmojiCategoria(peticion.categoria)}</span>
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${esSensible ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
              {getLabelCategoria(peticion.categoria)}
            </span>
          </div>

          {/* Texto de la petición */}
          <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium mb-4 italic">
            "{peticion.texto}"
          </p>

          {/* Autor y tiempo */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                {peticion.nombre_autor?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{peticion.nombre_autor}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {tiempoTranscurrido(peticion.created_at)}
                </p>
              </div>
            </div>
            
            {/* Contador de oraciones */}
            <button 
              onClick={() => setMostrarOradores(!mostrarOradores)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              {peticion.oraciones_count} {peticion.oraciones_count === 1 ? 'persona ora' : 'personas oran'}
            </button>
          </div>

          {/* Botón de acción */}
          <Button
            onClick={handleOrar}
            disabled={orando || yaOre}
            className={`w-full py-6 rounded-xl font-bold text-base transition-all ${
              yaOre 
                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 cursor-default' 
                : 'bg-slate-800 hover:bg-slate-900 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {orando ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Orando...
              </>
            ) : yaOre ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                YA ORASTE POR ESTA PERSONA
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                🙏 YA ORÉ POR ESTO
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Modal de apoyo (simplificado visualmente) */}
      {mostrarAnimo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">¡Gracias por orar!</h3>
                <p className="text-slate-500 text-sm">¿Quieres dejar un mensaje de ánimo?</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {MENSAJES_ANIMO.slice(0, 4).map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMensajeSeleccionado(msg.texto)}
                    className={`p-3 rounded-xl text-xs font-semibold transition-all ${
                      mensajeSeleccionado === msg.texto 
                        ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' 
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {msg.emoji} {msg.texto}
                  </button>
                ))}
              </div>

              <textarea
                value={mensajeCustom}
                onChange={(e) => setMensajeCustom(e.target.value)}
                placeholder="O escribe tu propio mensaje..."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4 resize-none"
                rows={3}
              />

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleEnviarAnimo} className="flex-1 border-slate-200">
                  Omitir
                </Button>
                <Button onClick={handleEnviarAnimo} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold">
                  Enviar ánimo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de oradores */}
      {mostrarOradores && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-slate-800">Personas orando</h3>
                <button onClick={() => setMostrarOradores(false)} className="text-slate-400 hover:text-slate-600">
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>
              <PrayerSupporters peticionId={peticion.id} onClose={() => setMostrarOradores(false)} />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}


