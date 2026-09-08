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
      <div className="bg-white border border-blue-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
        <Flame className="w-6 h-6 text-amber-500 mx-auto mb-2" />
        <div className="text-2xl md:text-3xl font-black text-slate-800">{stats.oracionesHoy}</div>
        <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">oraron hoy</div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
        <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-2" />
        <div className="text-2xl md:text-3xl font-black text-slate-800">{stats.oracionesMes}</div>
        <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">este mes</div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
        <Heart className="w-6 h-6 text-amber-500 mx-auto mb-2" />
        <div className="text-2xl md:text-3xl font-black text-slate-800">{stats.peticionesActivas}</div>
        <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">necesitan oración</div>
      </div>
    </div>
  )
}
