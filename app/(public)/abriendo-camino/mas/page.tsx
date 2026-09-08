'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mountain, Users } from 'lucide-react'

export default function MasPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f4f7f6]">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">MÁS</h1>
        </div>

        {/* ¿DÓNDE ESTÁS HOY? */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">¿DÓNDE ESTÁS HOY?</h3>
              <p className="text-slate-600">Descubre dónde estás hoy y cuál es tu siguiente paso.</p>
            </div>
          </div>
          
          <Button
            onClick={() => router.push('/abriendo-camino')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            DESCUBRIR MI CAMINO
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* NO CAMINES SOLO */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">NO CAMINES SOLO</h3>
              <p className="text-slate-600">Encuentra un grupo de conexión y crece junto a otros.</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push('/abriendo-camino/grupos')}
            className="w-full border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold py-6 rounded-2xl transition-all flex flex-col items-center gap-1"
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-base">VER GRUPOS</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
