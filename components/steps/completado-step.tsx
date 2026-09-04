import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DEVOCIONALES } from "@/lib/devocionales"
import { getNextDia, getModoRetos, getHorasRestantes } from "@/lib/storage"
import type { UserProgress } from "@/lib/types"
import { ArrowRight, Share2, Home, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface CompletadoStepProps {
  dia: number
  devocional: typeof DEVOCIONALES[0]
  progress: UserProgress
  onNext: () => void
}

export function CompletadoStep({ dia, devocional, progress, onNext }: CompletadoStepProps) {
  const router = useRouter()
  const completedDias = Object.keys(progress.dias).filter((k) => progress.dias[Number(k)]?.completado).length
  const modo = getModoRetos()
  const horasRestantes = getHorasRestantes(progress)
  const debeEsperar = modo === "diario" && horasRestantes > 0 && completedDias < 7

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin + '/abriendo-camino' : ''
    const texto = `¡Completé el día ${dia} del reto "Abriendo Camino"! \n\nLlevó ${completedDias}/7 días.\n\n${url}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Abriendo Camino',
          text: texto,
          url: url,
        })
      } catch (err) {
        console.error('Error al compartir:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(texto)
        alert('¡Enlace copiado al portapapeles!')
      } catch (err) {
        console.error('Error al copiar:', err)
      }
    }
  }

  const handleGoHome = () => {
    router.push("/abriendo-camino")
  }

  const nextDia = getNextDia(progress)
  const allComplete = completedDias >= 7

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-amber-900">
          ¡Día {dia} completado!
        </h2>
        <p className="text-lg text-gray-700">
          ¡Excelente trabajo hoy! Sigue avanzando en tu camino.
        </p>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-2">Tu progreso:</p>
          <div className="text-3xl font-bold text-amber-700">
            🔥 {completedDias}/7 días
          </div>
          <div className="w-full bg-amber-200 rounded-full h-3 mt-3">
            <div
              className="bg-amber-600 h-3 rounded-full transition-all"
              style={{ width: `${(completedDias / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Mensaje de espera para Modo Diario */}
        {debeEsperar && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-blue-900 mb-1">
              ¡Buen trabajo hoy!
            </h3>
            <p className="text-blue-700 text-sm mb-2">
              Tu próximo día estará disponible en:
            </p>
            <div className="text-3xl font-black text-blue-600 mb-1">
              {horasRestantes}h
            </div>
            <p className="text-xs text-blue-500">
              Modo Diario: Un día a la vez para crear hábito
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        {!allComplete ? (
          debeEsperar ? (
            // Modo Diario: Mostrar botón de volver al inicio
            <Button
              size="lg"
              className="w-full text-lg py-6 bg-slate-900 hover:bg-slate-800"
              onClick={handleGoHome}
            >
              <Home className="mr-2 h-5 w-5" />
              Volver al inicio
            </Button>
          ) : (
            // Modo Intensivo o sin espera: Siguiente día
            <Button
              size="lg"
              className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
              onClick={onNext}
            >
              {nextDia !== dia ? `Día ${nextDia}` : "Continuar"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )
        ) : (
          <div className="w-full text-center py-4 bg-green-100 rounded-lg">
            <p className="text-lg font-bold text-green-700">
              ¡Has completado los 7 días! 🎊
            </p>
          </div>
        )}
        <div className="flex space-x-3 w-full">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 text-lg py-6"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-5 w-5" />
            Compartir
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 text-lg py-6"
            onClick={handleGoHome}
          >
            <Home className="mr-2 h-5 w-5" />
            Inicio
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}