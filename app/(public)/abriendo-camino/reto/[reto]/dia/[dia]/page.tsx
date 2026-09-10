'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getDevocional, type Devocional } from '@/lib/devocionales'
import { getProgress, marcarDiaCompletado } from '@/lib/storage'
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, BookOpen } from 'lucide-react'

export default function DiaPage() {
  const params = useParams()
  const router = useRouter()

  const semana = parseInt(params.reto as string) || 1
  const dia = parseInt(params.dia as string) || 1

  const [devocional, setDevocional] = useState<Devocional | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)
  const [paso, setPaso] = useState(1)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  const [feedback, setFeedback] = useState(false)

  useEffect(() => {
    // 1. DESREGISTRAR SERVICE WORKERS RESIDUALES (Solución pantalla blanca en móvil)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister()
          console.log("✅ SW desregistrado:", registration.scope)
        }
      })
    }

    // 2. Lógica original de carga
    async function cargar() {
      try {
        setLoading(true)
        setErrorCarga(false)

        console.log('Cargando reto:', { semana, dia })

        const data = await getDevocional(semana, dia)

        console.log('Devocional recibido:', data)

        if (!data) {
          setErrorCarga(true)
          setDevocional(null)
          return
        }

        setDevocional(data)
      } catch (error) {
        console.error('ERROR CARGANDO RETO:', error)
        setErrorCarga(true)
        setDevocional(null)
      } finally {
        setLoading(false)
      }
    }

    cargar()
  }, [semana, dia])

  const siguienteDia = dia + 1

  const completarDia = async () => {
    try {
      const progress = getProgress()
      if (!progress) return
      await marcarDiaCompletado(progress, dia, [])
    } catch (error) {
      console.error('Error guardando progreso:', error)
    }
  }

  const continuar = async () => {
    await completarDia()

    if (paso < 3) {
      setPaso(paso + 1)
      setOpcionSeleccionada(null)
      setFeedback(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Aquí podríamos agregar la lógica de fin de semana (día 7, 14, 21, 28) más adelante
      router.push('/abriendo-camino/reto/1/dia/' + siguienteDia)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
          <p className="text-slate-600">Preparando tu día...</p>
        </div>
      </main>
    )
  }

  if (errorCarga || !devocional) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-400" />

            <h1 className="text-xl font-semibold text-slate-800">
              No pudimos cargar este día
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Hubo un problema al cargar el contenido. Intenta nuevamente.
            </p>

            <Button
              className="mt-6 w-full"
              onClick={() => window.location.reload()}
            >
              Intentar nuevamente
            </Button>

            <Button
              variant="ghost"
              className="mt-2 w-full"
              onClick={() => router.push('/abriendo-camino')}
            >
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  const opcionCorrecta = devocional.descubre.opciones.find(
    (opcion) => opcion.esCorrecta
  )

  const seleccionarOpcion = (id: string) => {
    setOpcionSeleccionada(id)
    setFeedback(true)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-6 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/abriendo-camino')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Salir
          </Button>

          <span className="text-sm font-medium text-slate-500">
            Día {dia}
          </span>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>Paso {paso} de 3</span>
            <span>{Math.round((paso / 3) * 100)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-800 transition-all"
              style={{ width: (paso / 3) * 100 + '%' }}
            />
          </div>
        </div>

        {paso === 1 && (
          <section>
            <Card className="mb-5 overflow-hidden">
              <CardContent className="p-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">
                  {devocional.fase}
                </p>

                <h1 className="text-3xl font-bold leading-tight text-slate-900">
                  {devocional.titulo}
                </h1>

                <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                  <p className="text-sm font-semibold text-slate-700">
                    {devocional.lecturaRef}
                  </p>

                  <p className="mt-3 text-lg leading-8 text-slate-700">
                    {devocional.lecturaTexto}
                  </p>
                </div>
              </CardContent>
            </Card>

            {devocional.fraseDelDia && (
              <Card className="mb-5">
                <CardContent className="p-6">
                  <Heart className="mb-3 h-6 w-6 text-slate-700" />

                  <p className="text-lg font-medium leading-7 text-slate-800">
                    {devocional.fraseDelDia}
                  </p>
                </CardContent>
              </Card>
            )}

            <Button className="w-full" size="lg" onClick={continuar}>
              Continuar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </section>
        )}

        {paso === 2 && (
          <section>
            <Card className="mb-5">
              <CardContent className="p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Descubre
                </p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {devocional.descubre.pregunta}
                </h2>

                <div className="mt-6 space-y-3">
                  {devocional.descubre.opciones.map((opcion) => {
                    const seleccionada = opcionSeleccionada === opcion.id
                    const correcta = opcion.esCorrecta

                    return (
                      <button
                        key={opcion.id}
                        type="button"
                        onClick={() => seleccionarOpcion(opcion.id)}
                        className={
                          'w-full rounded-xl border p-4 text-left transition ' +
                          (seleccionada
                            ? correcta
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-400 bg-red-50'
                            : 'border-slate-200 bg-white hover:bg-slate-50')
                        }
                      >
                        <span className="font-medium text-slate-800">
                          {opcion.texto}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {feedback && (
                  <div className="mt-5 rounded-xl bg-slate-100 p-4">
                    <p className="font-medium text-slate-800">
                      {opcionSeleccionada === opcionCorrecta?.id
                        ? '¡Muy bien!'
                        : 'Tómate un momento para volver a pensar en la pregunta.'}
                    </p>

                    {devocional.descubre.explicacion && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {devocional.descubre.explicacion}
                      </p>
                    )}

                    {devocional.descubre.versiculoApoyo && (
                      <p className="mt-3 text-sm font-medium text-slate-700">
                        {devocional.descubre.versiculoApoyo}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={continuar}
              disabled={!opcionSeleccionada}
            >
              Continuar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </section>
        )}

        {paso === 3 && (
          <section>
            <Card className="mb-5">
              <CardContent className="p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Conecta
                </p>

                <h2 className="text-2xl font-bold text-slate-900">
                  {devocional.conecta.pregunta}
                </h2>

                {devocional.conecta.opciones.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {devocional.conecta.opciones.map((opcion) => (
                      <button
                        key={opcion.id}
                        type="button"
                        onClick={() => setOpcionSeleccionada(opcion.id)}
                        className={
                          'w-full rounded-xl border p-4 text-left transition ' +
                          (opcionSeleccionada === opcion.id
                            ? 'border-slate-800 bg-slate-100'
                            : 'border-slate-200 bg-white hover:bg-slate-50')
                        }
                      >
                        <span className="font-medium text-slate-800">
                          {opcion.texto}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-800">Camina hoy</p>

                  <p className="mt-2 leading-7 text-slate-700">
                    {devocional.camina.desafio}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-800">Oración</p>

                  <p className="mt-2 leading-7 text-slate-700">
                    {devocional.camina.oracion}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={continuar}>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Terminar día
            </Button>
          </section>
        )}
      </div>
    </main>
  )
}