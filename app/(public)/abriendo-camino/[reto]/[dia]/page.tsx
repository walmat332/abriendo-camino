 'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DEVOCIONALES } from '@/lib/devocionales'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

export default function DiaPage() {
  const params = useParams()
  const router = useRouter()
  const dia = parseInt(params.dia as string)
  const devocional = DEVOCIONALES.find(d => d.dia === dia)

  const [paso, setPaso] = useState(0)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correcto' | 'incorrecto' | null>(null)

  if (!devocional) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold text-amber-900">Día no encontrado</h2>
          <Button className="mt-4" onClick={() => router.push('/abriendo-camino')}>
            Volver al inicio
          </Button>
        </Card>
      </div>
    )
  }

  const totalDias = DEVOCIONALES.length

  const handleContinuar = () => {
    setPaso(paso + 1)
    setOpcionSeleccionada(null)
    setFeedback(null)
  }

  const handleRespuestaDescubre = (opcionId: string) => {
    setOpcionSeleccionada(opcionId)
    const opcion = devocional.descubre.opciones.find(o => o.id === opcionId)
    if (opcion?.esCorrecta) {
      setFeedback('correcto')
    } else {
      setFeedback('incorrecto')
    }
  }

  const handleCompletarDia = () => {
    const progreso = JSON.parse(localStorage.getItem('abriendo-camino-progress') || '{"dias":{}}')
    progreso.dias[dia] = { completado: true, fecha: new Date().toISOString() }
    localStorage.setItem('abriendo-camino-progress', JSON.stringify(progreso))
    
    if (dia < totalDias) {
      router.push(`/abriendo-camino/reto/1/dia/${dia + 1}`)
    } else {
      router.push('/abriendo-camino')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <span className="text-sm text-amber-600">Día {dia} de {totalDias}</span>
            <span className="text-sm font-semibold text-amber-900">
              {paso === 0 && '📖 LEE'}
              {paso === 1 && ' DESCUBRE'}
              {paso === 2 && '❤️ CONECTA'}
              {paso === 3 && '🎯 CAMINA'}
              {paso === 4 && ' COMPLETADO'}
            </span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
            <div 
              className="bg-amber-600 h-2 rounded-full transition-all"
              style={{ width: `${((paso + 1) / 5) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {paso === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-amber-900 text-center">
                {devocional.titulo}
              </h2>
              <p className="text-center text-amber-600 font-semibold">
                {devocional.lecturaRef}
              </p>
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <p className="text-lg leading-relaxed text-amber-900 whitespace-pre-line italic">
                  {devocional.lecturaTexto}
                </p>
              </div>
              <p className="text-center text-amber-700 italic text-sm">
                "{devocional.fraseDelDia}"
              </p>
            </div>
          )}

          {paso === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-900 text-center">
                🔎 ¿Qué dice el texto?
              </h3>
              <p className="text-lg text-amber-800 text-center font-medium">
                {devocional.descubre.pregunta}
              </p>
              <div className="space-y-3">
                {devocional.descubre.opciones.map((opcion) => (
                  <button
                    key={opcion.id}
                    onClick={() => handleRespuestaDescubre(opcion.id)}
                    disabled={feedback === 'correcto'}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      opcionSeleccionada === opcion.id
                        ? feedback === 'correcto'
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-amber-200 bg-white hover:border-amber-400'
                    }`}
                  >
                    <span className="font-medium text-amber-900">{opcion.texto}</span>
                  </button>
                ))}
              </div>
              {feedback === 'correcto' && (
                <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-green-600" />
                    <span className="font-bold text-green-900">¡Lo descubriste!</span>
                  </div>
                  <p className="text-green-800">{devocional.descubre.explicacion}</p>
                  <p className="text-sm text-green-600 mt-2">— {devocional.descubre.versiculoApoyo}</p>
                </div>
              )}
              {feedback === 'incorrecto' && (
                <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-amber-600" />
                    <span className="text-amber-900">💡 Casi. Vuelve al texto y observa nuevamente...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-900 text-center">
                ❤️ Conecta con tu vida
              </h3>
              <p className="text-lg text-amber-800 text-center">
                {devocional.conecta.pregunta}
              </p>
              <div className="space-y-3">
                {devocional.conecta.opciones.map((opcion) => (
                  <button
                    key={opcion.id}
                    onClick={() => setOpcionSeleccionada(opcion.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      opcionSeleccionada === opcion.id
                        ? 'border-amber-600 bg-amber-100'
                        : 'border-amber-200 bg-white hover:border-amber-400'
                    }`}
                  >
                    <span className="text-amber-900">{opcion.texto}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-amber-600 text-sm italic">
                No hay respuesta correcta. Es tu reflexión personal.
              </p>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-900 text-center">
                🎯 Da un paso hoy
              </h3>
              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300">
                <p className="text-lg text-amber-900 text-center font-medium">
                  {devocional.camina.desafio}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800 italic text-center">
                  {devocional.camina.oracion}
                </p>
              </div>
            </div>
          )}

          {paso === 4 && (
            <div className="space-y-4 text-center">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-bold text-amber-900">
                ¡Día {dia} completado!
              </h3>
              <p className="text-lg text-amber-800">
                 {dia} / {totalDias}
              </p>
              <p className="text-amber-700">
                Hoy no solamente leíste la Palabra. Diste un paso para caminar con Dios.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          {paso < 4 ? (
            <Button
              size="lg"
              className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
              onClick={handleContinuar}
              disabled={
                (paso === 1 && feedback !== 'correcto') ||
                (paso === 2 && !opcionSeleccionada)
              }
            >
              CONTINUAR
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
              onClick={handleCompletarDia}
            >
              {dia < totalDias ? 'SIGUIENTE DÍA' : 'VOLVER AL INICIO'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
