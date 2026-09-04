import { Flame, Sparkles, Heart } from 'lucide-react'

interface PrayerStatsProps {
  stats: {
    oracionesHoy: number
    oracionesMes: number
    peticionesActivas: number
  }
}

export function PrayerStats({ stats }: PrayerStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {/* Oraciones hoy */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
        <Flame className="w-6 h-6 text-amber-400 mx-auto mb-2" />
        <div className="text-2xl font-black text-white">
          {stats.oracionesHoy}
        </div>
        <div className="text-xs text-blue-200 mt-1">
          oraron hoy
        </div>
      </div>

      {/* Oraciones del mes */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
        <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
        <div className="text-2xl font-black text-white">
          {stats.oracionesMes}
        </div>
        <div className="text-xs text-blue-200 mt-1">
          este mes
        </div>
      </div>

      {/* Peticiones activas */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
        <Heart className="w-6 h-6 text-amber-400 mx-auto mb-2" />
        <div className="text-2xl font-black text-white">
          {stats.peticionesActivas}
        </div>
        <div className="text-xs text-blue-200 mt-1">
          necesitan oración
        </div>
      </div>
    </div>
  )
}