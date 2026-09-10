'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Loader2, AlertCircle } from 'lucide-react'
import { CATEGORIAS } from '@/lib/oracion/types'
import type { CategoriaOracion, VisibilidadPeticion } from '@/lib/oracion/types'
import { crearPeticion, puedeCrearPeticion } from '@/lib/oracion/mutations'
import { getOrCreateUserId } from '@/lib/oracion/identity'

interface PrayerFormProps {
  onClose: () => void
  onCreated: () => void
}

export function PrayerForm({ onClose, onCreated }: PrayerFormProps) {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState<CategoriaOracion>('situacion_personal')
  const [visibilidad, setVisibilidad] = useState<VisibilidadPeticion>('publico')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCrear = async () => {
    setError(null)

    // Validaciones
    if (texto.trim().length < 10) {
      setError('Cuéntanos un poco más sobre tu petición (mínimo 10 caracteres).')
      return
    }

    if (texto.trim().length > 500) {
      setError('Tu petición es muy larga. Máximo 500 caracteres.')
      return
    }

    setLoading(true)

    try {
      // 1. Obtener el UUID (debería ser el mismo que se guardó en el registro)
      const usuarioId = getOrCreateUserId()
      
      // 🔍 AUDITORÍA: Ver en consola qué UUID se está usando
      console.log('🆔 UUID que se usará para la petición:', usuarioId)

      // Verificar rate limiting
      const puedeCrear = await puedeCrearPeticion(usuarioId)
      if (!puedeCrear) {
        setError('Has alcanzado el límite de peticiones por hoy. Vuelve mañana. 🙏')
        setLoading(false)
        return
      }

      // 2. Crear la petición
      const resultado = await crearPeticion({
        usuario_id: usuarioId,
        texto: texto.trim(),
        categoria,
        visibilidad, // 'publico' o 'anonimo'
      })

      if (resultado.success) {
        onCreated()
      } else {
        setError(resultado.error || 'Ocurrió un error al crear la petición.')
      }
    } catch (err) {
      console.error('❌ Error al crear petición:', err)
      setError('No pudimos conectar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-lg w-full max-h-[90vh] bg-gradient-to-br from-blue-900 to-blue-950 border-white/20 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              📝 Pedir oración
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Comparte lo que estás viviendo. No estás solo/a.
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
        <CardContent className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Texto de la petición */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              ¿Por qué quieres que oremos?
            </label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Cuéntanos por qué necesitas oración..."
              maxLength={500}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              rows={5}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-blue-300">
                {texto.trim().length < 10 && texto.length > 0
                  ? 'Mínimo 10 caracteres'
                  : 'Mínimo 10 caracteres'}
              </span>
              <span className="text-xs text-blue-300">
                {texto.length}/500
              </span>
            </div>
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              Categoría
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoria(cat.value)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    categoria === cat.value
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visibilidad */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              ¿Cómo quieres aparecer?
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setVisibilidad('publico')}
                className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  visibilidad === 'publico'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <span className="text-lg">👤</span>
                <div className="text-left">
                  <div className="font-semibold">Mostrar mi nombre</div>
                  <div className="text-xs opacity-80">
                    Los demás verán tu nombre
                  </div>
                </div>
              </button>

              <button
                onClick={() => setVisibilidad('anonimo')}
                className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  visibilidad === 'anonimo'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <span className="text-lg">👻</span>
                <div className="text-left">
                  <div className="font-semibold">Publicar como anónimo</div>
                  <div className="text-xs opacity-80">
                    Los demás verán "Anónimo"
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Botón crear */}
          <Button
            onClick={handleCrear}
            disabled={loading || texto.trim().length < 10}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-lg shadow-amber-500/30 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                🙏 PEDIR ORACIÓN
              </>
            )}
          </Button>

          {/* Nota de privacidad */}
          <p className="text-xs text-blue-300 text-center">
            Tu petición será revisada por la comunidad con amor y respeto. 🙏
          </p>
        </CardContent>
      </Card>
    </div>
  )
}