'use client'

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

const STORAGE_KEY = 'abriendo-camino-progress'

export function getProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

export function initializeProgress(): UserProgress {
  const existing = getProgress()
  if (existing) {
    existing.lastAccess = new Date().toISOString()
    saveProgress(existing)
    return existing
  }
  const initial: UserProgress = {
    dias: {},
    startDate: new Date().toISOString(),
    lastAccess: new Date().toISOString(),
  }
  saveProgress(initial)
  return initial
}

export function saveUsuario(nombre: string, telefono: string): void {
  const progress = getProgress() || initializeProgress()
  progress.usuario = { nombre, telefono }
  saveProgress(progress)
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// Funciones para el seguimiento de momentos
export function markMomentCompleted(reto: string, dia: number, momentIndex: number): void {
  const progress = getProgress()
  if (!progress) return
  
  if (!progress.moments) {
    progress.moments = {}
  }
  
  const key = `${reto}-${dia}`
  if (!progress.moments[key]) {
    progress.moments[key] = []
  }
  
  if (!progress.moments[key].includes(momentIndex)) {
    progress.moments[key].push(momentIndex)
  }
  
  saveProgress(progress)
}

export function isMomentCompleted(reto: string, dia: number, momentIndex: number): boolean {
  const progress = getProgress()
  if (!progress || !progress.moments) return false
  
  const key = `${reto}-${dia}`
  return progress.moments[key]?.includes(momentIndex) ?? false
}

export function getNextDia(reto: string): number {
  const progress = getProgress()
  if (!progress || !progress.dias) return 1
  
  const diasCompletados = Object.keys(progress.dias)
    .map(Number)
    .filter(n => progress.dias[n]?.completado)
    .sort((a, b) => b - a)
  
  return diasCompletados.length > 0 ? diasCompletados[0] + 1 : 1
}