'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getDevocional, type Devocional } from '@/lib/devocionales'
import { getProgress, marcarDiaCompletado } from '@/lib/storage'
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, BookOpen } from 'lucide-react'
import { WeeklyCompletionCelebration } from '@/components/WeeklyCompletionCelebration'

export default function DiaPage() {
  const params = useParams()
  const router = useRouter()

  const semana = parseInt(params.reto as string) || 1
  const dia = parseInt(params.dia as string) || 1
  const diaAbsoluto = (semana - 1) * 7 + dia
  const esFinDeSemana = diaAbsoluto % 7 === 0
  const esSemana4 = semana === 4

  const [devocional, setDevocional] = useState<Devocional | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)
  const [paso, setPaso] = useState(1)
  
  // Estado para el Paso 2 (selección única)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  
  // Estados para el Paso 3 (selección múltiple + texto)
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState<string[]>([])
  const [compromisoTexto, setCompromisoTexto] = useState("")
  
  const [feedback, setFeedback] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
    }

    async function cargar() {
      try {
        setLoading(true)
        setErrorCarga(false)
        const data = await getDevocional(semana, dia)
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

  const completarDia = async () => {
    try {
      let progress = getProgress()
      if (!progress) {
        progress = {
          dias: {},
          startDate: new Date().toISOString(),
          lastAccess: new Date().toISOString()
        }
      }
      
      // Guardamos las opciones marcadas y el texto del compromiso
      const respuestasFinales = [
        ...opcionesSeleccionadas,
        compromisoTexto.trim() ? `Compromiso: ${compromisoTexto.trim()}` : ""
      ].filter(Boolean)

      await marcarDiaCompletado(progress, diaAbsoluto, respuestasFinales)
    } catch (error) {
      console.error('Error guardando progreso:', error)
    }
  }

  const continuar = async () => {
    // Si es el último paso, guardamos el progreso
    if (paso === 3) {
      await completarDia()
    }

    if (paso < 3) {
      setPaso(paso + 1)
      setOpcionSeleccionada(null)
      setOpcionesSeleccionadas([])
      setFeedback(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (esFinDeSemana) {
        setShowCelebration(true)
      } else {
        router.push('/abriendo-camino')
      }
    }
  }

  const seleccionarOpcion = (id: string) => {
    setOpcionSeleccionada(id)
    setFeedback(true)
  }

  // Función para marcar/desmarcar múltiples opciones en el Paso 3
  const toggleOpcion = (id: string) => {
    setOpcionesSeleccionadas(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
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
            <h1 className="text-xl font-semibold text-slate-800">No pudimos cargar este día</h1>
            <p className="mt-3 text-sm text-slate-600">Hubo un problema al cargar el contenido. Intenta nuevamente.</p>
            <Button className="mt-6 w-full" onClick={() => window.location.reload()}>Intentar nuevamente</Button>
            <Button variant="ghost" className="mt-2 w-full" onClick={() => router.push('/abriendo-camino')}>Volver al inicio</Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  const opcionCorrecta = devocional.descubre.opciones.find((opcion) => opcion.esCorrecta)

  return (
    <main className="min-h-screen bg-slate-50">
      {showCelebration && (
        <WeeklyCompletionCelebration semana={semana} esSemana4={esSemana4} tipo="semana" onNavigate={router.push} />
      )}

      <div className="mx-auto max-w-2xl px-4 py-6 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push('/abriendo-camino')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Salir
          </Button>
          <div className="text-center">
            <span className="text-sm font-medium text-slate-500">Semana {semana} · Día {dia}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2 text-xs text-slate-500">Paso {paso} de 3</div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-slate-800 transition-all" style={{ width: (paso / 3) * 100 + '%' }} />
          </div>
        </div>

        {/* PASO 1: LECTURA */}
        {paso === 1 && (
          <section>
            <Card className="mb-5 overflow-hidden">
              <CardContent className="p-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">{devocional.fase}</p>
                <h1 className="text-3xl font-bold leading-tight text-slate-900">{devocional.titulo}</h1>
                <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                  <p className="text-sm font-semibold text-emerald-800">{devocional.lecturaRef}</p>
                  <p className="mt-3 text-lg leading-8 text-slate-700">{devocional.lecturaTexto}</p>
                </div>
              </CardContent>
            </Card>
            {devocional.fraseDelDia && (
              <Card className="mb-5 bg-amber-50 border-amber-100">
                <CardContent className="p-6">
                  <Heart className="mb-3 h-6 w-6 text-amber-600" />
                  <p className="text-lg font-medium leading-7 text-slate-800">{devocional.fraseDelDia}</p>
                </CardContent>
              </Card>
            )}
            <Button className="w-full" size="lg" onClick={continuar}>Continuar <ArrowRight className="ml-2 h-5 w-5" /></Button>
          </section>
        )}

        {/* PASO 2: DESCUBRE (Selección única) */}
        {paso === 2 && (
          <section>
            <Card className="mb-5">
              <CardContent className="p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Descubre</p>
                <h2 className="text-2xl font-bold text-slate-900">{devocional.descubre.pregunta}</h2>
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
                          (seleccionada ? (correcta ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : 'border-slate-200 bg-white hover:bg-slate-50')
                        }
                      >
                        <span className="font-medium text-slate-800">{opcion.texto}</span>
                      </button>
                    )
                  })}
                </div>
                {feedback && (
                  <div className="mt-5 rounded-xl bg-slate-100 p-4">
                    <p className="font-medium text-slate-800">
                      {opcionSeleccionada === opcionCorrecta?.id ? '🎉 ¡Lo descubriste!' : 'Aún no. Inténtalo nuevamente.'}
                    </p>
                    {opcionSeleccionada === opcionCorrecta?.id && devocional.descubre.explicacion && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">{devocional.descubre.explicacion}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            <Button className="w-full" size="lg" onClick={continuar} disabled={!opcionSeleccionada}>
              Continuar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </section>
        )}

        {/* PASO 3: CONECTA (Selección múltiple + Texto integrado en Camina hoy) */}
        {paso === 3 && (
          <section>
            <Card className="mb-5">
              <CardContent className="p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Conecta</p>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{devocional.conecta.pregunta}</h2>
                <p className="text-sm text-slate-600 mb-4">(Puedes marcar una o varias opciones)</p>

                {devocional.conecta.opciones.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {devocional.conecta.opciones.map((opcion) => {
                      const estaSeleccionada = opcionesSeleccionadas.includes(opcion.id)
                      return (
                        <button
                          key={opcion.id}
                          type="button"
                          onClick={() => toggleOpcion(opcion.id)}
                          className={
                            'w-full rounded-xl border-2 p-4 text-left transition-all duration-200 flex items-center justify-between ' +
                            (estaSeleccionada ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50')
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${estaSeleccionada ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                              {estaSeleccionada && (
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium ${estaSeleccionada ? 'text-blue-900' : 'text-slate-800'}`}>{opcion.texto}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* CAMINA HOY CON CAMPO DE TEXTO INTEGRADO */}
                <div className="mt-8 rounded-2xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-800 mb-3">Camina hoy</p>
                  <p className="leading-7 text-slate-700 mb-4">{devocional.camina.desafio}</p>
                  
                  <textarea
                    value={compromisoTexto}
                    onChange={(e) => setCompromisoTexto(e.target.value)}
                    placeholder="Escribe aquí tu compromiso práctico para hoy..."
                    className="w-full rounded-xl border-2 border-slate-300 bg-white p-4 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[100px] resize-y"
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-800">Oración</p>
                  <p className="mt-2 leading-7 text-slate-700">{devocional.camina.oracion}</p>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={continuar}>
              <CheckCircle2 className="mr-2 h-5 w-5" /> Terminar día
            </Button>
          </section>
        )}
      </div>
    </main>
  )
}