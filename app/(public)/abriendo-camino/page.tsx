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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header con imagen hero */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        <Image
          src="/hero-crece.jpg"
          alt="Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 p-4 md:p-6">
          <div className="flex items-center gap-2 text-white mb-2">
            <Sprout className="w-5 h-5 md:w-6 md:h-6" />
            <h1 className="text-xl md:text-2xl font-bold">CRECE</h1>
          </div>
          <p className="text-white/80 text-xs md:text-sm">Descubre · Conecta · Crece</p>
        </div>
        <button
          onClick={() => router.push('/abriendo-camino/grupos')}
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition"
        >
          <Users className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="px-4 md:px-6 -mt-6 md:-mt-8 relative z-20 max-w-6xl mx-auto">
        
        {/* Card de reto actual */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-start md:items-center gap-3 mb-4 flex-col md:flex-row">
            <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
            </div>
            <div className="flex-grow">
              <p className="text-xs text-gray-500 uppercase font-semibold">Reto Actual</p>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">7 días — Volver a Dios</h2>
              <p className="text-sm text-gray-600">Un encuentro que puede cambiar tu camino.</p>
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
              Día {siguienteDia} de 7
            </div>
          </div>

          <button
            onClick={handleContinuar}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Continuar mi camino
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Mi Camino - 4 fases */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Mi Camino</h3>
          <p className="text-sm text-gray-600 mb-4">Un paso cada día para crecer con Dios.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <button
              onClick={() => router.push('/abriendo-camino/proposito')}
              className="bg-pink-50 hover:bg-pink-100 p-4 rounded-xl text-left transition-colors group"
            >
              <div className="bg-pink-100 p-2 rounded-full w-fit mb-2 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">CONEXIÓN</h4>
              <p className="text-xs text-gray-600 mt-1">Conoce a Cristo. Conecta con otros.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => router.push('/abriendo-camino/reto/1/dia/1')}
              className="bg-green-50 hover:bg-green-100 p-4 rounded-xl text-left transition-colors group"
            >
              <div className="bg-green-100 p-2 rounded-full w-fit mb-2 group-hover:scale-110 transition-transform">
                <Sprout className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">CRECIMIENTO</h4>
              <p className="text-xs text-gray-600 mt-1">Lee la Palabra. Desarrolla tu fe.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => router.push('/abriendo-camino/oracion')}
              className="bg-orange-50 hover:bg-orange-100 p-4 rounded-xl text-left transition-colors group"
            >
              <div className="bg-orange-100 p-2 rounded-full w-fit mb-2 group-hover:scale-110 transition-transform">
                <HandHeart className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">SERVICIO</h4>
              <p className="text-xs text-gray-600 mt-1">Descubre tus dones. Sirve a otros.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => router.push('/abriendo-camino/grupos')}
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-xl text-left transition-colors group"
            >
              <div className="bg-purple-100 p-2 rounded-full w-fit mb-2 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">MULTIPLICACIÓN</h4>
              <p className="text-xs text-gray-600 mt-1">Comparte a Jesús. Haz discípulos.</p>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Versículo inspirador */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 md:p-5 mb-6 flex items-start gap-3 border border-blue-100">
          <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
            <Sprout className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm md:text-base text-gray-700 italic">"Porque yo sé los planes que tengo para ustedes..."</p>
            <p className="text-xs text-gray-500 mt-1 font-semibold">JEREMÍAS 29:11</p>
          </div>
        </div>
      </div>

      {/* Navegación inferior (solo visible en móvil) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center md:hidden z-50 shadow-lg">
        <button
          onClick={() => router.push('/abriendo-camino')}
          className="flex flex-col items-center gap-1 text-green-600"
        >
          <Flame className="w-6 h-6" />
          <span className="text-xs font-semibold">Reto</span>
        </button>
        <button
          onClick={() => router.push('/abriendo-camino/oracion')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-semibold">Oración</span>
        </button>
        <button
          onClick={() => router.push('/abriendo-camino/mas')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
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