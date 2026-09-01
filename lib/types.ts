export interface UserProgress {
  dias: {
    [key: number]: {
      completado: boolean
      fecha: string
    }
  }
  moments?: {
    [key: string]: number[]
  }
  usuario?: {
    nombre: string
    telefono: string
  }
  startDate: string
  lastAccess: string
}

export interface DayProgress {
  dia: number
  completado: boolean
  momentosCompletados: number[]
}

export interface MomentData {
  id: string
  tipo: 'lee' | 'descubre' | 'conecta' | 'camina' | 'completado'
  titulo: string
  contenido?: string
  versiculo?: string
  reflexion?: string
  accion?: string
  opciones?: { id: string; texto: string }[]
}

export interface Devocional {
  id: string
  dia: number
  titulo: string
  versiculo: string
  texto: string
  reflexion: string
  accion: string
}

export interface Opcion {
  id: string
  texto: string
}

export interface Pregunta {
  id: string
  texto: string
  opciones: Opcion[]
}