import { supabase } from './supabase'

export interface Usuario {
  nombre: string
  telefono: string
}

export interface ProgressData {
  dias: Record<number, { completado: boolean; fecha?: string; respuestas?: string[] }>
  startDate: string
  lastAccess: string
  usuario?: Usuario
}

const STORAGE_KEY = 'abriendo-camino-progress'

export function getProgress(): ProgressData | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function saveProgress(progress: ProgressData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function saveUsuario(nombre: string, telefono: string): void {
  const progress = getProgress() || {
    dias: {},
    startDate: new Date().toISOString(),
    lastAccess: new Date().toISOString()
  }
  progress.usuario = { nombre, telefono }
  progress.lastAccess = new Date().toISOString()
  saveProgress(progress)
  
  sincronizarConSupabase(progress)
}

export function marcarDiaCompletado(progress: ProgressData, dia: number, respuestas: string[]): ProgressData {
  const newProgress = { ...progress }
  if (!newProgress.dias[dia]) {
    newProgress.dias[dia] = {}
  }
  newProgress.dias[dia].completado = true
  newProgress.dias[dia].fecha = new Date().toISOString()
  newProgress.dias[dia].respuestas = respuestas
  newProgress.lastAccess = new Date().toISOString()
  
  saveProgress(newProgress)
  
  if (newProgress.usuario) {
    sincronizarConSupabase(newProgress)
  }
  
  return newProgress
}

export function getSiguienteDiaDisponible(progress: ProgressData | null): number {
  if (!progress) return 1
  const diasCompletados = Object.keys(progress.dias).filter(d => progress.dias[parseInt(d)].completado)
  return diasCompletados.length + 1
}

export function puedeAccederAlDia(dia: number, progress: ProgressData): boolean {
  if (!progress) return dia === 1
  const diasCompletados = Object.keys(progress.dias).filter(d => progress.dias[parseInt(d)].completado).length
  return dia <= diasCompletados + 1
}

export function getHorasRestantes(progress: ProgressData): number {
  if (!progress.lastAccess) return 0
  const lastAccess = new Date(progress.lastAccess).getTime()
  const now = Date.now()
  const horasTranscurridas = (now - lastAccess) / (1000 * 60 * 60)
  return Math.max(0, Math.ceil(24 - horasTranscurridas))
}

//  VERSIÓN CORREGIDA: Sin upsert, busca y actualiza/inserta manualmente
async function sincronizarConSupabase(progress: ProgressData): Promise<void> {
  try {
    if (!progress.usuario || !progress.usuario.telefono) {
      console.log('⚠️ No hay usuario registrado')
      return
    }
    
    const diasCompletados = Object.keys(progress.dias)
      .filter(d => progress.dias[parseInt(d)].completado)
      .map(d => parseInt(d))
    
    const ultimoDiaCompletado = diasCompletados.length > 0 
      ? Math.max(...diasCompletados)
      : 0

    console.log(`🔄 Sincronizando: ${progress.usuario.nombre} - Día ${ultimoDiaCompletado}`)

    // 1. Buscar si existe el registro por teléfono
    const { data: existing, error: fetchError } = await supabase
      .from('registros')
      .select('*')
      .eq('telefono', progress.usuario.telefono)
      .maybeSingle()

    if (fetchError) {
      console.error('❌ Error al buscar:', fetchError)
      return
    }

    if (existing) {
      // 2. Actualizar existente
      const { error: updateError } = await supabase
        .from('registros')
        .update({
          nombre: progress.usuario.nombre,
          dia_completado: ultimoDiaCompletado
        })
        .eq('telefono', progress.usuario.telefono)

      if (updateError) {
        console.error('❌ Error al actualizar:', updateError)
      } else {
        console.log('✅ Actualizado correctamente')
      }
    } else {
      // 3. Insertar nuevo
      const { error: insertError } = await supabase
        .from('registros')
        .insert({
          nombre: progress.usuario.nombre,
          telefono: progress.usuario.telefono,
          dia_completado: ultimoDiaCompletado
        })

      if (insertError) {
        console.error('❌ Error al insertar:', insertError)
      } else {
        console.log('✅ Insertado correctamente')
      }
    }
  } catch (error) {
    console.error('❌ Error en sincronización:', error)
  }
}
// Funciones necesarias para moment-view.tsx
export function markMomentCompleted(momentId: string): void {
  const progress = getProgress()
  if (!progress) return
  
  if (!progress.dias[0]) {
    progress.dias[0] = {}
  }
  
  if (!progress.dias[0].momentos) {
    progress.dias[0].momentos = []
  }
  
  if (!progress.dias[0].momentos.includes(momentId)) {
    progress.dias[0].momentos.push(momentId)
  }
  
  saveProgress(progress)
}

export function isMomentCompleted(momentId: string): boolean {
  const progress = getProgress()
  if (!progress || !progress.dias[0]?.momentos) return false
  return progress.dias[0].momentos.includes(momentId)
}

export function getNextDia(progress: ProgressData | null): number {
  if (!progress) return 1
  const diasCompletados = Object.keys(progress.dias).filter(d => progress.dias[parseInt(d)].completado)
  return diasCompletados.length + 1
}