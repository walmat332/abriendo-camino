'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Heart,
  Users,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  Loader2,
  Flame,
  HandHeart,
} from 'lucide-react'
import {
  getPeticionesPublicas,
  getEstadisticasComunitarias,
  getNombreUsuario,
  getTestimoniosPublicos,
} from '@/lib/oracion/queries'
import { getOrCreateUserId } from '@/lib/oracion/identity'
import type { Peticion, Testimonio } from '@/lib/oracion/types'
import { PrayerCard } from '@/components/oracion/prayer-card'
import { PrayerForm } from '@/components/oracion/prayer-form'
import { MyPrayers } from '@/components/oracion/my-prayers'
import { PrayerStats } from '@/components/oracion/prayer-stats'
import { TestimonyCard } from '@/components/oracion/testimony-card'

export default function OracionPage() {
  const router = useRouter()
  const [peticiones, setPeticiones] = useState<Peticion[]>([])
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showMyPrayers, setShowMyPrayers] = useState(false)
  const [stats, setStats] = useState({
    oracionesHoy: 0,
    oracionesMes: 0,
    peticionesActivas: 0,
  })
  const [activeTab, setActiveTab] = useState<'comunidad' | 'testimonios'>('comunidad')

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    setLoading(true)
    try {
      const [peticionesData, statsData, testimoniosData] = await Promise.all([
        getPeticionesPublicas(20),
        getEstadisticasComunitarias(),
        getTestimoniosPublicos(10),
      ])

      // Enriquecer peticiones con nombre del autor
      const peticionesEnriquecidas = await Promise.all(
        peticionesData.map(async (p) => {
          const nombre = await getNombreUsuario(p.usuario_id)
          return {
            ...p,
            nombre_autor: p.visibilidad === 'anonimo' ? 'Anónimo' : nombre || 'Anónimo',
          }
        })
      )

      // Enriquecer testimonios con nombre del autor y texto de la petición
      const testimoniosEnriquecidos = await Promise.all(
        testimoniosData.map(async (t) => {
          const nombre = await getNombreUsuario(t.usuario_id)
          return {
            ...t,
            nombre_autor: nombre || 'Anónimo',
          }
        })
      )

      setPeticiones(peticionesEnriquecidas)
      setTestimonios(testimoniosEnriquecidos)
      setStats(statsData)
    } catch (error) {
      console.error('❌ Error al cargar datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNuevaPeticion = () => {
    getOrCreateUserId() // Asegurar que tiene UUID
    setShowForm(true)
  }

  const handlePeticionCreada = () => {
    setShowForm(false)
    cargarDatos() // Recargar lista
  }

  const handleOracionActualizada = (peticionId: string) => {
    // Actualizar contador localmente
    setPeticiones((prev) =>
      prev.map((p) =>
        p.id === peticionId
          ? { ...p, oraciones_count: p.oraciones_count + 1 }
          : p
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 relative overflow-hidden">
      {/* Partículas decorativas */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/abriendo-camino')}
            className="text-blue-200 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-4 shadow-lg shadow-amber-500/30">
              <HandHeart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              🙏 ORACIÓN
            </h1>
            <p className="text-lg text-blue-200 max-w-md mx-auto">
              Pide oración. Ora por otros. Acompáñense en el camino.
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <PrayerStats stats={stats} />

        {/* Acciones principales */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button
            onClick={handleNuevaPeticion}
            className="h-24 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-lg shadow-amber-500/30 flex-col gap-2"
          >
            <MessageCircle className="w-6 h-6" />
            <span>PEDIR ORACIÓN</span>
          </Button>

          <Button
            onClick={() => setShowMyPrayers(true)}
            className="h-24 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base backdrop-blur-sm flex-col gap-2"
          >
            <Heart className="w-6 h-6" />
            <span>MI ORACIÓN</span>
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('comunidad')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
              activeTab === 'comunidad'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <Users className="inline w-4 h-4 mr-1" />
            NECESITAN ORACIÓN
          </button>
          <button
            onClick={() => setActiveTab('testimonios')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
              activeTab === 'testimonios'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <Sparkles className="inline w-4 h-4 mr-1" />
            HISTORIAS DE FE
          </button>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        ) : activeTab === 'comunidad' ? (
          <div className="space-y-4">
            {peticiones.length === 0 ? (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Flame className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Sé el primero
                  </h3>
                  <p className="text-blue-200 mb-4">
                    Aún no hay peticiones. ¡Sé el primero en compartir la tuya!
                  </p>
                  <Button
                    onClick={handleNuevaPeticion}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Pedir oración
                  </Button>
                </CardContent>
              </Card>
            ) : (
              peticiones.map((peticion) => (
                <PrayerCard
                  key={peticion.id}
                  peticion={peticion}
                  onOrar={handleOracionActualizada}
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {testimonios.length === 0 ? (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Próximamente
                  </h3>
                  <p className="text-blue-200">
                    Las historias de fe aparecerán aquí cuando haya testimonios.
                  </p>
                </CardContent>
              </Card>
            ) : (
              testimonios.map((testimonio) => (
                <TestimonyCard
                  key={testimonio.id}
                  testimonio={testimonio}
                />
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-blue-300 italic">
            "Nadie debería enfrentar solo lo que está viviendo."
          </p>
        </div>
      </div>

      {/* Modales */}
      {showForm && (
        <PrayerForm
          onClose={() => setShowForm(false)}
          onCreated={handlePeticionCreada}
        />
      )}

      {showMyPrayers && (
        <MyPrayers
          onClose={() => setShowMyPrayers(false)}
          onRefresh={cargarDatos}
        />
      )}
    </div>
  )
}