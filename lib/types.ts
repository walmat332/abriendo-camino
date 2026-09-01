export interface MomentData {
  id: string
  title: string
  emoji: string
  description: string
  type: "lee" | "descubre" | "conecta" | "camina" | "completado"
}

export interface DayProgress {
  dia: number
  completed: boolean
  completedMoments: string[]
}

export interface UserProgress {
  dias: Record<number, DayProgress>
  currentDay: number
  currentMoment: string
  startDate: string
  lastAccess: string
}

export interface StepData {
  id: string
  momentType: "lee" | "descubre" | "conecta" | "camina" | "completado"
  title: string
  content: string
  question?: string
  options?: string[]
  isCheckpoint?: boolean
}

export const MOMENTS: MomentData[] = [
  {
    id: "lee",
    title: "Lee",
    emoji: "📖",
    description: "Lee el pasaje del día con calma.",
    type: "lee",
  },
  {
    id: "descubre",
    title: "Descubre",
    emoji: "🔎",
    description: "Descubre lo que el texto quiere mostrarte.",
    type: "descubre",
  },
  {
    id: "conecta",
    title: "Conecta",
    emoji: "❤️",
    description: "Conecta el texto con tu vida.",
    type: "conecta",
  },
  {
    id: "camina",
    title: "Camina",
    emoji: "🎯",
    description: "Da un paso concreto hoy.",
    type: "camina",
  },
  {
    id: "completado",
    title: "Completado",
    emoji: "✅",
    description: "¡Has completado tu momento de hoy!",
    type: "completado",
  },
]