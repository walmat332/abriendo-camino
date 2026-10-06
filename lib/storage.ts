import { supabase } from './supabase'

export interface Usuario {
  nombre: string
  telefono: string
}

export interface ProgressData {
  dias: Record<number, {
    completado: boolean
    fecha?: string
    respuestas?: string[]
    momentos?: string[]
  }>
  startDate: string
  lastAccess: string
  usuario?: Usuario
  modoRetos?: 'diario' | 'intensivo'
  mesReto?: string
}

const STORAGE_KEY = 'abriendo-camino-progress'
const MODO_KEY = 'abriendo-camino-modo'
const MES_ACTIVO_KEY = 'abriendo-camino-mes-activo'

let mesActivoCache: string | null = null
let cacheInicializado = false

async function inicializarCacheMesActivo(): Promise<void> {
  if (cacheInicializado) return
  try {
    const { data, error } = await supabase
      .from('meses_reto')
      .select('id')
      .eq('activo', true)
      .limit(1)
      .maybeSingle()
    if (!error && data?.id) {
      mesActivoCache = data.id
      localStorage.setItem(MES_ACTIVO_KEY, data.id)
    }
  } catch {} finally {
    cacheInicializado = true
  }
}

function obtenerMesActivoCache(): string | null {
  if (mesActivoCache) return mesActivoCache
  const cached = localStorage.getItem(MES_ACTIVO_KEY)
  if (cached) {
    mesActivoCache = cached
    return cached
  }
  if (!cacheInicializado) {
    inicializarCacheMesActivo().catch(() => {})
  }
  return null
}

function normalizarSegunCache(progress: ProgressData): ProgressData {
  const mesActivo = obtenerMesActivoCache()
  if (!mesActivo) return progress
  if (progress.mesReto === mesActivo) return progress
  return {
    ...progress,
    dias: {},
    startDate: new Date().toISOString(),
    lastAccess: new Date().toISOString(),
    mesReto: mesActivo
  }
}

export function getProgress(): ProgressData | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  try {
    const progress = JSON.parse(data)
    const normalized = normalizarSegunCache(progress)
    if (normalized !== progress) {
      saveProgress(normalized)
    }
    return normalized
  } catch {
    return null
  }
}

export async function normalizarProgresoMes(progress: ProgressData): Promise<ProgressData> {
  await inicializarCacheMesActivo()
  const normalized = normalizarSegunCache(progress)
  if (normalized !== progress) {
    saveProgress(normalized)
  }
  return normalized
}

export function saveProgress(progress: ProgressData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function getModoRetos(): 'diario' | 'intensivo' {
  if (typeof window === 'undefined') return 'diario'
  const modo = localStorage.getItem(MODO_KEY)
  return modo === 'intensivo' ? 'intensivo' : 'diario'
}

export function setModoRetos(modo: 'diario' | 'intensivo'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(MODO_KEY, modo)
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

export function marcarDiaCompletado(
  progress: ProgressData,
  dia: number,
  respuestas: string[]
): ProgressData {
  const newProgress: ProgressData = {
    ...progress,
    dias: { ...progress.dias }
  }
  newProgress.dias[dia] = {
    ...(newProgress.dias[dia] || { completado: false }),
    completado: true,
    fecha: new Date().toISOString(),
    respuestas
  }
  newProgress.lastAccess = new Date().toISOString()
  saveProgress(newProgress)
  if (newProgress.usuario) {
    sincronizarConSupabase(newProgress)
  }
  return newProgress
}

export function getSiguienteDiaDisponible(progress: ProgressData | null): number {
  if (!progress) return 1
  for (let dia = 1; dia <= 28; dia++) {
    if (!progress.dias[dia]?.completado) {
      return dia
    }
  }
  return 28
}

export function puedeAccederAlDia(dia: number, progress: ProgressData | null): boolean {
  if (dia < 1 || dia > 28) return false
  const modo = getModoRetos()
  if (modo === 'intensivo') return true
  if (!progress) return dia === 1
  const siguienteDia = getSiguienteDiaDisponible(progress)
  return dia <= siguienteDia
}

export function getHorasRestantes(progress: ProgressData): number {
  if (!progress.lastAccess) return 0
  const lastAccess = new Date(progress.lastAccess).getTime()
  const now = Date.now()
  const horasTranscurridas = (now - lastAccess) / (1000 * 60 * 60)
  return Math.max(0, Math.ceil(24 - horasTranscurridas))
}

async function sincronizarConSupabase(progress: ProgressData): Promise<void> {
  try {
    if (!progress.usuario || !progress.usuario.telefono) {
      console.log('⚠️ No hay usuario registrado')
      return
    }

    const diasCompletados = Object.keys(progress.dias)
      .filter(dia => progress.dias[parseInt(dia)]?.completado)
      .map(dia => parseInt(dia))

    const ultimoDiaCompletado = diasCompletados.length > 0 ? Math.max(...diasCompletados) : 0

    // NUEVO: Obtener las respuestas del último día completado
    const respuestasUltimoDia = progress.dias[ultimoDiaCompletado]?.respuestas || []
    const respuestasTexto = respuestasUltimoDia.length > 0 
      ? respuestasUltimoDia.join(' | ') 
      : 'Sin respuestas'

    console.log(`🔄 Sincronizando: ${progress.usuario.nombre} - Día ${ultimoDiaCompletado}`)

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
      const { error: updateError } = await supabase
        .from('registros')
        .update({
          nombre: progress.usuario.nombre,
          dia_completado: ultimoDiaCompletado,
          ultimo_acceso: progress.lastAccess,
          respuestas_ultimo_dia: respuestasTexto
        })
        .eq('telefono', progress.usuario.telefono)

      if (updateError) console.error('❌ Error al actualizar:', updateError)
      else console.log('✅ Actualizado correctamente')
    } else {
      const { error: insertError } = await supabase
        .from('registros')
        .insert({
          nombre: progress.usuario.nombre,
          telefono: progress.usuario.telefono,
          dia_completado: ultimoDiaCompletado,
          ultimo_acceso: progress.lastAccess,
          respuestas_ultimo_dia: respuestasTexto
        })

      if (insertError) console.error('❌ Error al insertar:', insertError)
      else console.log('✅ Insertado correctamente')
    }
  } catch (error) {
    console.error('❌ Error en sincronización:', error)
  }
}

export function markMomentCompleted(momentId: string, dia?: number, momentIndex?: number): void {
  const progress = getProgress()
  if (!progress) return
  const diaKey = dia !== undefined ? dia : 0
  if (!progress.dias[diaKey]) progress.dias[diaKey] = { completado: false }
  if (!progress.dias[diaKey].momentos) progress.dias[diaKey].momentos = []
  if (!progress.dias[diaKey].momentos!.includes(momentId)) {
    progress.dias[diaKey].momentos!.push(momentId)
  }
  saveProgress(progress)
  if (progress.usuario) sincronizarConSupabase(progress)
}

export function isMomentCompleted(momentId: string): boolean {
  const progress = getProgress()
  if (!progress) return false
  for (const diaKey of Object.keys(progress.dias)) {
    const dia = progress.dias[parseInt(diaKey)]
    if (dia.momentos && dia.momentos.includes(momentId)) return true
  }
  return false
}

export function getNextDia(progress: ProgressData | null): number {
  return getSiguienteDiaDisponible(progress)
}

export function getSemanaDia(diaAbsoluto: number): { semana: number; dia: number } {
  const semana = Math.ceil(diaAbsoluto / 7)
  const dia = ((diaAbsoluto - 1) % 7) + 1
  return { semana, dia }
}

export function getDiaAbsoluto(semana: number, dia: number): number {
  return (semana - 1) * 7 + dia
}

export function getProgresoSemanal(progress: ProgressData | null, semana: number): { completados: number; total: number; porcentaje: number } {
  const total = 7
  let completados = 0
  const inicioDia = (semana - 1) * 7 + 1
  const finDia = semana * 7
  for (let i = inicioDia; i <= finDia; i++) {
    if (progress?.dias[i]?.completado) completados++
  }
  return { completados, total, porcentaje: Math.round((completados / total) * 100) }
}