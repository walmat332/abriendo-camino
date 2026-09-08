'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart, Users, Sparkles, MessageCircle, ArrowLeft, Loader2, Flame, HandHeart } from 'lucide-react'
import { getPeticionesPublicas, getEstadisticasComunitarias, getNombreUsuario, getTestimoniosPublicos } from '@/lib/oracion/queries'
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
  const [stats, setStats] = useState({ oracionesHoy: 0, oracionesMes: 0, peticionesActivas: 0 })
  const [activeTab, setActiveTab] = useState<'comunidad' | 'testimonios'>('comunidad')

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    setLoading(true)
    try {
      const [peticionesData, statsData, testimoniosData] = await Promise.all([
        getPeticionesPublicas(20),
        getEstadisticasComunitarias(),
        getTestimoniosPublicos(10),
      ])
      const peticionesEnriquecidas = await Promise.all(
        peticionesData.map(async (p) => {
          const nombre = await getNombreUsuario(p.usuario_id)
          return { ...p, nombre_autor: p.visibilidad === 'anonimo' ? 'Anónimo' : nombre || 'Anónimo' }
        })
      )
      const testimoniosEnriquecidos = await Promise.all(
        testimoniosData.map(async (t) => {
          const nombre = await getNombreUsuario(t.usuario_id)
          return { ...t, nombre_autor: nombre || 'Anónimo' }
        })
      )
      setPeticiones(peticionesEnriquecidas)
      setTestimonios(testimoniosEnriquecidos)
      setStats(statsData)
    } catch (error) {
      console.error('Error cargando datos de oración:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOracionActualizada = (peticionId: string) => {
    setPeticiones((prev) =>
      prev.map((p) =>
        p.id === peticionId ? { ...p, oraciones_count: p.oraciones_count + 1 } : p
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-blue-50 relative">
      {/* Imagen atmosférica sutil de fondo */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span className="text-amber-500">🙏</span> ORACIÓN
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-1">
              Pide oración. Ora por otros. No camines solo.
            </p>
          </div>
        </div>

        {/* ESTADÍSTICAS DE COMUNIDAD */}
        <PrayerStats stats={stats} />

        {/* ACCIONES PRINCIPALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={() => setShowForm(true)}
            className="h-auto py-6 bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-2"
          >
            <span className="text-2xl">🙏</span>
            <span>PEDIR ORACIÓN</span>
          </Button>
          <Button
            onClick={() => setShowMyPrayers(true)}
            variant="outline"
            className="h-auto py-6 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2"
          >
            <span className="text-2xl">🤍</span>
            <span>MIS ORACIONES</span>
          </Button>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl w-fit mx-auto md:mx-0">
          <button
            onClick={() => setActiveTab('comunidad')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'comunidad' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            NECESITAN ORACIÓN
          </button>
          <button
            onClick={() => setActiveTab('testimonios')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'testimonios' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            HISTORIAS DE FE
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-amber-500" />
            <p>Cargando peticiones de la comunidad...</p>
          </div>
        ) : activeTab === 'comunidad' ? (
          <div className="space-y-4">
            {peticiones.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No hay peticiones activas en este momento.</p>
                <p className="text-slate-400 text-sm mt-1">¡Sé el primero en compartir una necesidad!</p>
              </div>
            ) : (
              peticiones.map((peticion) => (
                <PrayerCard key={peticion.id} peticion={peticion} onOrar={handleOracionActualizada} />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {testimonios.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Aún no hay historias de fe compartidas.</p>
              </div>
            ) : (
              testimonios.map((testimonio) => (
                <TestimonyCard key={testimonio.id} testimonio={testimonio} />
              ))
            )}
          </div>
        )}

        {/* FRASE FINAL EMOCIONAL */}
        <div className="mt-16 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
            <HandHeart className="w-6 h-6" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-slate-700 italic leading-relaxed max-w-xl mx-auto">
            "No tienes que caminar solo. Hay personas que pueden orar contigo."
          </p>
        </div>
      </div>

      {/* MODALES */}
      {showForm && <PrayerForm onClose={() => setShowForm(false)} onCreated={() => { setShowForm(false); cargarDatos(); }} />}
      {showMyPrayers && <MyPrayers onClose={() => setShowMyPrayers(false)} onRefresh={cargarDatos} />}
    </div>
  )
}

