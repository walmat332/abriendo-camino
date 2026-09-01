'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight, 
  Home, 
  RotateCcw, 
  TrendingUp, 
  Calendar, 
  Flame,
  CheckCircle2,
  Circle,
  Heart,
  Sprout,
  HandHeart,
  Users,
  BookOpen,
  Share2
} from 'lucide-react'
import { getProgress, resetProgress } from '@/lib/storage'

export default function DashboardPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const prog = getProgress()
    setProgress(prog)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4" />
          <p className="text-slate-600">Cargando tu progreso...</p>
        </div>
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            No hay progreso aún
          </h2>
          <p className="text-slate-600 mb-6">
            Comienza el reto de 7 días para ver tu progreso aquí.
          </p>
          <Button
            onClick={() => router.push('/abriendo-camino')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          >
            Comenzar ahora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    )
  }

  const diasCompletados = Object.keys(progress.dias).length
  const totalDias = 7
  const porcentaje = (diasCompletados / totalDias) * 100
  
  // Calcular racha
  const diasConsecutivos = calcularRacha(progress.dias)
  
  // Obtener último día completado
  const ultimoDia = Math.max(0, ...Object.keys(progress.dias).map(Number))
  const siguienteDia = Math.min(ultimoDia + 1, totalDias)

  const handleReiniciar = () => {
    if (confirm('¿Estás seguro de reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      resetProgress()
      router.push('/abriendo-camino')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              MI PROGRESO
            </h1>
            <p className="text-slate-600 mt-1">
              Tu camino de transformación espiritual
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/abriendo-camino')}
            className="border-slate-200"
          >
            <Home className="mr-2 h-4 w-4" />
            Inicio
          </Button>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Días Completados</p>
                  <p className="text-4xl font-black">
                    {diasCompletados} <span className="text-2xl text-blue-200">/ {totalDias}</span>
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Racha Actual</p>
                  <p className="text-4xl font-black">
                    {diasConsecutivos} <span className="text-sm text-orange-200">días</span>
                  </p>
                </div>
                <Flame className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Progreso Total</p>
                  <p className="text-4xl font-black">
                    {Math.round(porcentaje)}<span className="text-2xl">%</span>
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progreso de los 7 días */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Tus 7 Días de Transformación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map((dia) => {
                const completado = progress.dias[dia]
                return (
                  <div
                    key={dia}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      completado
                        ? 'bg-emerald-50 border-emerald-300 shadow-md'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="mb-2">
                      {completado ? (
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      ) : (
                        <Circle className="w-8 h-8 text-slate-300 mx-auto" />
                      )}
                    </div>
                    <p className={`font-bold text-sm ${completado ? 'text-emerald-700' : 'text-slate-400'}`}>
                      Día {dia}
                    </p>
                    {completado && (
                      <p className="text-xs text-emerald-600 mt-1">
                        Completado
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Barra de progreso */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progreso general</span>
                <span className="font-bold">{Math.round(porcentaje)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 via-emerald-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            onClick={() => router.push(`/abriendo-camino/reto/1/dia/${siguienteDia}`)}
            className="bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg font-bold shadow-lg"
          >
            {diasCompletados === 0 ? (
              <>
                Comenzar Día 1
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : diasCompletados === totalDias ? (
              <>
                Ver de Nuevo
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Continuar Día {siguienteDia}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleReiniciar}
            className="border-slate-200 py-6 text-lg font-bold"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reiniciar Progreso
          </Button>
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/abriendo-camino/proposito')}
            className="border-slate-200 justify-start"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Descubrir mi propósito
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              const dias = Object.keys(progress.dias).length
              const texto = `🔥 ¡Hola! Estoy en el día ${dias} del reto *Abriendo Camino* (7 días para volver a caminar con Dios). \n\nMe está ayudando mucho a crecer. ¿Te animas a hacerlo conmigo?\n\n👉 ${typeof window !== 'undefined' ? window.location.origin + '/abriendo-camino' : ''}`
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`
              window.open(whatsappUrl, '_blank')
            }}
            className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 justify-start font-medium"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Invitar a un amigo por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

// Función para calcular racha de días consecutivos
function calcularRacha(dias: any): number {
  if (!dias || Object.keys(dias).length === 0) return 0
  
  const fechas = Object.values(dias).map((d: any) => new Date(d.fecha))
  fechas.sort((a, b) => b.getTime() - a.getTime())
  
  let racha = 1
  const hoy = new Date()
  const ayer = new Date(hoy)
  ayer.setDate(ayer.getDate() - 1)
  
  // Verificar si completó hoy o ayer
  const ultimaFecha = fechas[0]
  const diffHoy = diferenciaEnDias(hoy, ultimaFecha)
  const diffAyer = diferenciaEnDias(ayer, ultimaFecha)
  
  if (diffHoy > 1 && diffAyer > 1) return 0 // No completó ni hoy ni ayer
  
  // Calcular racha consecutiva
  for (let i = 1; i < fechas.length; i++) {
    const diff = diferenciaEnDias(fechas[i-1], fechas[i])
    if (diff === 1) {
      racha++
    } else if (diff > 1) {
      break
    }
  }
  
  return racha
}

function diferenciaEnDias(fecha1: Date, fecha2: Date): number {
  const unDia = 1000 * 60 * 60 * 24
  return Math.abs(Math.floor((fecha1.getTime() - fecha2.getTime()) / unDia))
}