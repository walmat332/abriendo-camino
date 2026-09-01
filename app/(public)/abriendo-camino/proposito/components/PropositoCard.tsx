'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Share2, RotateCcw, Download, Sparkles, Compass, Sprout, Send } from 'lucide-react'

interface PropositoCardProps {
  plan: {
    llamado: string
    formado: string
    enviado: string
  }
  onReiniciar: () => void
}

export function PropositoCard({ plan, onReiniciar }: PropositoCardProps) {
  const resumen = `Dios te llamó a ${plan.llamado.toLowerCase()}, te formó con el don de ${plan.formado.toLowerCase()}, y te envía a ${plan.enviado.toLowerCase()}.`

  const handleCompartir = async () => {
    const texto = `Mi Camino de Propósito:\n\n LLAMADO: ${plan.llamado}\n🌱 FORMADO: ${plan.formado}\n🚀 ENVIADO: ${plan.enviado}\n\n${resumen}\n\nDescubre el tuyo:`
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Camino de Propósito',
          text: texto,
          url: url,
        })
      } catch {
        navigator.clipboard.writeText(`${texto}\n${url}`)
        alert('✅ Copiado al portapapeles')
      }
    } else {
      navigator.clipboard.writeText(`${texto}\n${url}`)
      alert('✅ Copiado al portapapeles')
    }
  }

  const handleDescargar = () => {
    const contenido = `MI CAMINO DE PROPÓSITO\n\n📞 LLAMADO: ${plan.llamado}\n🌱 FORMADO: ${plan.formado}\n🚀 ENVIADO: ${plan.enviado}\n\n${resumen}`
    const blob = new Blob([contenido], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mi-camino-de-proposito.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/80 backdrop-blur-xl animate-slide-up">
        <CardContent className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
              TU CAMINO DE PROPÓSITO
            </h2>
            <p className="text-slate-500 italic text-lg">
              "Dios te llamó, te formó y te envía"
            </p>
          </div>

          {/* Las 3 fases */}
          <div className="space-y-4 mb-10">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-300 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Compass className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-blue-700 text-sm tracking-wider">LLAMADO</span>
              </div>
              <p className="text-slate-700 font-medium">{plan.llamado}</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-300 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-emerald-700 text-sm tracking-wider">FORMADO</span>
              </div>
              <p className="text-slate-700 font-medium">{plan.formado}</p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-300 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Send className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-amber-700 text-sm tracking-wider">ENVIADO</span>
              </div>
              <p className="text-slate-700 font-medium">{plan.enviado}</p>
            </div>
          </div>

          {/* Resumen */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 mb-10">
            <div className="flex items-start gap-4">
              <Sparkles className="text-amber-500 w-6 h-6 flex-shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-slate-700 text-lg font-medium italic leading-relaxed">
                {resumen}
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <Button
              onClick={handleCompartir}
              className="w-full py-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold text-lg shadow-lg transition-all"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Compartir mi propósito
            </Button>

            <Button
              onClick={handleDescargar}
              variant="outline"
              className="w-full border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar como texto
            </Button>

            <Button
              onClick={onReiniciar}
              variant="ghost"
              className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Hacerlo de nuevo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}