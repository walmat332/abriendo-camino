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

// Obtener progreso actual
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

// Guardar progreso
export function saveProgress(progress: ProgressData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// Resetear progreso
export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// Guardar usuario y sincronizar con Supabase
export function saveUsuario(nombre: string, telefono: string): void {
  const progress = getProgress() || {
    dias: {},
    startDate: new Date().toISOString(),
    lastAccess: new Date().toISOString()
  }
  progress.usuario = { nombre, telefono }
  progress.lastAccess = new Date().toISOString()
  saveProgress(progress)
  
  // Sincronizar con Supabase
  sincronizarConSupabase(progress)
}

// Marcar día como completado
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
  
  // Sincronizar con Supabase si hay usuario registrado
  if (newProgress.usuario) {
    sincronizarConSupabase(newProgress)
  }
  
  return newProgress
}

// Obtener siguiente día disponible
export function getSiguienteDiaDisponible(progress: ProgressData | null): number {
  if (!progress) return 1
  const diasCompletados = Object.keys(progress.dias).filter(d => progress.dias[parseInt(d)].completado)
  return diasCompletados.length + 1
}

// Verificar si puede acceder al día
export function puedeAccederAlDia(dia: number, progress: ProgressData): boolean {
  if (!progress) return dia === 1
  const diasCompletados = Object.keys(progress.dias).filter(d => progress.dias[parseInt(d)].completado).length
  return dia <= diasCompletados + 1
}

// Obtener horas restantes para el siguiente día
export function getHorasRestantes(progress: ProgressData): number {
  if (!progress.lastAccess) return 0
  const lastAccess = new Date(progress.lastAccess).getTime()
  const now = Date.now()
  const horasTranscurridas = (now - lastAccess) / (1000 * 60 * 60)
  return Math.max(0, Math.ceil(24 - horasTranscurridas))
}

// FUNCIÓN CLAVE: Sincronizar con Supabase automáticamente
async function sincronizarConSupabase(progress: ProgressData): Promise<void> {
  try {
    if (!progress.usuario || !progress.usuario.telefono) {
      console.log('⚠️ No hay usuario registrado, no se sincroniza')
      return
    }
    
    // Calcular el último día completado
    const diasCompletados = Object.keys(progress.dias)
      .filter(d => progress.dias[parseInt(d)].completado)
      .map(d => parseInt(d))
    
    const ultimoDiaCompletado = diasCompletados.length > 0 
      ? Math.max(...diasCompletados)
      : 0

    console.log(`🔄 Sincronizando: ${progress.usuario.nombre} - Día ${ultimoDiaCompletado}`)

    // Usar UPSERT: actualiza si existe, inserta si no existe
    const { data, error } = await supabase
      .from('registros')
      .upsert({
        nombre: progress.usuario.nombre,
        telefono: progress.usuario.telefono,
        dia_completado: ultimoDiaCompletado,
        gc_interes: null
      }, { 
        onConflict: 'telefono' // Si el teléfono ya existe, lo actualiza
      })
      .select()

    if (error) {
      console.error('❌ Error al sincronizar con Supabase:', error)
    } else {
      console.log('✅ Sincronización exitosa:', data)
    }
  } catch (error) {
    console.error('❌ Error en sincronización:', error)
  }
}