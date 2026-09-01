import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DEVOCIONALES } from "@/lib/devocionales"
import { ArrowRight } from "lucide-react"

interface ConectaStepProps {
  devocional: typeof DEVOCIONALES[0]
  onNext: () => void
  completed: boolean
}

export function ConectaStep({ devocional, onNext, completed }: ConectaStepProps) {
  const [reflection, setReflection] = useState("")

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-amber-900 mb-2">
            ❤️ Conecta
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-800">
            {devocional.conecta.pregunta}
          </p>
          <div className="space-y-2">
            <label htmlFor="reflection" className="block text-sm font-medium text-amber-700">
              Tu reflexión (opcional)
            </label>
            <textarea
              id="reflection"
              className="w-full p-4 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[120px] text-base"
              placeholder="Escribe tu reflexión aquí..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
          onClick={onNext}
        >
          Continuar
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}