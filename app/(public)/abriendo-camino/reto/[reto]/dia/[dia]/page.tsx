'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DEVOCIONALES } from '@/lib/devocionales'
import { saveUsuario, getProgress } from '@/lib/storage'
import { ArrowRight, CheckCircle2, XCircle, Flame, Sparkles } from 'lucide-react'
import { LoginModal } from '@/components/LoginModal'

export default function DiaPage() {
  const params = useParams()
  const router = useRouter()
  const dia = parseInt(params.dia as string)
  const devocional = DEVOCIONALES.find(d => d.dia === dia)

  const [paso, setPaso] = useState(0)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correcto' | 'incorrecto' | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [progress, setProgress] = useState<any>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  if (!devocional) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-light to-white">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-dark">Día no encontrado</h2>
          <Button className="mt-4" onClick={() => router.push('/abriendo-camino')}>
            Volver al inicio
          </Button>
        </Card>
      </div>
    )
  }

  const totalDias = DEVOCIONALES.length

  const faseLabels = {
    conecta: '🔗 FASE 1: CONECTA - Jesús llamó',
    crece: '🌱 FASE 2: CRECE - Jesús entrenó',
    multiplica: '🚀 FASE 3: MULTIPLICA - Jesús envió'
  }

  const faseColors = {
    conecta: 'bg-blue-500/20 text-blue-300',
    crece: 'bg-green-500/20 text-green-300',
    multiplica: 'bg-amber-500/20 text-amber-300'
  }

  const handleContinuar = () => {
    setPaso(paso + 1)
    setOpcionSeleccionada(null)
    setFeedback(null)

    // Mostrar login después de completar el día 2
    if (paso === 4 && dia === 2 && !progress?.usuario) {
      setTimeout(() => setShowLogin(true), 500)
    }
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
    setProgress(getProgress())
    
    if (dia < totalDias) {
      router.push(`/abriendo-camino/reto/1/dia/${dia + 1}`)
    } else {
      router.push('/abriendo-camino')
    }
  }

  const handleLoginComplete = (nombre: string, telefono: string) => {
    saveUsuario(nombre, telefono)
    setShowLogin(false)
    setProgress(getProgress())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-4 flex items-center justify-center relative overflow-hidden">
      {/* Partículas decorativas */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-10px',
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        />
      ))}

      <Card className="w-full max-w-2xl glass-card animate-slide-up relative z-10">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-primary font-medium">
                Día {dia} de {totalDias}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${faseColors[devocional.fase]}`}>
                {faseLabels[devocional.fase]}
              </span>
            </div>
            <span className="text-sm font-semibold text-primary-dark text-right">
              {paso === 0 && '📖 LEE'}
              {paso === 1 && '🔎 DESCUBRE'}
              {paso === 2 && '❤️ CONECTA'}
              {paso === 3 && '🎯 CAMINA'}
              {paso === 4 && '🎉 COMPLETADO'}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((paso + 1) / 5) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {paso === 0 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-3xl font-bold text-primary-dark text-center">
                {devocional.titulo}
              </h2>
              <p className="text-center text-primary font-semibold text-lg">
                {devocional.lecturaRef}
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <p className="text-lg leading-relaxed text-primary-dark whitespace-pre-line italic">
                  {devocional.lecturaTexto}
                </p>
              </div>
              <p className="text-center text-primary italic text-sm font-medium">
                "{devocional.fraseDelDia}"
              </p>
            </div>
          )}

          {paso === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-primary-dark text-center">
                🔎 ¿Qué dice el texto?
              </h3>
              <p className="text-lg text-primary-dark text-center font-medium">
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
                        : 'border-white/20 bg-white/10 hover:border-primary'
                    }`}
                  >
                    <span className="font-medium text-primary-dark">{opcion.texto}</span>
                  </button>
                ))}
              </div>
              {feedback === 'correcto' && (
                <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg animate-slide-up">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-green-600" />
                    <span className="font-bold text-green-900">¡Lo descubriste!</span>
                  </div>
                  <p className="text-green-800">{devocional.descubre.explicacion}</p>
                  <p className="text-sm text-green-600 mt-2">— {devocional.descubre.versiculoApoyo}</p>
                </div>
              )}
              {feedback === 'incorrecto' && (
                <div className="bg-primary-light border-2 border-primary p-4 rounded-lg animate-slide-up">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-primary" />
                    <span className="text-primary-dark">💡 Casi. Vuelve al texto y observa nuevamente...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-primary-dark text-center">
                ❤️ Conecta con tu vida
              </h3>
              <p className="text-lg text-primary-dark text-center">
                {devocional.conecta.pregunta}
              </p>
              <div className="space-y-3">
                {devocional.conecta.opciones.map((opcion) => (
                  <button
                    key={opcion.id}
                    onClick={() => setOpcionSeleccionada(opcion.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      opcionSeleccionada === opcion.id
                        ? 'border-primary bg-primary-light'
                        : 'border-white/20 bg-white/10 hover:border-primary'
                    }`}
                  >
                    <span className="text-primary-dark">{opcion.texto}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-primary text-sm italic">
                No hay respuesta correcta. Es tu reflexión personal.
              </p>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-bold text-primary-dark text-center">
                🎯 Da un paso hoy
              </h3>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-2 border-primary">
                <p className="text-lg text-primary-dark text-center font-medium">
                  {devocional.camina.desafio}
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                <p className="text-sm text-primary-dark italic text-center">
                  {devocional.camina.oracion}
                </p>
              </div>
            </div>
          )}

          {paso === 4 && (
            <div className="space-y-4 text-center animate-fade-in">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-bold text-primary-dark">
                ¡Día {dia} completado!
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Flame className="text-amber-400 w-6 h-6" />
                <p className="text-lg text-primary-dark font-bold">
                  {dia} / {totalDias}
                </p>
              </div>
              <p className="text-primary">
                Hoy no solamente leíste la Palabra. Diste un paso para caminar con Dios.
              </p>
              {dia === 2 && !progress?.usuario && (
                <p className="text-sm text-amber-600 font-medium mt-4">
                   En el siguiente paso podrás guardar tu progreso
                </p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          {paso < 4 ? (
            <Button
              size="lg"
              className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold btn-magnetic"
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
              className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold btn-magnetic"
              onClick={handleCompletarDia}
            >
              {dia < totalDias ? 'SIGUIENTE DÍA' : 'VOLVER AL INICIO'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Modal de login */}
      {showLogin && (
        <LoginModal
          onComplete={handleLoginComplete}
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  )
}