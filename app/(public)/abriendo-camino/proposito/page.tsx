'use client'

import { useState, Suspense } from 'react'
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

function PropositoInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const seccionDesdeURL = searchParams.get('seccion') as SeccionId
  const seccionValida = secciones.some(s => s.id === seccionDesdeURL) ? seccionDesdeURL : null
  
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

  const handleVolverAlInicio = () => {
    setEstado('intro')
    setSeccionActual(null)
    router.push('/abriendo-camino/proposito')
  }

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
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-2">DESCUBRE TU PROPÓSITO</h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
            Conoce dónde estás. Descubre tu próximo paso.
          </p>
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

        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">¿DÓNDE ESTÁS HOY?</h3>
              <p className="text-slate-600">Descubre dónde estás hoy y cuál es tu siguiente paso.</p>
            </div>
          </div>
          
          <Button
            onClick={() => setEstado('diagnostico')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            DESCUBRIR MI CAMINO
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <div className="pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={() => router.push('/abriendo-camino/grupos')}
              className="w-full border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-6 rounded-2xl transition-all flex flex-col items-center gap-1"
            >
              <Users className="w-6 h-6 mb-1" />
              <span className="text-base">NO CAMINES SOLO</span>
              <span className="text-xs font-normal text-emerald-700">Encuentra un grupo de conexión y crece junto a otros.</span>
            </Button>
          </div>
        </div>
      </div>

      <VersiculoModal isOpen={showVersiculo} onClose={() => setShowVersiculo(false)} />
      <GruposModal isOpen={showGrupos} onClose={() => setShowGrupos(false)} />
    </div>
  )
}

export default function PropositoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-amber-50"><p className="text-slate-500">Cargando propósito...</p></div>}>
      <PropositoInner />
    </Suspense>
  )
}
