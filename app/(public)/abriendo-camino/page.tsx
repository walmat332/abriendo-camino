'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ArrowRight,
  Users,
  Heart,
  Sprout,
  HandHeart,
  MessageCircle,
  Target,
  Flame,
  ChevronRight,
} from 'lucide-react'

import { getProgress, saveUsuario } from '@/lib/storage'
import { LoginModal } from '@/components/LoginModal'

export default function AbriendoCaminoIndex() {
  const router = useRouter()
  const [progress, setProgress] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    // Desregistrar Service Workers residuales
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
    }

    const data = getProgress()
    setProgress(data)
    setMounted(true)
    if (data?.dias && Object.keys(data.dias).length >= 2 && !data.usuario) {
      setShowLogin(true)
    }
  }, [])

  if (!mounted) return null

  const diasCompletados = progress?.dias ? Object.keys(progress.dias).length : 0
  const siguienteDia = Math.min(diasCompletados + 1, 7)

  const handleContinuar = () => {
    router.push(`/abriendo-camino/reto/1/dia/${siguienteDia}`)
  }

  const handleLoginComplete = (nombre: string, telefono: string) => {
    saveUsuario(nombre, telefono)
    setShowLogin(false)
    setProgress(getProgress())
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header con imagen hero - Diseño compacto como en móvil */}
      <div className="relative bg-gradient-to-b from-blue-600 to-purple-700 overflow-hidden">
        <Image
          src="/hero-crece.jpg"
          alt="Hero"
          width={400}
          height={600}
          className="w-full h-auto object-cover opacity-60"
          priority
        />
        
        {/* Logo CRECE */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CRECE</h1>
              <p className="text-xs text-white/80">Descubre · Conecta · Crece</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/abriendo-camino/grupos')}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition"
          >
            <Users className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Texto principal sobre la imagen */}
        <div className="relative z-10 px-4 pt-24 pb-8">
          <p className="text-green-300 text-sm font-semibold mb-2">TU CAMINO DE HOY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            No te quedes donde estás.
          </h2>
          <p className="text-white/90 text-sm md:text-base max-w-md">
            Crece en tu relación con Dios, crece en su Palabra, crece para vivir tu propósito.
          </p>
        </div>

        {/* Card del reto actual - Superpuesta sobre la imagen */}
        <div className="relative z-20 bg-gradient-to-br from-green-800/90 to-teal-900/90 backdrop-blur-sm rounded-t-3xl px-4 pt-6 pb-4 -mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-orange-500 p-2 rounded-full">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex-grow">
              <p className="text-xs text-white/80 uppercase font-semibold">Reto Actual</p>
              <h3 className="text-lg font-bold text-white">7 días — Volver a Dios</h3>
              <p className="text-sm text-white/80">Un encuentro que puede cambiar tu camino.</p>
            </div>
            <div className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold">
              Día {siguienteDia} de 7
            </div>
          </div>

          <button
            onClick={handleContinuar}
            className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            Continuar mi camino
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Mi Camino - 4 fases en grid 2x2 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">MI CAMINO</h3>
          <p className="text-sm text-gray-600 mb-4">Un paso cada día para crecer con Dios.</p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/abriendo-camino/proposito')}
              className="bg-pink-50 hover:bg-pink-100 p-4 rounded-2xl text-left transition-colors group"
            >
              <div className="bg-pink-100 p-3 rounded-full w-fit mb-3 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">CONEXIÓN</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Conoce a Cristo. Conecta con otros.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2" />
            </button>

            <button
              onClick={() => router.push('/abriendo-camino/reto/1/dia/1')}
              className="bg-green-50 hover:bg-green-100 p-4 rounded-2xl text-left transition-colors group"
            >
              <div className="bg-green-100 p-3 rounded-full w-fit mb-3 group-hover:scale-110 transition-transform">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">CRECIMIENTO</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Lee la Palabra. Desarrolla tu fe.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2" />
            </button>

            <button
              onClick={() => router.push('/abriendo-camino/oracion')}
              className="bg-orange-50 hover:bg-orange-100 p-4 rounded-2xl text-left transition-colors group"
            >
              <div className="bg-orange-100 p-3 rounded-full w-fit mb-3 group-hover:scale-110 transition-transform">
                <HandHeart className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">SERVICIO</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Descubre tus dones. Sirve a otros.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2" />
            </button>

            <button
              onClick={() => router.push('/abriendo-camino/grupos')}
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-2xl text-left transition-colors group"
            >
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">MULTIPLICACIÓN</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Comparte a Jesús. Haz discípulos.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2" />
            </button>
          </div>
        </div>

        {/* Versículo inspirador */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 flex items-start gap-3 border border-green-100">
          <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
            <Sprout className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-700 italic">"Porque yo sé los planes que tengo para ustedes..."</p>
            <p className="text-xs text-gray-500 mt-1 font-semibold">JEREMÍAS 29:11</p>
          </div>
        </div>
      </div>

      {/* Navegación inferior - Siempre visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => router.push('/abriendo-camino')}
          className="flex flex-col items-center gap-1 text-green-600"
        >
          <Flame className="w-6 h-6" />
          <span className="text-xs font-semibold">Reto</span>
        </button>
        <button
          onClick={() => router.push('/abriendo-camino/oracion')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-semibold">Oración</span>
        </button>
        <button
          onClick={() => router.push('/abriendo-camino/mas')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition"
        >
          <Target className="w-6 h-6" />
          <span className="text-xs font-semibold">Más</span>
        </button>
      </div>

      {/* Modal de Login */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onComplete={handleLoginComplete}
        />
      )}
    </div>
  )
}