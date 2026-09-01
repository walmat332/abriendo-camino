import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DEVOCIONALES } from "@/lib/devocionales"
import { ArrowRight, Check } from "lucide-react"

interface CaminaStepProps {
  devocional: typeof DEVOCIONALES[0]
  onNext: () => void
  completed: boolean
}

export function CaminaStep({ devocional, onNext, completed }: CaminaStepProps) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-amber-900 mb-2">
            🎯 Camina
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-800">
            {devocional.camina.desafio}
          </p>
          {!confirmed && (
            <div className="bg-amber-50 border-l-4 border-amber-300 p-4 rounded-r-lg">
              <p className="text-sm text-amber-800">
                Este es tu paso concreto para hoy. ¿Estás listo para darlo?
              </p>
            </div>
          )}
          {confirmed && (
            <div className="flex items-center justify-center space-x-3">
              <Check className="h-8 w-8 text-green-500" />
              <span className="text-lg font-medium text-green-700">
                ¡Paso dado!
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!confirmed ? (
          <Button
            size="lg"
            className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
            onClick={() => setConfirmed(true)}
          >
            Ya di mi paso
            <Check className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
            onClick={onNext}
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}