'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { getDevocional, type Devocional } from '@/lib/devocionales'
import { 
  saveUsuario, getProgress, saveProgress, marcarDiaCompletado, 
  puedeAccederAlDia, getHorasRestantes
} from '@/lib/storage'
import { ArrowRight, CheckCircle2, XCircle, Home, Clock, Loader2, Users, ArrowLeft, Flame } from 'lucide-react'
import { LoginModal } from '@/components/LoginModal'

const MENSAJES_SEMANA: Record<number, { titulo: string; mensaje: string; emoji: string }> = {
  1: { titulo: "¡Semana 1 Completada!", mensaje: "Has dado el primer paso. Volver a Dios es el inicio de una nueva vida. ¡Sigue firme!", emoji: "" },
  2: { titulo: "¡Semana 2 Completada!", mensaje: "Estás creciendo en la fe. Cada día te acerca más a Jesús. ¡No te detengas!", emoji: "🌿" },
  3: { titulo: "¡Semana 3 Completada!", mensaje: "Servir a otros es servir a Cristo. Tu amor está transformando vidas. ¡Continúa!", emoji: "🤝" }
}

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
  const [showLogin, setShowLogin] = useState(false)
  const [progress, setProgress] = useState<any>(null)
  const [noDisponible, setNoDisponible] = useState(false)
  const [horasRestantes, setHorasRestantes] = useState(0)

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      const data = await getDevocional(semana, dia)
      setDevocional(data)
      setLoading(false)
    }
    cargar()
  }, [semana, dia])

  useEffect(() => {
    if (devocional) {
      const currentProgress = getProgress()
      setProgress(currentProgress)
      if (currentProgress) {
        const puedeAcceder = puedeAccederAlDia(dia, currentProgress)
        if (!puedeAcceder) {
          setNoDisponible(true)
          setHorasRestantes(getHorasRestantes(currentProgress))
        }
      }
    }
  }, [devocional, dia])

  const handleLoginComplete = (nombre: string, telefono: string) => {
    saveUsuario(nombre, telefono)
    setShowLogin(false)
    setProgress(getProgress())
  }

  const handleCompletarDia = () => {
    marcarDiaCompletado(getProgress(), dia, [])
    setProgress(getProgress())
    
    if (devocional && devocional.dia % 7 === 0) {
      router.push('/abriendo-camino')
    } else {
      router.push(`/abriendo-camino/reto/1/dia/${dia + 1}`)
    }
  }

  const handleReiniciar = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
      localStorage.removeItem('abriendo-camino-progress')
      router.push('/abriendo-camino')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!devocional) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Día no encontrado</h2>
          <Button className="w-full" onClick={() => router.push('/abriendo-camino')}>
            <Home className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Card>
      </div>
    )
  }

  if (noDisponible) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Paciencia!</h2>
            <p className="text-slate-600 mb-2">Estás en <strong>Modo Diario</strong>.</p>
            <p className="text-slate-600 mb-6">Tu próximo día estará disponible en aproximadamente:</p>
            <div className="text-4xl font-black text-blue-600 mb-6">{horasRestantes}h</div>
            <Button onClick={() => router.push('/abriendo-camino')} className="w-full">
              <Home className="mr-2 h-4 w-4" /> Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const faseLabels: Record<string, string> = {
    conecta: '🔗 FASE 1: CONECTA - Jesús llamó',
    crece: ' FASE 2: CRECE - Jesús entrenó',
    sirve: '🤝 FASE 3: SIRVE - Jesús envió a servir',
    multiplica: '🚀 FASE 4: MULTIPLICA - Jesús formó discípulos'
  }

  const esFinDeSemana = devocional.dia % 7 === 0
  const mensajeSemana = MENSAJES_SEMANA[devocional.semana]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <Card className="max-w-2xl mx-auto shadow-xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/abriendo-camino')} className="text-slate-500">
              <ArrowLeft className="mr-1 h-4 w-4" /> Inicio
            </Button>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {faseLabels[devocional.fase] || devocional.fase}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">{devocional.titulo}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              Semana {devocional.semana}
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
              Día {devocional.dia}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {paso === 0 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-1">{devocional.lecturaRef}</p>
                <p className="text-slate-700 italic leading-relaxed">"{devocional.lecturaTexto}"</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800 font-semibold text-center">"{devocional.fraseDelDia}"</p>
              </div>
            </div>
          )}

          {paso === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> {devocional.descubre.pregunta}
              </h3>
              <div className="space-y-2">
                {devocional.descubre.opciones.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => {
                      setOpcionSeleccionada(op.id)
                      setFeedback(op.esCorrecta ? 'correcto' : 'incorrecto')
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      opcionSeleccionada === op.id
                        ? op.esCorrecta
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{op.texto}</span>
                      {opcionSeleccionada === op.id && (
                        op.esCorrecta ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {feedback === 'correcto' && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-green-800 font-medium mb-1">¡Correcto! 🎉</p>
                  <p className="text-green-700 text-sm">{devocional.descubre.explicacion}</p>
                  <p className="text-green-600 text-xs font-bold mt-2">{devocional.descubre.versiculoApoyo}</p>
                </div>
              )}
              {feedback === 'incorrecto' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-red-800 font-medium">No es la mejor opción. ¡Inténtalo de nuevo!</p>
                </div>
              )}
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" /> {devocional.conecta.pregunta}
              </h3>
              <div className="space-y-2">
                {devocional.conecta.opciones.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setOpcionSeleccionada(op.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      opcionSeleccionada === op.id
                        ? 'border-purple-500 bg-purple-50 text-purple-800'
                        : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-800 text-white p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" /> Tu desafío de hoy
                </h3>
                <p className="text-slate-200 mb-6">{devocional.camina.desafio}</p>
                <div className="bg-white/10 p-4 rounded-xl">
                  <p className="text-sm font-bold text-amber-300 mb-1">Oremos juntos:</p>
                  <p className="text-white italic">"{devocional.camina.oracion}"</p>
                </div>
              </div>
            </div>
          )}

          {paso === 4 && (
            <div className="space-y-4 text-center py-8">
              <div className="text-6xl mb-4">{mensajeSemana?.emoji || '🎉'}</div>
              <h3 className="text-2xl font-bold text-slate-900">
                {mensajeSemana?.titulo || `¡Día ${devocional.dia} completado!`}
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                {mensajeSemana?.mensaje || "Hoy no solamente leíste la Palabra. Diste un paso para caminar con Dios."}
              </p>
              {dia === 2 && !progress?.usuario && (
                <p className="text-sm text-amber-600 font-medium mt-4 bg-amber-50 p-3 rounded-lg">
                  💡 En el siguiente paso podrás guardar tu progreso con tu nombre.
                </p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
          {paso < 4 ? (
            <Button 
              size="lg" 
              className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold" 
              onClick={() => setPaso(paso + 1)} 
              disabled={(paso === 1 && feedback !== 'correcto') || (paso === 2 && !opcionSeleccionada)}
            >
              CONTINUAR <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <div className="w-full space-y-3">
              <Button 
                size="lg" 
                className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold" 
                onClick={handleCompletarDia}
              >
                {esFinDeSemana ? `COMPLETAR SEMANA ${devocional.semana}` : 'IR AL SIGUIENTE DÍA'} 
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 py-6" onClick={handleReiniciar}>
                  Reiniciar
                </Button>
                <Button variant="outline" className="flex-1 py-6" onClick={() => router.push('/abriendo-camino')}>
                  Inicio
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
      
      {showLogin && (
        <LoginModal onComplete={handleLoginComplete} onClose={() => { setShowLogin(false); router.push('/abriendo-camino') }} />
      )}
    </div>
  )
}