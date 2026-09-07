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
  UserRound,
  MessageCircle,
  Share2,
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

    if (
      data?.dias &&
      Object.keys(data.dias).length >= 2 &&
      !data.usuario
    ) {
      setShowLogin(true)
    }
  }, [])

  if (!mounted) return null

  const diasCompletados = progress?.dias
    ? Object.keys(progress.dias).length
    : 0

  const siguienteDia = Math.min(diasCompletados + 1, 7)

  const porcentaje = Math.min(
    Math.round((diasCompletados / 7) * 100),
    100
  )

  const handleContinuar = () => {
    router.push(
      `/abriendo-camino/reto/1/dia/${siguienteDia}`
    )
  }

  const handleLoginComplete = (
    nombre: string,
    telefono: string
  ) => {
    saveUsuario(nombre, telefono)
    setShowLogin(false)
    setProgress(getProgress())
  }

  const compartir = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CRECE',
          text: 'Un paso cada día para crecer con Dios.',
          url,
        })
      } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      alert('Enlace copiado')
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f6]">

      {/* =====================================================
          CONTENEDOR PRINCIPAL
      ====================================================== */}

      <div className="mx-auto min-h-screen w-full max-w-[520px] overflow-hidden bg-white shadow-2xl md:my-8 md:min-h-[900px] md:rounded-[32px]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative h-[430px] overflow-hidden">

          {/* Imagen */}
          <Image
            src="/hero-crece.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />

          {/* Oscurecimiento */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/75" />

          {/* =================================================
              HEADER
          ================================================== */}

          <div className="relative z-10 flex items-center justify-between px-7 pt-6">

            {/* Logo */}
            <div className="flex items-center gap-2.5">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                <Sprout className="h-6 w-6 text-lime-300" />
              </div>

              <div>
                <h1 className="text-[24px] font-black leading-none tracking-tight text-white">
                  CRECE
                </h1>

                <p className="mt-1 text-[8px] font-semibold tracking-wide text-white/80">
                  Descubre · Conecta · Crece
                </p>
              </div>

            </div>

            {/* Grupos */}
            <button
              onClick={() =>
                router.push('/abriendo-camino/grupos')
              }
              className="flex flex-col items-center text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur-md">
                <Users className="h-5 w-5" />
              </div>

              <span className="mt-1 text-[9px] font-medium">
                Grupos
              </span>
            </button>

          </div>

          {/* =================================================
              MENSAJE
          ================================================== */}

          <div className="absolute bottom-[145px] left-0 z-10 w-full px-8">

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lime-300">
              Tu camino de hoy
            </p>

            <h2 className="max-w-[340px] text-[38px] font-black leading-[0.95] tracking-tight text-white">
              No te quedes
              <br />
              donde estás.
            </h2>

            <p className="mt-3 max-w-[285px] text-[14px] leading-[1.35] text-white/90">
              Crece en tu relación con Dios,
              <br />
              crece en su Palabra,
              <br />
              crece para vivir tu propósito.
            </p>

          </div>

          {/* =================================================
              RETO SOBRE LA IMAGEN
          ================================================== */}

          <div className="absolute bottom-0 left-0 z-20 w-full px-7">

            <div className="relative overflow-hidden rounded-t-[20px] bg-[#073f3b]/95 px-5 py-4 backdrop-blur-md">

              {/* Imagen pequeña decorativa */}
              <div className="absolute right-0 top-0 h-full w-[38%] opacity-40">

                <Image
                  src="/hero-crece.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#073f3b] to-transparent" />

              </div>

              <div className="relative z-10 flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500">
                  <Flame className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0">

                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/60">
                    Reto actual
                  </p>

                  <h3 className="mt-0.5 text-[15px] font-black text-white">
                    7 días — Volver a Dios
                  </h3>

                  <p className="mt-0.5 text-[10px] text-white/70">
                    Un encuentro que puede cambiar tu camino.
                  </p>

                </div>

                <div className="ml-auto shrink-0 rounded-full bg-emerald-300 px-3 py-1.5 text-[9px] font-black text-emerald-950">
                  Día {siguienteDia} de 7
                </div>

              </div>

              <button
                onClick={handleContinuar}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTINUAR
        ====================================================== */}

        <section className="px-7 pt-3">

          <button
            onClick={handleContinuar}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-[14px] font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            {diasCompletados > 0
              ? 'Continuar mi camino'
              : 'Comenzar mi camino'}

            <ArrowRight className="h-5 w-5" />
          </button>

        </section>

        {/* =====================================================
            MI CAMINO
        ====================================================== */}

        <section className="px-7 pb-4 pt-5">

          <div className="mb-3">

            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700">
              Mi camino
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Un paso cada día para crecer con Dios.
            </p>

          </div>

          {/* =================================================
              4 ÁREAS
          ================================================== */}

          <div className="grid grid-cols-4 gap-2">

            {/* CONEXIÓN */}
            <button
              onClick={() =>
                router.push('/abriendo-camino/proposito?seccion=conexion')
              }
              className="group min-h-[118px] rounded-xl bg-rose-50 p-3 text-left transition hover:-translate-y-1"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-400 text-white">
                <Heart className="h-5 w-5" />
              </div>

              <h4 className="mt-3 text-[9px] font-black text-slate-800">
                CONEXIÓN
              </h4>

              <p className="mt-1 text-[7px] leading-[1.35] text-slate-500">
                Conoce a Cristo.
                <br />
                Conecta con otros.
              </p>

              <ArrowRight className="mt-2 h-3 w-3 text-slate-500" />

            </button>

            {/* CRECIMIENTO → Reto Día 1 */}
            <button
              onClick={() =>
                router.push('/abriendo-camino/reto/1/dia/1')
              }
              className="group min-h-[118px] rounded-xl bg-green-50 p-3 text-left transition hover:-translate-y-1"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white">
                <Sprout className="h-5 w-5" />
              </div>

              <h4 className="mt-3 text-[9px] font-black text-slate-800">
                CRECIMIENTO
              </h4>

              <p className="mt-1 text-[7px] leading-[1.35] text-slate-500">
                Lee la Palabra.
                <br />
                Desarrolla tu fe.
              </p>

              <ArrowRight className="mt-2 h-3 w-3 text-slate-500" />

            </button>

            {/* SERVICIO → Propósito */}
            <button
              onClick={() =>
                router.push('/abriendo-camino/proposito')
              }
              className="group min-h-[118px] rounded-xl bg-orange-50 p-3 text-left transition hover:-translate-y-1"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-white">
                <HandHeart className="h-5 w-5" />
              </div>

              <h4 className="mt-3 text-[9px] font-black text-slate-800">
                SERVICIO
              </h4>

              <p className="mt-1 text-[7px] leading-[1.35] text-slate-500">
                Descubre tus dones.
                <br />
                Sirve a otros.
              </p>

              <ArrowRight className="mt-2 h-3 w-3 text-slate-500" />

            </button>

            {/* MULTIPLICACIÓN → Grupos */}
            <button
              onClick={() =>
                router.push('/abriendo-camino/grupos')
              }
              className="group min-h-[118px] rounded-xl bg-purple-50 p-3 text-left transition hover:-translate-y-1"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-white">
                <Users className="h-5 w-5" />
              </div>

              <h4 className="mt-3 text-[9px] font-black text-slate-800">
                MULTIPLICACIÓN
              </h4>

              <p className="mt-1 text-[7px] leading-[1.35] text-slate-500">
                Comparte a Jesús.
                <br />
                Haz discípulos.
              </p>

              <ArrowRight className="mt-2 h-3 w-3 text-slate-500" />

            </button>

          </div>

        </section>

        {/* =====================================================
            VERSÍCULO
        ====================================================== */}

        <section className="mx-7 mb-4 rounded-xl bg-slate-50 px-4 py-3">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
              <Sprout className="h-4 w-4 text-green-600" />
            </div>

            <div className="min-w-0">

              <p className="truncate text-[9px] italic text-slate-500">
                "Porque yo sé los planes que tengo para ustedes..."
              </p>

              <p className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-slate-400">
                Jeremías 29:11
              </p>

            </div>

            <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-300" />

          </div>

        </section>

        {/* =====================================================
            NAVEGACIÓN INFERIOR
        ====================================================== */}

        <nav className="sticky bottom-0 border-t border-slate-100 bg-white/95 px-8 py-3 backdrop-blur-md">

          <div className="flex items-center justify-around">

            <button
              onClick={() =>
                router.push('/abriendo-camino')
              }
              className="flex flex-col items-center gap-1 text-emerald-600"
            >
              <Flame className="h-5 w-5" />

              <span className="text-[8px] font-bold">
                Reto
              </span>
            </button>

            <button
              onClick={() =>
                router.push('/abriendo-camino/oracion')
              }
              className="flex flex-col items-center gap-1 text-slate-400"
            >
              <MessageCircle className="h-5 w-5" />

              <span className="text-[8px] font-bold">
                Oración
              </span>
            </button>

            <button
              onClick={() =>
                router.push('/abriendo-camino/dashboard')
              }
              className="flex flex-col items-center gap-1 text-slate-400"
            >
              <UserRound className="h-5 w-5" />

              <span className="text-[8px] font-bold">
                Más
              </span>
            </button>

          </div>

        </nav>

      </div>

      {/* =====================================================
          LOGIN
      ====================================================== */}

      {showLogin && (
        <LoginModal
          onComplete={handleLoginComplete}
          onClose={() => setShowLogin(false)}
        />
      )}

    </main>
  )
}
