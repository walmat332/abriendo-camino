import type { UserProgress, MomentData } from './types'

const STORAGE_KEY = 'abriendo-camino-progress'
const MODO_KEY = 'modoRetos'
const USUARIO_KEY = 'abriendo-camino-usuario'

// ==========================================
// FUNCIONES ORIGINALES
// ==========================================

export function getProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(MODO_KEY)
  localStorage.removeItem(USUARIO_KEY)
}

export function saveUsuario(nombre: string, telefono: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(USUARIO_KEY, JSON.stringify({ nombre, telefono }))
}

export function getUsuario() {
  if (typeof window === 'undefined') return null
  try {
    const data = localStorage.getItem(USUARIO_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// ==========================================
// FUNCIONES PARA MOMENTOS (Necesarias para moment-view.tsx)
// ==========================================

export function markMomentCompleted(reto: string, dia: number, momentoId: number): void {
  const progress = getProgress()
  if (!progress) return
  
  const moments = progress.moments || {}
  const diaKey = `dia_${dia}`
  
  if (!moments[diaKey]) {
    moments[diaKey] = []
  }
  
  if (!moments[diaKey].includes(momentoId)) {
    moments[diaKey].push(momentoId)
  }
  
  progress.moments = moments
  saveProgress(progress)
}

export function isMomentCompleted(reto: string, dia: number, momentoId: number): boolean {
  const progress = getProgress()
  if (!progress) return false
  
  const moments = progress.moments || {}
  const diaKey = `dia_${dia}`
  
  return moments[diaKey]?.includes(momentoId) || false
}

export function getNextDia(reto: string): number {
  const progress = getProgress()
  if (!progress) return 1
  
  // Buscar el último día completado
  let ultimoCompletado = 0
  for (let i = 1; i <= 7; i++) {
    if (progress.dias[i]?.completado) {
      ultimoCompletado = i
    }
  }
  
  // Si no completó ninguno, empezar en 1
  if (ultimoCompletado === 0) return 1
  
  // Si completó todos, retornar 7
  if (ultimoCompletado === 7) return 7
  
  // Retornar el siguiente día
  return ultimoCompletado + 1
}

// ==========================================
// FUNCIONES PARA MODO DIARIO/INTENSIVO
// ==========================================

export function getModoRetos(): 'diario' | 'intensivo' | null {
  if (typeof window === 'undefined') return null
  const modo = localStorage.getItem(MODO_KEY)
  return modo as 'diario' | 'intensivo' | null
}

export function setModoRetos(modo: 'diario' | 'intensivo'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(MODO_KEY, modo)
}

export function puedeAccederAlDia(dia: number, progress: UserProgress): boolean {
  const modo = getModoRetos()
  if (modo === 'intensivo') return true
  
  if (modo === 'diario') {
    if (dia === 1) return true
    const diaAnterior = dia - 1
    const fechaDiaAnterior = progress.dias[diaAnterior]?.fechaCompletado || progress.dias[diaAnterior]?.fecha
    if (!fechaDiaAnterior) return false
    const horasTranscurridas = (new Date().getTime() - new Date(fechaDiaAnterior).getTime()) / (1000 * 60 * 60)
    return horasTranscurridas >= 24
  }
  return true
}

export function getSiguienteDiaDisponible(progress: UserProgress): number {
  const modo = getModoRetos()
  let ultimoCompletado = 0
  
  for (let i = 1; i <= 7; i++) {
    if (progress.dias[i]?.completado) {
      ultimoCompletado = i
    }
  }
  
  if (ultimoCompletado === 0) return 1
  if (ultimoCompletado === 7) return 7
  if (modo === 'intensivo') return ultimoCompletado + 1
  
  const fechaUltimoDia = progress.dias[ultimoCompletado]?.fechaCompletado || progress.dias[ultimoCompletado]?.fecha
  if (!fechaUltimoDia) return ultimoCompletado + 1
  
  const horasTranscurridas = (new Date().getTime() - new Date(fechaUltimoDia).getTime()) / (1000 * 60 * 60)
  if (horasTranscurridas >= 24) {
    return ultimoCompletado + 1
  }
  
  return ultimoCompletado
}

export function getHorasRestantes(progress: UserProgress): number {
  let ultimoCompletado = 0
  for (let i = 1; i <= 7; i++) {
    if (progress.dias[i]?.completado) {
      ultimoCompletado = i
    }
  }
  
  const fechaUltimoDia = progress.dias[ultimoCompletado]?.fechaCompletado || progress.dias[ultimoCompletado]?.fecha
  if (!fechaUltimoDia) return 0
  
  const horasTranscurridas = (new Date().getTime() - new Date(fechaUltimoDia).getTime()) / (1000 * 60 * 60)
  return Math.max(0, Math.ceil(24 - horasTranscurridas))
}

export function marcarDiaCompletado(progress: UserProgress, dia: number, momentos: MomentData[]): UserProgress {
  return {
    ...progress,
    dias: {
      ...progress.dias,
      [dia]: {
        completado: true,
        fecha: new Date().toISOString(),
        fechaCompletado: new Date().toISOString(),
        momento: momentos,
      },
    },
  }
}

export function getDiasCompletados(progress: UserProgress): number {
  return Object.keys(progress.dias || {}).filter(
    (k) => progress.dias[Number(k)]?.completado
  ).length
}

export function isDiaCompletado(progress: UserProgress, dia: number): boolean {
  return progress.dias[dia]?.completado ?? false
}