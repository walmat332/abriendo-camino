import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DEVOCIONALES } from "@/lib/devocionales"
import { getNextDia } from "@/lib/storage"
import type { UserProgress } from "@/lib/types"
import { ArrowRight, Share2, Home } from "lucide-react"
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

  const nextDia = getNextDia('abriendo-camino')
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
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        {!allComplete ? (
          <Button
            size="lg"
            className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
            onClick={onNext}
          >
            {nextDia !== dia ? `Día ${nextDia}` : "Continuar"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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