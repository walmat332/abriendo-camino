'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getDevocional, type Devocional } from '@/lib/devocionales'
import { getProgress, marcarDiaCompletado } from '@/lib/storage'
import { ArrowRight, CheckCircle2, XCircle, Home, Loader2, Users, ArrowLeft, Flame, Trophy } from 'lucide-react'

export default function DiaPage() {
  const params = useParams()
  const router = useRouter()
  
  const semana = parseInt(params.reto as string) || 1
  const dia = parseInt(params.dia as string) || 1

  const [devocional, setDevocional] = useState<Devocional | null>(null)
  const [loading, setLoading] = useState(true)
  const [paso, setPaso] = useState(0)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correcto' | 'incorrecto' | null>(null)

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      const data = await getDevocional(semana, dia)
      setDevocional(data)
      setLoading(false)
    }
    cargar()
  }, [semana, dia])

  const handleCompletarDia = () => {
    const currentProgress = getProgress()
    if (!currentProgress) return
    
    marcarDiaCompletado(currentProgress, dia, [])
    
    // Si es día 7, 14, 21, o 28 (fin de semana)
    if (dia % 7 === 0) {
      setPaso(5) // Paso especial de celebración
    } else {
      // Ir al siguiente día
      router.push(`/abriendo-camino/reto/1/dia/${dia + 1}`)
    }
  }

  const handleComenzarSiguienteSemana = () => {
    const siguienteDia = dia + 1
    router.push(`/abriendo-camino/reto/1/dia/${siguienteDia}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!devocional) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Día no encontrado</h2>
          <p className="text-gray-600 mb-4">Semana: {semana}, Día: {dia}</p>
          <Button onClick={() => router.push('/abriendo-camino')}>
            <Home className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Card>
      </div>
    )
  }

  const esFinDeSemana = dia % 7 === 0
  const numeroSemana = Math.ceil(dia / 7)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.push('/abriendo-camino')}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Inicio
            </Button>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                Semana {numeroSemana}
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                Día {dia}
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {devocional.titulo}
          </h1>

          {/* PASO 0: Lectura */}
          {paso === 0 && (
            <div className="space-y-4 mt-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-1">{devocional.lecturaRef}</p>
                <p className="text-slate-700 italic">"{devocional.lecturaTexto}"</p>
              </div>
              <Button 
                className="w-full" 
                onClick={() => setPaso(1)}
              >
                CONTINUAR <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* PASO 1: Descubre */}
          {paso === 1 && (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-bold">{devocional.descubre.pregunta}</h3>
              <div className="space-y-2">
                {devocional.descubre.opciones.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => {
                      setOpcionSeleccionada(op.id)
                      setFeedback(op.esCorrecta ? 'correcto' : 'incorrecto')
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left ${
                      opcionSeleccionada === op.id
                        ? op.esCorrecta
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
              {feedback === 'correcto' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">¡Correcto! 🎉</p>
                  <p className="text-green-700 text-sm">{devocional.descubre.explicacion}</p>
                </div>
              )}
              {feedback === 'correcto' && (
                <Button className="w-full" onClick={() => setPaso(2)}>
                  CONTINUAR <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          )}

          {/* PASO 2: Conecta */}
          {paso === 2 && (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" /> {devocional.conecta.pregunta}
              </h3>
              <div className="space-y-2">
                {devocional.conecta.opciones.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setOpcionSeleccionada(op.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left ${
                      opcionSeleccionada === op.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
              {opcionSeleccionada && (
                <Button className="w-full" onClick={() => setPaso(3)}>
                  CONTINUAR <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          )}

          {/* PASO 3: Camina */}
          {paso === 3 && (
            <div className="space-y-4 mt-6">
              <div className="bg-slate-800 text-white p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" /> Tu desafío de hoy
                </h3>
                <p className="mb-4">{devocional.camina.desafio}</p>
                <div className="bg-white/10 p-4 rounded-xl">
                  <p className="text-sm font-bold text-amber-300 mb-1">Oremos:</p>
                  <p className="text-white italic">"{devocional.camina.oracion}"</p>
                </div>
              </div>
              <Button className="w-full" onClick={() => setPaso(4)}>
                COMPLETAR DÍA <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* PASO 4: Día completado */}
          {paso === 4 && !esFinDeSemana && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-2">¡Día {dia} completado!</h3>
              <Button className="w-full mt-4" onClick={handleCompletarDia}>
                IR AL SIGUIENTE DÍA <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* PASO 5: Semana completada (celebración) */}
          {paso === 5 && esFinDeSemana && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-full">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-3xl font-black mb-2">¡Lo Lograste!</h3>
              <h4 className="text-xl font-bold text-amber-600 mb-4">
                ¡Semana {numeroSemana} Completada!
              </h4>
              <p className="text-slate-600 mb-6">
                Has completado esta semana. Tu fe está creciendo cada día.
              </p>
              
              {dia === 28 ? (
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-6 rounded-xl">
                    <p className="text-amber-900 font-bold text-lg">🎊 ¡Felicidades! 🎊</p>
                    <p className="text-amber-800">
                      Has completado los 28 días del reto "Abriendo Camino".
                    </p>
                  </div>
                  <Button className="w-full mt-4" onClick={() => router.push('/abriendo-camino')}>
                    <Home className="mr-2 h-5 w-5" /> VOLVER AL INICIO
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-6 rounded-xl">
                    <p className="text-blue-900 font-bold text-lg">
                      🚀 Semana {numeroSemana + 1} te espera
                    </p>
                    <p className="text-blue-800">
                      Estás a un paso de comenzar la siguiente semana.
                    </p>
                  </div>
                  <Button className="w-full mt-4" onClick={handleComenzarSiguienteSemana}>
                    COMENZAR SEMANA {numeroSemana + 1} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}