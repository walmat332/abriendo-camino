'use client'

import type { UserProgress } from './types'

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
    const updated = { ...existing, lastAccess: new Date().toISOString() }
    saveProgress(updated)
    return updated
  }
  const initial: UserProgress = {
    dias: {},
    moments: {},
    startDate: new Date().toISOString(),
    lastAccess: new Date().toISOString(),
  } as UserProgress
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
  
  const updatedProgress = { ...progress }
  if (!updatedProgress.moments) {
    updatedProgress.moments = {}
  }
  
  const key = `${reto}-${dia}`
  if (!updatedProgress.moments[key]) {
    updatedProgress.moments[key] = []
  }
  
  if (!updatedProgress.moments[key].includes(momentIndex)) {
    updatedProgress.moments[key] = [...updatedProgress.moments[key], momentIndex]
  }
  
  saveProgress(updatedProgress)
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