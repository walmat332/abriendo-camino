'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DEVOCIONALES } from '@/lib/devocionales'
import { 
  saveUsuario, getProgress, saveProgress, marcarDiaCompletado, 
  getSiguienteDiaDisponible, puedeAccederAlDia, getHorasRestantes
} from '@/lib/storage'
import { ArrowRight, CheckCircle2, XCircle, Flame, Home, Clock, ArrowLeft, Users } from 'lucide-react'
import { LoginModal } from '@/components/LoginModal'

export default function DiaPage() {
  const params = useParams()
  const router = useRouter()
  const dia = parseInt(params.dia as string)
  const devocional = DEVOCIONALES.find(d => d.dia === dia)

  const semanaNumero = devocional ? devocional.semana : Math.ceil(dia / 7)
  const diaEnSemana = devocional ? ((devocional.dia - 1) % 7) + 1 : ((dia - 1) % 7) + 1

  const [paso, setPaso] = useState(0)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correcto' | 'incorrecto' | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [progress, setProgress] = useState<any>(null)
  const [noDisponible, setNoDisponible] = useState(false)
  const [horasRestantes, setHorasRestantes] = useState(0)

  useEffect(() => {
    const currentProgress = getProgress()
    setProgress(currentProgress)
    if (currentProgress) {
      const puedeAcceder = puedeAccederAlDia(dia, currentProgress)
      if (!puedeAcceder) {
        setNoDisponible(true)
        setHorasRestantes(getHorasRestantes(currentProgress))
      }
    }
  }, [dia])

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
    crece: '🌱 FASE 2: CRECE - Jesús entrenó',
    sirve: '🤝 FASE 3: SIRVE - Jesús envió a servir',
    multiplica: '🚀 FASE 4: MULTIPLICA - Jesús envió a hacer discípulos'
  }

  const faseColors: Record<string, string> = {
    conecta: 'bg-blue-100 text-blue-700',
    crece: 'bg-green-100 text-green-700',
    sirve: 'bg-purple-100 text-purple-700',
    multiplica: 'bg-amber-100 text-amber-700'
  }

  const handleContinuar = () => {
    setPaso(paso + 1)
    setOpcionSeleccionada(null)
    setFeedback(null)
    if (paso === 3 && dia === 2 && !progress?.usuario) {
      setTimeout(() => setShowLogin(true), 500)
    }
  }

  const handleRespuestaDescubre = (opcionId: string) => {
    setOpcionSeleccionada(opcionId)
    const opcion = devocional.descubre.opciones.find(o => o.id === opcionId)
    if (opcion?.esCorrecta) setFeedback('correcto')
    else setFeedback('incorrecto')
  }

  const handleCompletarDia = () => {
    let currentProgress = getProgress() || { dias: {}, startDate: new Date().toISOString(), lastAccess: new Date().toISOString() }
    currentProgress = marcarDiaCompletado(currentProgress, dia, [])
    saveProgress(currentProgress)
    setProgress(currentProgress)
    
    if (dia === 2 && !currentProgress?.usuario) {
      setShowLogin(true)
      return
    }
    
    if (dia === 28) return 

    const siguienteDia = getSiguienteDiaDisponible(currentProgress)
    const siguienteDevocional = DEVOCIONALES.find(d => d.dia === siguienteDia)
    
    if (siguienteDevocional) {
      router.push(`/abriendo-camino/reto/abriendo-camino/dia/${siguienteDia}`)
    } else {
      router.push('/abriendo-camino')
    }
  }

  const handleLoginComplete = (nombre: string, telefono: string) => {
    saveUsuario(nombre, telefono)
    let currentProgress = getProgress() || { dias: {}, startDate: new Date().toISOString(), lastAccess: new Date().toISOString() }
    currentProgress.usuario = { nombre, telefono }
    saveProgress(currentProgress)
    setShowLogin(false)
    setProgress(currentProgress)
    
    const siguienteDia = getSiguienteDiaDisponible(currentProgress)
    const siguienteDevocional = DEVOCIONALES.find(d => d.dia === siguienteDia)
    if (siguienteDevocional) {
      router.push(`/abriendo-camino/reto/abriendo-camino/dia/${siguienteDia}`)
    } else {
      router.push('/abriendo-camino')
    }
  }

  const esUltimoDia = dia === 28

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <button onClick={() => router.push('/abriendo-camino')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all border border-slate-200">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver al inicio</span>
        </button>
      </div>

      {[...Array(15)].map((_, i) => (
        <div key={i} className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
      ))}

      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-md border-white/50 shadow-xl relative z-10 mt-12">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-600 font-medium">Semana {semanaNumero} - Día {diaEnSemana}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${faseColors[devocional.fase] || 'bg-slate-100 text-slate-600'}`}>
                {faseLabels[devocional.fase] || devocional.fase}
              </span>
            </div>
            <span className="text-sm font-semibold text-slate-700 text-right">
              {paso === 0 && '📖 LEE'}
              {paso === 1 && '🔎 DESCUBRE'}
              {paso === 2 && '💭 CONECTA'}
              {paso === 3 && '🎯 CAMINA'}
              {paso === 4 && '🎉 COMPLETADO'}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-500" style={{ width: `${((paso + 1) / 5) * 100}%` }} />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {paso === 0 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900 text-center">{devocional.titulo}</h2>
              <p className="text-center text-slate-600 font-semibold text-lg">{devocional.lecturaRef}</p>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-line italic">{devocional.lecturaTexto}</p>
              </div>
              <p className="text-center text-slate-500 italic text-sm font-medium">"{devocional.fraseDelDia}"</p>
            </div>
          )}

          {paso === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 text-center"> ¿Qué dice el texto?</h3>
              <p className="text-lg text-slate-700 text-center font-medium">{devocional.descubre.pregunta}</p>
              <div className="space-y-3">
                {devocional.descubre.opciones.map((opcion) => (
                  <button key={opcion.id} onClick={() => handleRespuestaDescubre(opcion.id)} disabled={feedback === 'correcto'} className={`w-full p-4 rounded-lg border-2 text-left transition-all ${opcionSeleccionada === opcion.id ? (feedback === 'correcto' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-slate-200 bg-white hover:border-amber-400'}`}>
                    <span className="font-medium text-slate-800">{opcion.texto}</span>
                  </button>
                ))}
              </div>
              {feedback === 'correcto' && (
                <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                    <span className="font-bold text-green-900">¡Lo descubriste!</span>
                  </div>
                  <p className="text-green-800">{devocional.descubre.explicacion}</p>
                  <p className="text-sm text-green-600 mt-2">— {devocional.descubre.versiculoApoyo}</p>
                </div>
              )}
              {feedback === 'incorrecto' && (
                <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-500 w-5 h-5" />
                    <span className="text-red-800">💡 Casi. Vuelve al texto y observa nuevamente...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 text-center">💭 Conecta con tu vida</h3>
              <p className="text-lg text-slate-700 text-center">{devocional.conecta.pregunta}</p>
              <div className="space-y-3">
                {devocional.conecta.opciones.map((opcion) => (
                  <button key={opcion.id} onClick={() => setOpcionSeleccionada(opcion.id)} className={`w-full p-4 rounded-lg border-2 text-left transition-all ${opcionSeleccionada === opcion.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white hover:border-amber-400'}`}>
                    <span className="text-slate-800">{opcion.texto}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-slate-500 text-sm italic">No hay respuesta correcta. Es tu reflexión personal.</p>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 text-center">🎯 Da un paso hoy</h3>
              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                <p className="text-lg text-slate-800 text-center font-medium">{devocional.camina.desafio}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 italic text-center">{devocional.camina.oracion}</p>
              </div>
            </div>
          )}

          {paso === 4 && (
            <div className="space-y-4 text-center">
              {esUltimoDia ? (
                <>
                  <div className="text-6xl">🏆</div>
                  <h3 className="text-2xl font-bold text-slate-900">¡Felicidades! Reto Completado</h3>
                  <div className="flex items-center justify-center gap-2">
                    <Flame className="text-amber-500 w-6 h-6" />
                    <p className="text-lg text-slate-800 font-bold">4 semanas completadas</p>
                  </div>
                  <p className="text-slate-600">Has dado un gran paso en tu caminar con Dios. El siguiente nivel es crecer en comunidad.</p>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                    <p className="text-amber-800 font-medium text-sm">💡 Recomendación: Únete a un Grupo de Conexión para seguir creciendo junto a otros.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-6xl">🎉</div>
                  <h3 className="text-2xl font-bold text-slate-900">¡Semana {semanaNumero} - Día {diaEnSemana} completado!</h3>
                  <p className="text-slate-600">Hoy no solamente leíste la Palabra. Diste un paso para caminar con Dios.</p>
                  {dia === 2 && !progress?.usuario && (
                    <p className="text-sm text-amber-600 font-medium mt-4 bg-amber-50 p-2 rounded">En el siguiente paso podrás guardar tu progreso</p>
                  )}
                </>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          {paso < 4 ? (
            <Button size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold" onClick={handleContinuar} disabled={(paso === 1 && feedback !== 'correcto') || (paso === 2 && !opcionSeleccionada)}>
              CONTINUAR <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : esUltimoDia && !progress?.dias[dia]?.completado ? (
            <Button size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold" onClick={handleCompletarDia}>
              FINALIZAR 4 SEMANAS <CheckCircle2 className="ml-2 h-5 w-5" />
            </Button>
          ) : esUltimoDia ? (
            <div className="w-full space-y-3">
              <Button size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold" onClick={() => { window.open('https://chat.whatsapp.com/TU_LINK_DE_GRUPO_AQUI', '_blank') }}>
                <Users className="mr-2 h-5 w-5" /> Únete a un Grupo de Conexión
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 py-6" onClick={() => { localStorage.removeItem('abriendo-camino-progress'); router.push('/abriendo-camino') }}>
                  🔄 Reiniciar
                </Button>
                <Button variant="outline" className="flex-1 py-6" onClick={() => router.push('/abriendo-camino')}>
                  🏠 Inicio
                </Button>
              </div>
            </div>
          ) : (
            <Button size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold" onClick={handleCompletarDia}>
              SIGUIENTE DÍA <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {showLogin && (
        <LoginModal onComplete={handleLoginComplete} onClose={() => { setShowLogin(false); router.push('/abriendo-camino') }} />
      )}
    </div>
  )
}