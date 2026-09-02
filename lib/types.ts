// ==========================================
// TIPOS EXISTENTES (Mantener para compatibilidad)
// ==========================================

export interface UserProgress {
  dias: {
    [key: number]: {
      completado: boolean
      fecha: string
      fechaCompletado?: string
      momento?: MomentData[]
    }
  }
  moments?: {
    [key: string]: number[]
  }
  usuario?: {
    nombre: string
    telefono: string
    email?: string
  }
  startDate: string
  lastAccess: string
  retoActual?: string
  modoRetos?: 'diario' | 'intensivo'
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
  esCorrecta?: boolean
}

export interface Pregunta {
  id: string
  texto: string
  opciones: Opcion[]
}

// ==========================================
// NUEVOS TIPOS (Para el sistema de momentos)
// ==========================================

export interface MomentData {
  id: string
  tipo: 'lee' | 'descubre' | 'conecta' | 'camina'
  titulo?: string  // ✅ Agregado para solucionar el error de progress-tracker
  completado: boolean
  respuestas?: string[]
}

export interface DayProgress {
  completado: boolean
  fechaCompletado?: string
  momento?: MomentData[]
}

// ==========================================
// TIPOS PARA DEVOCIONALES (Estructura real)
// ==========================================

export interface DevocionalCompleto {
  dia: number
  titulo: string
  tema: string
  fase: 'conecta' | 'crece' | 'multiplica'
  lecturaRef: string
  lecturaTexto: string
  fraseDelDia: string
  descubre: {
    pregunta: string
    opciones: Opcion[]
    explicacion: string
    versiculoApoyo: string
  }
  conecta: {
    pregunta: string
    opciones: Opcion[]
  }
  camina: {
    desafio: string
    oracion: string
  }
}