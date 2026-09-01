import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DEVOCIONALES } from "@/lib/devocionales"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"

interface DescubreStepProps {
  devocional: typeof DEVOCIONALES[0]
  onNext: () => void
  completed: boolean
}

export function DescubreStep({ devocional, onNext, completed }: DescubreStepProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const correctIndex = devocional.descubre.indiceCorrecto ?? 0

  const handleSelect = (index: number) => {
    if (completed || showFeedback) return
    setSelectedOption(index)
    setShowFeedback(true)
  }

  const isCorrect = selectedOption === correctIndex

  if (completed || (selectedOption !== null && showFeedback)) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              🔎 Descubre
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-lg text-gray-800">
              {devocional.descubre.pregunta}
            </p>
            {isCorrect ? (
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <span className="text-lg font-medium text-green-700">
                  ¡Correcto!
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <XCircle className="h-8 w-8 text-red-500" />
                <span className="text-lg font-medium text-red-700">
                  Inténtalo de nuevo
                </span>
              </div>
            )}
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

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-amber-900 mb-2">
            🔎 Descubre
          </h2>
        </div>
        <div className="space-y-3">
          <p className="text-lg text-gray-800">
            {devocional.descubre.pregunta}
          </p>
          <div className="space-y-2">
            {devocional.descubre.opciones.map((opcion, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className={`w-full text-left py-4 px-6 ${
                  selectedOption === index
                    ? (isCorrect
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-red-500 bg-red-50 text-red-700")
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                onClick={() => handleSelect(index)}
                disabled={completed || showFeedback}
              >
                {opcion}
              </Button>
            ))}
          </div>
          {showFeedback && selectedOption !== null && !isCorrect && (
            <div className="bg-amber-50 border-l-4 border-amber-300 p-4 rounded-r-lg">
              <p className="text-sm text-amber-800">
                Piensa en la pregunta otra vez. La respuesta está en el texto.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!showFeedback ? (
          <Button
            size="lg"
            className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
            onClick={() => {
              // Force selection of correct answer for demo purposes, but allow retry
              setSelectedOption(correctIndex)
              setShowFeedback(true)
            }}
          >
            Mostrar respuesta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
            onClick={onNext}
            disabled={!isCorrect}
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}