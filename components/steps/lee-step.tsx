'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { DEVOCIONALES } from '@/lib/devocionales'
import { ArrowRight } from 'lucide-react'

interface LeeStepProps {
  dia: number
  onContinue: () => void
}

export function LeeStep({ dia, onContinue }: LeeStepProps) {
  const devocional = DEVOCIONALES.find(d => d.dia === dia)
  const [leido, setLeido] = useState(false)

  if (!devocional) {
    return <div>Devocional no encontrado</div>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-amber-900">
            📖 Día {dia}: {devocional.titulo}
          </h2>
          <p className="text-sm text-amber-600 font-semibold">
            {devocional.lecturaRef}
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <p className="text-lg leading-relaxed text-amber-900 whitespace-pre-line">
            {devocional.lecturaTexto}
          </p>
        </div>

        <p className="text-center text-amber-700 italic">
          Lee el pasaje con calma y reflexiona en lo que Dios te quiere decir hoy.
        </p>
      </CardContent>

      <CardFooter>
        <Button
          size="lg"
          className="w-full text-lg py-6 bg-amber-600 hover:bg-amber-700"
          onClick={onContinue}
        >
          {leido ? 'CONTINUAR' : 'YA LEÍ EL PASAJE'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
