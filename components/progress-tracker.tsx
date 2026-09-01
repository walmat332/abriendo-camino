import type { MomentData } from "@/lib/types"

interface ProgressTrackerProps {
  currentDay: number
  totalDays: number
  moments: MomentData[]
}

const momentoEmojis: Record<string, string> = {
  lee: "📖",
  descubre: "🔍",
  conecta: "🤝",
  camina: "🚶",
  completado: "✅",
}

export function ProgressTracker({ currentDay, totalDays, moments }: ProgressTrackerProps) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-12 h-1 bg-gray-200 rounded">
            <div
              className="h-full bg-amber-600 rounded"
              style={{ width: `${((currentDay - 1) / totalDays) * 100}%` }}
            />
          </div>
          <span>
            Día {currentDay} de {totalDays}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {moments.map((moment) => (
          <div
            key={moment.id}
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
          >
            <div className="text-amber-500">{momentoEmojis[moment.tipo] || "✨"}</div>
            <span className="text-sm font-medium text-gray-700">{moment.titulo}</span>
          </div>
        ))}
      </div>
    </div>
  )
}