'use client'

import { useState, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Sprout, HandHeart, Users, ArrowRight, BookOpen, Mountain, Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DiagnosticFlow } from './components/DiagnosticFlow'
import { PropositoFlow } from './components/PropositoFlow'
import { PropositoCard } from './components/PropositoCard'
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
  const esEvaluacionCompleta = searchParams.get('evaluacion') === 'completa'

  // --- FLUJO DE PROPÓSITO COMPLETO (LLAMADO → FORMADO → ENVIADO → PLAN) ---
  const [plan, setPlan] = useState<{ llamado: string; formado: string; enviado: string } | null>(null)
  const [estadoDiag, setEstadoDiag] = useState<'diagnostico' | 'resultado'>('diagnostico')
  const [resultados, setResultados] = useState({ conexion: [], crecimiento: [], servicio: [], multiplicacion: [] })

  // Si ya completó el flujo, mostrar PropositoCard
  if (plan) {
    return <PropositoCard plan={plan} onReiniciar={() => setPlan(null)} />
  }

  // Si viene de ?evaluacion=completa, mostrar PropositoFlow
  if (esEvaluacionCompleta) {
    return (
      <PropositoFlow 
        onComplete={(nuevoPlan) => setPlan(nuevoPlan)} 
        onBack={() => router.push('/abriendo-camino')} 
      />
    )
  }

  // Si viene de ?seccion=, mostrar DiagnosticFlow o ResultMap
  if (seccionValida) {
    const handleCompletarPaso = (respuestas: string[]) => {
      const nuevos = { ...resultados, [seccionDesdeURL]: respuestas }
      setResultados(nuevos)
      setEstadoDiag('resultado')
    }
    
    const handleReiniciar = () => { 
      setResultados({ conexion: [], crecimiento: [], servicio: [], multiplicacion: [] })
      setEstadoDiag('diagnostico') 
    }
    
    if (estadoDiag === 'resultado') {
      return <ResultMap resultados={resultados} onReiniciar={handleReiniciar} />
    }
    
    return <DiagnosticFlow seccion={seccionValida} onComplete={handleCompletarPaso} onBack={() => router.push('/abriendo-camino/proposito')} />
  }

  // Default: mostrar PropositoFlow (flujo de propósito)
  return (
    <PropositoFlow 
      onComplete={(nuevoPlan) => setPlan(nuevoPlan)} 
      onBack={() => router.push('/abriendo-camino')} 
    />
  )
}

export default function PropositoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-amber-50"><p className="text-slate-500">Cargando propósito...</p></div>}>
      <PropositoInner />
    </Suspense>
  )
}


