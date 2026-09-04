'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Heart, Loader2, MessageCircle } from 'lucide-react'
import { getOracionesDePeticion, getNombreUsuario } from '@/lib/oracion/queries'
import type { Oracion } from '@/lib/oracion/types'

interface PrayerSupportersProps {
  peticionId: string
  onClose: () => void
}

interface OradorEnriquecido extends Oracion {
  nombre_usuario?: string
}

export function PrayerSupporters({ peticionId, onClose }: PrayerSupportersProps) {
  const [oradores, setOradores] = useState<OradorEnriquecido[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarOradores()
  }, [peticionId])

  async function cargarOradores() {
    setLoading(true)
    try {
      const data = await getOracionesDePeticion(peticionId)
      
      // Enriquecer con nombres
      const oradoresEnriquecidos = await Promise.all(
        data.map(async (o) => {
          // Si es anónima, no buscamos el nombre
          if (o.es_anonima) {
            return { ...o, nombre_usuario: 'Anónimo' }
          }
          const nombre = await getNombreUsuario(o.usuario_id)
          return { ...o, nombre_usuario: nombre || 'Alguien especial' }
        })
      )

      setOradores(oradoresEnriquecidos)
    } catch (error) {
      console.error('❌ Error al cargar oradores:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mostrar máximo 10 oradores en la lista
  const oradoresVisibles = oradores.slice(0, 10)
  const restantes = oradores.length - oradoresVisibles.length

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full max-h-[80vh] bg-gradient-to-br from-blue-900 to-blue-950 border-white/20 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 fill-amber-400 text-amber-400" />
              {oradores.length} {oradores.length === 1 ? 'persona está orando' : 'personas están orando'}
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Acompañando esta petición en espíritu
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-blue-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Lista de oradores */}
        <CardContent className="p-5 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
            </div>
          ) : oradores.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-blue-200 text-sm">
                Aún no hay personas orando. ¡Sé el primero!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {oradoresVisibles.map((orador) => (
                <div
                  key={orador.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {orador.nombre_usuario?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {orador.nombre_usuario}
                    </p>
                    {orador.mensaje && (
                      <div className="mt-1 flex items-start gap-1">
                        <MessageCircle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-200 italic">
                          "{orador.mensaje}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {restantes > 0 && (
                <div className="text-center py-2">
                  <p className="text-sm text-blue-300">
                    + {restantes} {restantes === 1 ? 'persona más' : 'personas más'} orando en silencio 🙏
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}