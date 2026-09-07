'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Sprout, HandHeart, Users, ArrowRight, BookOpen, Mountain, Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DiagnosticFlow } from './components/DiagnosticFlow'
import { ResultMap } from './components/ResultMap'
import { VersiculoModal } from '@/components/VersiculoModal'
import { GruposModal } from './components/GruposModal'

type SeccionId = 'conexion' | 'crecimiento' | 'servicio' | 'multiplicacion'

const secciones = [
  { id: 'conexion' as SeccionId, titulo: 'MI CONEXIÓN', descripcion: 'Conoce a Cristo • Conecta con otros • Encuentra tu comunidad', Icono: Heart, bgCard: 'bg-blue-50', bgIcon: 'bg-blue-100', textTitle: 'text-blue-700', textDesc: 'text-blue-600', btnBg: 'bg-blue-600 hover:bg-blue-700' },
  { id: 'crecimiento' as SeccionId, titulo: 'MI CRECIMIENTO', descripcion: 'Crece como discípulo • Aprende • Sé transformado', Icono: Sprout, bgCard: 'bg-green-50', bgIcon: 'bg-green-100', textTitle: 'text-green-700', textDesc: 'text-green-600', btnBg: 'bg-green-600 hover:bg-green-700' },
  { id: 'servicio' as SeccionId, titulo: 'MI SERVICIO', descripcion: 'Descubre tus dones • Sirve • Bendice a otros', Icono: HandHeart, bgCard: 'bg-orange-50', bgIcon: 'bg-orange-100', textTitle: 'text-orange-700', textDesc: 'text-orange-600', btnBg: 'bg-orange-500 hover:bg-orange-600' },
  { id: 'multiplicacion' as SeccionId, titulo: 'MI MULTIPLICACIÓN', descripcion: 'Forma a otros • Haz discípulos • Ayuda a otros a crecer', Icono: Users, bgCard: 'bg-purple-50', bgIcon: 'bg-purple-100', textTitle: 'text-purple-700', textDesc: 'text-purple-600', btnBg: 'bg-purple-600 hover:bg-purple-700' },
]

export default function PropositoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // 1. Detectar si la URL tiene ?seccion=
  const seccionDesdeURL = searchParams.get('seccion') as SeccionId
  const seccionValida = secciones.some(s => s.id === seccionDesdeURL) ? seccionDesdeURL : null
  
  // 2. Inicializar el estado directamente en 'diagnostico' si viene de un acceso directo
  const [estado, setEstado] = useState<'intro' | 'diagnostico' | 'resultado'>(
    seccionValida ? 'diagnostico' : 'intro'
  )
  const [showVersiculo, setShowVersiculo] = useState(false)
  const [showGrupos, setShowGrupos] = useState(false)
  const [seccionActual, setSeccionActual] = useState<SeccionId | null>(seccionValida)
  const [resultados, setResultados] = useState({ conexion: [], crecimiento: [], servicio: [], multiplicacion: [] })

  const handleIniciarPaso = (seccion: SeccionId) => { 
    setSeccionActual(seccion)
    setEstado('diagnostico') 
  }
  
  const handleCompletarPaso = (respuestas: string[]) => {
    if (seccionActual) {
      const nuevos = { ...resultados, [seccionActual]: respuestas }
      setResultados(nuevos)
      setEstado(Object.values(nuevos).every(r => r.length > 0) ? 'resultado' : 'intro')
    }
    setSeccionActual(null)
  }
  
  const handleReiniciar = () => { 
    setResultados({ conexion: [], crecimiento: [], servicio: [], multiplicacion: [] })
    setEstado('intro') 
  }

  // 3. Limpia la URL al volver atrás para evitar bucles de reapertura
  const handleVolverAlInicio = () => {
    setEstado('intro')
    setSeccionActual(null)
    router.push('/abriendo-camino/proposito')
  }

  // Renderizado condicional: Diagnóstico, Resultado o Mapa General
  if (estado === 'diagnostico' && seccionActual) {
    return <DiagnosticFlow seccion={seccionActual} onComplete={handleCompletarPaso} onBack={handleVolverAlInicio} />
  }

  if (estado === 'resultado') {
    return <ResultMap resultados={resultados} onReiniciar={handleReiniciar} />
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <button onClick={() => setShowVersiculo(true)} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all border border-slate-200 hover:scale-105">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Versículo del día</span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-2">TU CAMINO</h1>
          <h2 className="text-5xl md:text-7xl font-bold italic bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'cursive' }}>tiene propósito</h2>
        </div>

        <p className="text-center text-slate-700 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
          "El propósito de Jesús no era solamente reunir seguidores, <br />sino formar discípulos que continuaran su misión."
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 flex-wrap">
          <span className="text-blue-600 font-bold text-lg md:text-xl tracking-wider">LLAMÓ</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-green-600 font-bold text-lg md:text-xl tracking-wider">FORMÓ</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-orange-600 font-bold text-lg md:text-xl tracking-wider">ENVIÓ</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-purple-600 font-bold text-lg md:text-xl tracking-wider">MULTIPLICARON</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {secciones.map((seccion) => {
            const { Icono } = seccion
            const completada = resultados[seccion.id].length > 0
            return (
              <div key={seccion.id} id={seccion.id} className={`${seccion.bgCard} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50 relative overflow-hidden scroll-mt-20`}>
                {completada && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${seccion.bgIcon} flex items-center justify-center shadow-md`}>
                    <Icono className={`w-8 h-8 ${seccion.textTitle}`} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className={`text-xl font-black ${seccion.textTitle} text-center mb-3 tracking-tight`}>{seccion.titulo}</h3>
                <p className={`text-sm ${seccion.textDesc} text-center mb-6 leading-relaxed`}>
                  {seccion.descripcion.split('•').map((item, idx) => (
                    <span key={idx}>{item.trim()}{idx < 2 && <span className="mx-1">•</span>}</span>
                  ))}
                </p>
                <Button 
                  onClick={() => handleIniciarPaso(seccion.id)} 
                  className={`w-full ${seccion.btnBg} text-white font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
                >
                  Explorar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">¿DÓNDE ESTÁS HOY?</h3>
              <p className="text-slate-600">Descubre en qué etapa estás y cuál es tu siguiente paso para vivir el propósito que Dios tiene para ti.</p>
            </div>
          </div>
          <Button 
            onClick={() => setEstado('diagnostico')} 
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Comenzar evaluación completa
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {showVersiculo && <VersiculoModal onClose={() => setShowVersiculo(false)} />}
      {showGrupos && <GruposModal onClose={() => setShowGrupos(false)} />}
    </div>
  )
}