'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Home, Heart, Sprout, HandHeart, Users, 
  ArrowRight, ChevronDown, BookOpen, Mountain,
  Check, MessageCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DiagnosticFlow } from './components/DiagnosticFlow'
import { ResultMap } from './components/ResultMap'
import { VersiculoModal } from '@/components/VersiculoModal'
import { GruposModal } from './components/GruposModal'
import { getVersiculoDelDia } from '@/lib/versiculos'

type SeccionId = 'conexion' | 'crecimiento' | 'servicio' | 'multiplicacion'

const secciones = [
  {
    id: 'conexion' as SeccionId,
    titulo: 'MI CONEXIÓN',
    descripcion: 'Conoce a Cristo • Conecta con otros • Encuentra tu comunidad',
    Icono: Heart,
    color: 'blue',
    bgCard: 'bg-blue-50',
    bgIcon: 'bg-blue-100',
    textTitle: 'text-blue-700',
    textDesc: 'text-blue-600',
    btnBg: 'bg-blue-600 hover:bg-blue-700',
    formulaColor: 'text-blue-600',
    formulaLabel: 'LLAMÓ',
  },
  {
    id: 'crecimiento' as SeccionId,
    titulo: 'MI CRECIMIENTO',
    descripcion: 'Crece como discípulo • Aprende • Sé transformado',
    Icono: Sprout,
    color: 'green',
    bgCard: 'bg-green-50',
    bgIcon: 'bg-green-100',
    textTitle: 'text-green-700',
    textDesc: 'text-green-600',
    btnBg: 'bg-green-600 hover:bg-green-700',
    formulaColor: 'text-green-600',
    formulaLabel: 'FORMÓ',
  },
  {
    id: 'servicio' as SeccionId,
    titulo: 'MI SERVICIO',
    descripcion: 'Descubre tus dones • Sirve • Bendice a otros',
    Icono: HandHeart,
    color: 'orange',
    bgCard: 'bg-orange-50',
    bgIcon: 'bg-orange-100',
    textTitle: 'text-orange-700',
    textDesc: 'text-orange-600',
    btnBg: 'bg-orange-500 hover:bg-orange-600',
    formulaColor: 'text-orange-600',
    formulaLabel: 'ENVIÓ',
  },
  {
    id: 'multiplicacion' as SeccionId,
    titulo: 'MI MULTIPLICACIÓN',
    descripcion: 'Forma a otros • Haz discípulos • Ayuda a otros a crecer',
    Icono: Users,
    color: 'purple',
    bgCard: 'bg-purple-50',
    bgIcon: 'bg-purple-100',
    textTitle: 'text-purple-700',
    textDesc: 'text-purple-600',
    btnBg: 'bg-purple-600 hover:bg-purple-700',
    formulaColor: 'text-purple-600',
    formulaLabel: 'MULTIPLICARON',
  },
]

export default function PropositoPage() {
  const router = useRouter()
  const [estado, setEstado] = useState<'intro' | 'diagnostico' | 'resultado'>('intro')
  const [showVersiculo, setShowVersiculo] = useState(false)
  const [showGrupos, setShowGrupos] = useState(false)
  const versiculoDelDia = getVersiculoDelDia()
  const [seccionActual, setSeccionActual] = useState<SeccionId | null>(null)
  const [resultados, setResultados] = useState<{
    conexion: string[]
    crecimiento: string[]
    servicio: string[]
    multiplicacion: string[]
  }>({
    conexion: [],
    crecimiento: [],
    servicio: [],
    multiplicacion: [],
  })

  const handleIniciarPaso = (seccion: SeccionId) => {
    setSeccionActual(seccion)
    setEstado('diagnostico')
  }

  const handleCompletarPaso = (respuestas: string[]) => {
    if (seccionActual) {
      const nuevosResultados = {
        ...resultados,
        [seccionActual]: respuestas,
      }
      setResultados(nuevosResultados)
      
      const todasCompletas = Object.values(nuevosResultados).every(r => r.length > 0)
      if (todasCompletas) {
        setEstado('resultado')
      } else {
        setEstado('intro')
      }
    }
    setSeccionActual(null)
  }

  const handleReiniciar = () => {
    setResultados({
      conexion: [],
      crecimiento: [],
      servicio: [],
      multiplicacion: [],
    })
    setEstado('intro')
  }

  // Pantalla de diagnóstico
  if (estado === 'diagnostico' && seccionActual) {
    return (
      <DiagnosticFlow
        seccion={seccionActual}
        onComplete={handleCompletarPaso}
        onBack={() => {
          setEstado('intro')
          setSeccionActual(null)
        }}
      />
    )
  }

  // Pantalla de resultado
  if (estado === 'resultado') {
    return <ResultMap resultados={resultados} onReiniciar={handleReiniciar} />
  }

  // PANTALLA PRINCIPAL - Diseño nuevo
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo con imagen de paisaje */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />
      </div>

      {/* Botón Versículo del día */}
      <div className="absolute top-4 right-4 z-20">
        <button onClick={() => setShowVersiculo(true)} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all border border-slate-200 hover:scale-105">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Versículo del día</span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-2">
            TU CAMINO
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold italic bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'cursive' }}>
            tiene propósito
          </h2>
        </div>

        {/* Cita */}
        <p className="text-center text-slate-700 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
          "El propósito de Jesús no era solamente reunir seguidores,
          <br />
          sino formar discípulos que continuaran su misión."
        </p>

        {/* Fórmula de Jesús */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 flex-wrap">
          <span className="text-blue-600 font-bold text-lg md:text-xl tracking-wider">LLAMÓ</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-green-600 font-bold text-lg md:text-xl tracking-wider">FORMÓ</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-orange-600 font-bold text-lg md:text-xl tracking-wider">ENVIÓ</span>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-purple-600 font-bold text-lg md:text-xl tracking-wider">MULTIPLICARON</span>
        </div>

        {/* Las 4 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {secciones.map((seccion) => {
            const { Icono } = seccion
            const completada = resultados[seccion.id].length > 0

            return (
              <div
                key={seccion.id}
                className={`${seccion.bgCard} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50 relative overflow-hidden`}
              >
                {/* Indicador de completado */}
                {completada && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}

                {/* Icono */}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${seccion.bgIcon} flex items-center justify-center shadow-md`}>
                    <Icono className={`w-8 h-8 ${seccion.textTitle}`} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Título */}
                <h3 className={`text-xl font-black ${seccion.textTitle} text-center mb-3 tracking-tight`}>
                  {seccion.titulo}
                </h3>

                {/* Descripción */}
                <p className={`text-sm ${seccion.textDesc} text-center mb-6 leading-relaxed`}>
                  {seccion.descripcion.split('•').map((item, idx) => (
                    <span key={idx}>
                      {item.trim()}
                      {idx < 2 && <span className="mx-1">•</span>}
                    </span>
                  ))}
                </p>

                {/* Botón Explorar */}
                <button
                  onClick={() => handleIniciarPaso(seccion.id)}
                  className={`w-full py-3 rounded-full ${seccion.btnBg} text-white font-bold shadow-md hover:shadow-lg transition-all`}
                >
                  Explorar
                </button>

                {/* Chevron */}
                <div className="flex justify-center mt-3">
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Sección ¿DÓNDE ESTÁS HOY? */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Icono montaña */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center shadow-lg">
                <Mountain className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Texto */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                ¿DÓNDE ESTÁS HOY?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Descubre en qué etapa estás y cuál es tu siguiente paso
                para vivir el propósito que Dios tiene para ti.
              </p>
            </div>

            {/* Botón */}
            <div className="flex-shrink-0">
              <Button
                onClick={() => handleIniciarPaso('conexion')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              >
                Comenzar evaluación
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Línea de progreso con iconos */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="w-8 h-0.5 bg-slate-300 border-dashed" />
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                </div>
                <div className="w-8 h-0.5 bg-slate-300 border-dashed" />
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-orange-600" strokeWidth={1.5} />
                </div>
                <div className="w-8 h-0.5 bg-slate-300 border-dashed" />
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Sección ÚNETE A UN GRUPO */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 md:p-8 shadow-xl text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <Users className="w-12 h-12 mx-auto mb-4 text-emerald-100" strokeWidth={1.5} />
            <h3 className="text-2xl md:text-3xl font-black mb-3">
              NO CAMINES SOLO
            </h3>
            <p className="text-emerald-100 leading-relaxed mb-6 max-w-2xl mx-auto">
              Únete a uno de nuestros grupos de conexión en tu distrito o de forma virtual. 
              Tenemos horarios para todos y un espacio seguro para crecer juntos.
            </p>
            <button
              onClick={() => setShowGrupos(true)}
              className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Ver grupos disponibles
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Botón volver */}
        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/abriendo-camino')}
            className="text-slate-600 hover:text-slate-900 hover:bg-white/50"
          >
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
      </div>
    
      {showVersiculo && (
        <VersiculoModal 
          versiculo={versiculoDelDia} 
          onClose={() => setShowVersiculo(false)} 
        />
      )}

      <GruposModal 
        isOpen={showGrupos} 
        onClose={() => setShowGrupos(false)} 
      />
    </div>
  )
}