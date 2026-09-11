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
    const data = getProgress()
    setProgress(data)
    setMounted(true)

    if (data?.dias && Object.keys(data.dias).length >= 2 && !data.usuario) {
      setShowLogin(true)
    }
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  const diasCompletadosGlobales = progress?.dias ? Object.keys(progress.dias).filter((d) => progress.dias[parseInt(d)]?.completado === true).length : 0
  const totalDias = 28
  const diasCompletados = diasCompletadosGlobales >= totalDias ? totalDias : diasCompletadosGlobales
  const semanaActual = Math.ceil(diasCompletados / 7) || 1
  const diaSemanaActual = ((diasCompletados - 1) % 7) + 1
  const siguienteDiaAbsoluto = diasCompletados >= totalDias ? totalDias : diasCompletados + 1
  const siguienteSemana = Math.ceil(siguienteDiaAbsoluto / 7)
  const siguienteDiaSemana = ((siguienteDiaAbsoluto - 1) % 7) + 1
  const retoCompletado = diasCompletadosGlobales >= totalDias
  const progresoPorcentaje = Math.min((diasCompletadosGlobales / totalDias) * 100, 100)

  const handleContinuar = () => {
    router.push(`/abriendo-camino/reto/${siguienteSemana}/dia/${siguienteDiaSemana}`)
  }

  const handleLoginComplete = (nombre: string, telefono: string) => {
    saveUsuario(nombre, telefono)
    setShowLogin(false)
    setProgress(getProgress())
  }

  return (
    <main className="min-h-screen bg-[#F7F8F6] pb-24">
      {/* HERO */}
      <section className="relative min-h-[500px] overflow-hidden">
        <Image src="/hero-crece.jpg" alt="Persona avanzando" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-[#173F32]" />

        <div className="relative z-10 px-5 pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide text-white">CRECE</h1>
                <p className="text-[11px] font-medium tracking-wide text-white/80">Descubre · Conecta · Crece</p>
              </div>
            </div>
            <button onClick={() => router.push('/abriendo-camino/grupos')} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/25 active:scale-95">
              <Users className="h-4 w-4" />
              <span>Grupos</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-3xl flex-col justify-end px-5 pb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Tu camino de hoy</span>
          </div>
          <h2 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            No te quedes <br /> donde estás.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Crece con Dios, descubre tu propósito y vive para transformar a otros.
          </p>
        </div>
      </section>

      {/* RETO ACTUAL */}
      <section className="relative z-20 mx-auto -mt-8 max-w-3xl px-4">
        <div className="overflow-hidden rounded-[28px] bg-[#174936] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-900/20">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-200">Reto actual</p>
                <h3 className="mt-1 text-xl font-bold text-white">7 días — Volver a Dios</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">Un encuentro que puede cambiar tu camino.</p>
              </div>
<div className="hidden shrink-0 rounded-full bg-emerald-300 px-3 py-1.5 text-xs font-bold text-[#174936] sm:block">
              Día {siguienteDiaSemana} de 7
            </div>
            </div>

            <div className="mt-5 flex items-center justify-between sm:hidden">
              <span className="text-xs font-medium text-white/60">Tu progreso</span>
              <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-[#174936]">Día {siguienteDiaSemana} de 7</span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-white/60">{diasCompletados} de 7 días completados</span>
                <span className="font-semibold text-emerald-200">{Math.round(progresoPorcentaje)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-emerald-300 transition-all duration-500" style={{ width: `${progresoPorcentaje}%` }} />
              </div>
            </div>

            <button onClick={handleContinuar} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-bold text-[#123B2C] shadow-lg transition hover:bg-emerald-300 active:scale-[0.98]">
              {retoCompletado ? 'Volver a vivir el reto' : 'Continuar mi camino'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* MI CAMINO */}
      <section className="mx-auto max-w-3xl px-4 pt-10">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Tu proceso</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Mi camino</h3>
          <p className="mt-1 text-sm text-gray-500">Un paso cada día para crecer con Dios.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* CONEXIÓN */}
          <button onClick={() => router.push('/abriendo-camino/proposito?seccion=conexion')} className="group relative overflow-hidden rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50"><Heart className="h-5 w-5 text-pink-500" /></div>
              <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">CONEXIÓN</h4>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">Conoce a Cristo. Conecta con otros.</p>
          </button>

          {/* CRECIMIENTO */}
          <button onClick={() => router.push('/abriendo-camino/proposito?seccion=crecimiento')} className="group relative overflow-hidden rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50"><Sprout className="h-5 w-5 text-emerald-600" /></div>
              <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">CRECIMIENTO</h4>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">Lee la Palabra. Desarrolla tu fe.</p>
          </button>

          {/* SERVICIO */}
          <button onClick={() => router.push('/abriendo-camino/proposito?seccion=servicio')} className="group relative overflow-hidden rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50"><HandHeart className="h-5 w-5 text-orange-500" /></div>
              <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">SERVICIO</h4>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">Descubre tus dones. Sirve a otros.</p>
          </button>

          {/* MULTIPLICACIÓN */}
          <button onClick={() => router.push('/abriendo-camino/proposito?seccion=multiplicacion')} className="group relative overflow-hidden rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50"><Users className="h-5 w-5 text-violet-600" /></div>
              <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">MULTIPLICACIÓN</h4>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">Comparte a Jesús. Haz discípulos.</p>
          </button>
        </div>
      </section>

      {/* FRASE FINAL */}
      <section className="mx-auto max-w-3xl px-4 pb-8 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#EAF3EE] p-6">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-200/40" />
          <div className="relative">
            <Sprout className="mb-4 h-6 w-6 text-emerald-700" />
            <p className="text-base font-medium leading-relaxed text-[#244438]">“Porque yo sé los planes que tengo para ustedes...”</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Jeremías 29:11</p>
          </div>
        </div>
      </section>

      {/* NAVEGACIÓN INFERIOR */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200/80 bg-white/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-around">
          <button onClick={() => router.push('/abriendo-camino')} className="flex min-w-[80px] flex-col items-center gap-1 rounded-2xl px-4 py-2 text-emerald-700 transition active:scale-95">
            <Flame className="h-5 w-5" />
            <span className="text-[11px] font-bold">Reto</span>
          </button>
          <button onClick={() => router.push('/abriendo-camino/oracion')} className="flex min-w-[80px] flex-col items-center gap-1 rounded-2xl px-4 py-2 text-gray-400 transition hover:text-orange-500 active:scale-95">
            <MessageCircle className="h-5 w-5" />
            <span className="text-[11px] font-semibold">Oración</span>
          </button>
          <button onClick={() => router.push('/abriendo-camino/mas')} className="flex min-w-[80px] flex-col items-center gap-1 rounded-2xl px-4 py-2 text-gray-400 transition hover:text-violet-600 active:scale-95">
            <Target className="h-5 w-5" />
            <span className="text-[11px] font-semibold">Propósito</span>
          </button>
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onComplete={handleLoginComplete} />}
    </main>
  )
}