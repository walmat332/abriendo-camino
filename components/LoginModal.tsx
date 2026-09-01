'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Phone, User, ArrowRight } from 'lucide-react'

interface LoginModalProps {
  onComplete: (nombre: string, telefono: string) => void
  onClose: () => void
}

export function LoginModal({ onComplete, onClose }: LoginModalProps) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [step, setStep] = useState(1)

  const handleContinue = () => {
    if (nombre.trim() && telefono.trim()) {
      onComplete(nombre.trim(), telefono.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full glass-card">
        <CardContent className="p-8">
          {step === 1 ? (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ¡Día 2 completado!
                </h3>
                <p className="text-blue-200">
                  ¿Quieres recibir el link del día 3 mañana?
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg"
                  onClick={() => setStep(2)}
                >
                  Sí, quiero continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-blue-200 hover:text-white"
                  onClick={onClose}
                >
                  No, gracias
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Guarda tu progreso
                </h3>
                <p className="text-sm text-blue-200">
                  Te enviaremos el link cada día
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-white">
                    Tu nombre
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
                    <Input
                      id="nombre"
                      placeholder="¿Cómo te llamas?"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-white">
                    WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-blue-300" />
                    <Input
                      id="telefono"
                      placeholder="+51 999 999 999"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                    />
                  </div>
                </div>

                <Button
                  className="w-full py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg"
                  onClick={handleContinue}
                  disabled={!nombre.trim() || !telefono.trim()}
                >
                  Guardar y continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-blue-200 hover:text-white text-sm"
                  onClick={onClose}
                >
                  Omitir por ahora
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}