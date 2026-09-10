'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Share2, Download, RotateCcw, Check, Compass, Sprout, Send } from 'lucide-react'

interface PropositoCardProps {
  plan: { llamado: string; formado: string; enviado: string }
  onReiniciar: () => void
}

export function PropositoCard({ plan, onReiniciar }: PropositoCardProps) {
  const getLlamadoFrase = (r: string) => {
    const map: Record<string, string> = {
      'Mi relación con Dios': 'fortalecer tu relación con Él',
      'Mi familia': 'impactar a tu familia',
      'Mis relaciones personales': 'transformar tus relaciones personales',
      'Mi trabajo o estudios': 'ser luz en tu trabajo o estudios',
      'Servir a otros': 'servir a otros con amor',
      'Todavía estoy descubriéndolo': 'seguir buscando tu propósito con fe',
    }
    return map[r] || r.toLowerCase()
  }

  const getFormadoFrase = (r: string) => {
    const map: Record<string, string> = {
      'Escuchar y aconsejar': 'tu don de escuchar y aconsejar',
      'Enseñar o explicar': 'tu capacidad de enseñar y explicar',
      'Organizar y liderar': 'tu capacidad de organizar y liderar',
      'Crear o diseñar': 'tu creatividad para crear y diseñar',
      'Servir en lo práctico': 'tu corazón para servir en lo práctico',
      'Todavía estoy descubriéndolo': 'tu corazón y prepararte para lo que viene',
    }
    return map[r] || r.toLowerCase()
  }

  const getEnviadoFrase = (r: string) => {
    const map: Record<string, string> = {
      'Un amigo cercano': 'compartir tu fe con un amigo cercano',
      'Un familiar': 'ser testimonio para un familiar',
      'Un compañero de trabajo o estudio': 'compartir a Jesús con un compañero de trabajo o estudio',
      'Alguien de mi comunidad': 'impactar a alguien de tu comunidad',
      'Todavía no tengo a nadie en mente': 'estar atento a las personas que Dios pondrá en tu camino',
    }
    return map[r] || r.toLowerCase()
  }

  const resumen = `Dios te está llamando a ${getLlamadoFrase(plan.llamado)}, te está formando con ${getFormadoFrase(plan.formado)}, y te está enviando a ${getEnviadoFrase(plan.enviado)}.`

  const handleCompartir = async () => {
    const texto = `Mi Camino de Propósito:\n\n🧭 LLAMADO: ${plan.llamado}\n🌱 FORMADO: ${plan.formado}\n🚀 ENVIADO: ${plan.enviado}\n\n${resumen}\n\nDescubre el tuyo:`
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Mi Camino de Propósito', text: texto, url })
      } catch {}
    } else {
      await navigator.clipboard.writeText(texto + ' ' + url)
      alert('¡Propósito copiado al portapapeles!')
    }
  }

  const handleDescargar = () => {
    const contenido = `MI CAMINO DE PROPÓSITO\n\n🧭 LLAMADO: ${plan.llamado}\n🌱 FORMADO: ${plan.formado}\n🚀 ENVIADO: ${plan.enviado}\n\n${resumen}`
    const blob = new Blob([contenido], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mi-camino-de-proposito.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 mb-6 shadow-lg">
              <Check className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
              TU CAMINO DE PROPÓSITO
            </h2>
            <p className="text-slate-500 italic text-lg">
              "Dios te llamó, te formó y te envía."
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50 border-l-4 border-blue-500">
              <Compass className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-800 text-sm uppercase tracking-wider mb-1">LLAMADO</h4>
                <p className="text-slate-700 font-medium">{plan.llamado}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border-l-4 border-emerald-500">
              <Sprout className="w-6 h-6 text-emerald-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-800 text-sm uppercase tracking-wider mb-1">FORMADO</h4>
                <p className="text-slate-700 font-medium">{plan.formado}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500">
              <Send className="w-6 h-6 text-amber-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider mb-1">ENVIADO</h4>
                <p className="text-slate-700 font-medium">{plan.enviado}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-200">
            <p className="text-slate-700 text-center text-lg leading-relaxed font-medium italic">
              "{resumen}"
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCompartir}
              className="w-full py-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold text-lg shadow-lg transition-all"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Compartir mi propósito
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleDescargar}
                variant="outline"
                className="py-6 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar
              </Button>
              <Button
                onClick={onReiniciar}
                variant="outline"
                className="py-6 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Hacerlo de nuevo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
