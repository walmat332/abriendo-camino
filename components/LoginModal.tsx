'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveUsuario } from '@/lib/storage'
import { supabase } from '@/lib/supabase'
import { vincularUsuarioConRegistro } from '@/lib/oracion/identity'

interface LoginModalProps {
  onComplete: (nombre: string, telefono: string) => void
  onClose: () => void
}

export function LoginModal({ onComplete, onClose }: LoginModalProps) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    if (!nombre.trim() || !telefono.trim()) return
    
    setLoading(true)
    
    try {
      // 1. Guardar en localStorage y disparar sincronización automática
      saveUsuario(nombre.trim(), telefono.trim())
      
      // 2. Vincular UUID con el registro en Supabase
      await vincularUsuarioConRegistro(telefono.trim())
      
      // 3. Respaldo: también guardar directamente en Supabase con upsert
      const { data, error } = await supabase
        .from('registros')
        .upsert({
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          dia_completado: 0,
          gc_interes: null
        }, {
          onConflict: 'telefono'
        })
        .select()
      
      if (error) {
        console.error('❌ Error al guardar en Supabase:', error)
      } else {
        console.log('✅ Usuario guardado en Supabase:', data)
      }
      
      onComplete(nombre.trim(), telefono.trim())
    } catch (err) {
      console.error(' Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-blue-900 to-blue-950 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            {step === 1 ? '👋 ¡Bienvenido!' : '📱 Tu número de celular'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {step === 1 && (
            <div className="space-y-2">
              <p className="text-blue-200 text-center text-sm mb-4">
                Guarda tu progreso y recibe el link cada día
              </p>
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-white font-semibold">
                  ¿Cómo te llamas?
                </Label>
                <Input
                  id="nombre"
                  placeholder="Tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  onKeyPress={(e) => e.key === 'Enter' && setStep(2)}
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!nombre.trim()}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold"
              >
                Continuar
              </Button>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-2">
              <p className="text-blue-200 text-center text-sm mb-4">
                Te enviaremos el link del devocional cada día
              </p>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-white font-semibold">
                  Número de celular
                </Label>
                <Input
                  id="telefono"
                  placeholder="Ej: 999999999"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ''))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-white/20 text-blue-200 hover:text-white hover:bg-white/10"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!telefono.trim() || loading}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}