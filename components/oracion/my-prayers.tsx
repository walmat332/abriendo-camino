'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Loader2, Sparkles, Heart, AlertCircle, CheckCircle } from 'lucide-react'
import { getPeticionesDeUsuario } from '@/lib/oracion/queries'
import { marcarComoRespondida, crearTestimonio } from '@/lib/oracion/mutations'
import { getCurrentUserId } from '@/lib/oracion/identity'
import type { Peticion } from '@/lib/oracion/types'

interface MyPrayersProps {
  onClose: () => void
  onRefresh: () => void
}

export function MyPrayers({ onClose, onRefresh }: MyPrayersProps) {
  const [peticiones, setPeticiones] = useState<Peticion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mostrarTestimonio, setMostrarTestimonio] = useState<string | null>(null)
  const [textoTestimonio, setTextoTestimonio] = useState('')
  const [visiblePublicamente, setVisiblePublicamente] = useState(true)
  const [creandoTestimonio, setCreandoTestimonio] = useState(false)

  useEffect(() => {
    cargarMisPeticiones()
  }, [])

  async function cargarMisPeticiones() {
    setLoading(true)
    setError(null)
    
    const usuarioId = getCurrentUserId()
    if (!usuarioId) {
      setError('No tienes una identidad asignada. Por favor, regístrate primero.')
      setLoading(false)
      return
    }

    try {
      const data = await getPeticionesDeUsuario(usuarioId)
      setPeticiones(data)
    } catch (err) {
      console.error('❌ Error al cargar mis peticiones:', err)
      setError('No pudimos cargar tus peticiones.')
    } finally {
      setLoading(false)
    }
  }

  const handleMarcarRespondida = async (peticionId: string) => {
    const usuarioId = getCurrentUserId()
    if (!usuarioId) return

    const resultado = await marcarComoRespondida(peticionId, usuarioId)

    if (resultado.success) {
      setMostrarTestimonio(peticionId)
      cargarMisPeticiones()
    } else {
      alert(resultado.error)
    }
  }

  const handleCrearTestimonio = async () => {
    if (!mostrarTestimonio) return

    if (textoTestimonio.trim().length < 10) {
      alert('Cuéntanos un poco más sobre cómo Dios respondió (mínimo 10 caracteres).')
      return
    }

    setCreandoTestimonio(true)
    const usuarioId = getCurrentUserId()
    if (!usuarioId) return

    const resultado = await crearTestimonio({
      peticion_id: mostrarTestimonio,
      usuario_id: usuarioId,
      texto: textoTestimonio.trim(),
      visible_publicamente: visiblePublicamente,
    })

    setCreandoTestimonio(false)

    if (resultado.success) {
      setMostrarTestimonio(null)
      setTextoTestimonio('')
      setVisiblePublicamente(true)
      cargarMisPeticiones()
      onRefresh()
      alert('✨ ¡Testimonio creado con éxito!')
    } else {
      alert(resultado.error)
    }
  }

  const peticionesActivas = peticiones.filter((p) => p.estado === 'ACTIVA')
  const peticionesRespondidas = peticiones.filter((p) => p.estado === 'RESPONDIDA')

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] bg-gradient-to-br from-blue-900 to-blue-950 border-white/20 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400" />
              Mi oración
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Tus peticiones y testimonios
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

        {/* Contenido */}
        <CardContent className="p-5 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-start gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          ) : peticiones.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-blue-300 mx-auto mb-4 opacity-50" />
              <p className="text-blue-200">
                Aún no has creado ninguna petición.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Peticiones activas */}
              {peticionesActivas.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Activas ({peticionesActivas.length})
                  </h4>
                  <div className="space-y-3">
                    {peticionesActivas.map((peticion) => (
                      <div
                        key={peticion.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <p className="text-white text-sm mb-3 italic">
                          "{peticion.texto}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-blue-200">
                            <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>
                              {peticion.oraciones_count}{' '}
                              {peticion.oraciones_count === 1
                                ? 'persona orando'
                                : 'personas orando'}
                            </span>
                          </div>
                          <Button
                            onClick={() => handleMarcarRespondida(peticion.id)}
                            size="sm"
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Dios respondió
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Peticiones respondidas */}
              {peticionesRespondidas.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Respondidas ({peticionesRespondidas.length})
                  </h4>
                  <div className="space-y-3">
                    {peticionesRespondidas.map((peticion) => (
                      <div
                        key={peticion.id}
                        className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <p className="text-white text-sm italic">
                            "{peticion.texto}"
                          </p>
                        </div>
                        <div className="text-xs text-green-300 font-semibold">
                          ✨ Dios respondió
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal para crear testimonio */}
      {mostrarTestimonio && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <Card className="max-w-md w-full bg-gradient-to-br from-blue-900 to-blue-950 border-white/20">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">✨</div>
                <h3 className="text-xl font-bold text-white mb-1">
                  ¡Dios respondió!
                </h3>
                <p className="text-sm text-blue-200">
                  Comparte tu testimonio para fortalecer la fe de otros.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">
                    ¿Qué hizo Dios?
                  </label>
                  <textarea
                    value={textoTestimonio}
                    onChange={(e) => setTextoTestimonio(e.target.value)}
                    placeholder="Cuéntanos tu testimonio..."
                    maxLength={500}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    rows={4}
                  />
                  <div className="text-xs text-blue-300 text-right">
                    {textoTestimonio.length}/500
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">
                    Visibilidad
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setVisiblePublicamente(true)}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        visiblePublicamente
                          ? 'bg-amber-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      🌎 Compartir con la comunidad
                    </button>
                    <button
                      onClick={() => setVisiblePublicamente(false)}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        !visiblePublicamente
                          ? 'bg-amber-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      🔒 Mantener privado
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMostrarTestimonio(null)
                      setTextoTestimonio('')
                    }}
                    className="flex-1 text-blue-200 hover:text-white"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCrearTestimonio}
                    disabled={creandoTestimonio || textoTestimonio.trim().length < 10}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white disabled:opacity-50"
                  >
                    {creandoTestimonio ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Compartir testimonio
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}