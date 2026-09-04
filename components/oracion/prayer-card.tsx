'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Clock, Users, MessageCircle } from 'lucide-react'
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
  const [oraciondo, setOraciondo] = useState(false)
  const [mostrarAnimo, setMostrarAnimo] = useState(false)
  const [mostrarOradores, setMostrarOradores] = useState(false)
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<string | null>(null)
  const [mensajeCustom, setMensajeCustom] = useState('')

  const handleOrar = async () => {
    const usuarioId = getOrCreateUserId()
    setOraciondo(true)

    const resultado = await orarPorPeticion({
      peticion_id: peticion.id,
      usuario_id: usuarioId,
      mensaje: mensajeCustom || mensajeSeleccionado || undefined,
    })

    setOraciondo(false)

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

  return (
    <>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
        <CardContent className="p-5">
          {/* Categoría */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">
              {getEmojiCategoria(peticion.categoria)}
            </span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
              {getLabelCategoria(peticion.categoria)}
            </span>
          </div>

          {/* Texto de la petición */}
          <p className="text-white text-base leading-relaxed mb-4 italic">
            "{peticion.texto}"
          </p>

          {/* Autor y tiempo */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-white">
                {peticion.nombre_autor?.charAt(0).toUpperCase() || '?'}
              </div>
              <span className="text-sm text-blue-200 font-medium">
                {peticion.nombre_autor || 'Anónimo'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-300">
              <Clock className="w-3 h-3" />
              {tiempoTranscurrido(peticion.created_at)}
            </div>
          </div>

          {/* Contador de oraciones */}
          <button
            onClick={() => setMostrarOradores(true)}
            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 mb-4 transition-colors"
          >
            <Heart className="w-4 h-4 fill-amber-400" />
            <span className="font-semibold">
              {peticion.oraciones_count}{' '}
              {peticion.oraciones_count === 1
                ? 'persona está orando'
                : 'personas están orando'}
            </span>
          </button>

          {/* Botón de oración */}
          {yaOre ? (
            <div className="w-full py-3 px-4 rounded-lg bg-green-500/20 border border-green-500/30 text-center">
              <span className="text-green-400 font-semibold text-sm">
                ✅ Ya estás orando por esta petición
              </span>
            </div>
          ) : (
            <Button
              onClick={handleOrar}
              disabled={oraciondo}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-lg shadow-amber-500/30 disabled:opacity-50"
            >
              {oraciondo ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Orando...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  🙏 ORÉ POR ESTO
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Modal de ánimo */}
      {mostrarAnimo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-gradient-to-br from-blue-900 to-blue-950 border-white/20">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🙏</div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Estoy orando contigo
                </h3>
                <p className="text-sm text-blue-200">
                  Gracias por acompañar a esta persona en oración.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-white font-semibold mb-2">
                  ¿Quieres enviarle ánimo?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {MENSAJES_ANIMO.map((msg) => (
                    <button
                      key={msg.texto}
                      onClick={() => setMensajeSeleccionado(msg.texto)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        mensajeSeleccionado === msg.texto
                          ? 'bg-amber-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {msg.emoji} {msg.texto}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-white font-semibold mb-2">
                  O escribe un mensaje...
                </p>
                <textarea
                  value={mensajeCustom}
                  onChange={(e) => setMensajeCustom(e.target.value)}
                  placeholder="Escribe un mensaje corto de ánimo..."
                  maxLength={140}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  rows={2}
                />
                <div className="text-xs text-blue-300 text-right mt-1">
                  {mensajeCustom.length}/140
                </div>
              </div>

              <Button
                onClick={handleEnviarAnimo}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar ánimo
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de personas orando */}
      {mostrarOradores && (
        <PrayerSupporters
          peticionId={peticion.id}
          onClose={() => setMostrarOradores(false)}
        />
      )}
    </>
  )
}