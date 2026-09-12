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
}

const STORAGE_KEY = 'abriendo-camino-progress'
const MODO_KEY = 'abriendo-camino-modo'

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

// Obtener modo de retos
export function getModoRetos(): 'diario' | 'intensivo' {
  if (typeof window === 'undefined') return 'diario'

  const modo = localStorage.getItem(MODO_KEY)

  return modo === 'intensivo' ? 'intensivo' : 'diario'
}

// Guardar modo de retos
export function setModoRetos(modo: 'diario' | 'intensivo'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(MODO_KEY, modo)
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
  sincronizarConSupabase(progress)
}

// Marcar día como completado
export function marcarDiaCompletado(
  progress: ProgressData,
  dia: number,
  respuestas: string[]
): ProgressData {
  const newProgress: ProgressData = {
    ...progress,
    dias: {
      ...progress.dias
    }
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

// Obtener el siguiente día disponible
export function getSiguienteDiaDisponible(
  progress: ProgressData | null
): number {
  if (!progress) return 1

  for (let dia = 1; dia <= 28; dia++) {
    if (!progress.dias[dia]?.completado) {
      return dia
    }
  }

  return 28
}

// Verificar si puede acceder al día
export function puedeAccederAlDia(
  dia: number,
  progress: ProgressData | null
): boolean {
  if (dia < 1 || dia > 28) return false

  const modo = getModoRetos()

  if (modo === 'intensivo') return true

  if (!progress) return dia === 1

  const siguienteDia = getSiguienteDiaDisponible(progress)

  return dia <= siguienteDia
}

// Obtener horas restantes para el siguiente día
export function getHorasRestantes(progress: ProgressData): number {
  if (!progress.lastAccess) return 0

  const lastAccess = new Date(progress.lastAccess).getTime()
  const now = Date.now()

  const horasTranscurridas =
    (now - lastAccess) / (1000 * 60 * 60)

  return Math.max(0, Math.ceil(24 - horasTranscurridas))
}

// Sincronizar con Supabase automáticamente
async function sincronizarConSupabase(
  progress: ProgressData
): Promise<void> {
  try {
    if (!progress.usuario || !progress.usuario.telefono) {
      console.log('⚠️ No hay usuario registrado')
      return
    }

    const diasCompletados = Object.keys(progress.dias)
      .filter(
        dia =>
          progress.dias[parseInt(dia)]?.completado
      )
      .map(dia => parseInt(dia))

    const ultimoDiaCompletado =
      diasCompletados.length > 0
        ? Math.max(...diasCompletados)
        : 0

    console.log(
      `🔄 Sincronizando: ${progress.usuario.nombre} - Día ${ultimoDiaCompletado}`
    )

    const { data: existing, error: fetchError } =
      await supabase
        .from('registros')
        .select('*')
        .eq('telefono', progress.usuario.telefono)
        .maybeSingle()

    if (fetchError) {
      console.error('❌ Error al buscar:', fetchError)
      return
    }

    if (existing) {
      const { error: updateError } =
        await supabase
          .from('registros')
          .update({
            nombre: progress.usuario.nombre,
            dia_completado: ultimoDiaCompletado,
            ultimo_acceso: progress.lastAccess
          })
          .eq(
            'telefono',
            progress.usuario.telefono
          )

      if (updateError) {
        console.error(
          '❌ Error al actualizar:',
          updateError
        )
      } else {
        console.log('✅ Actualizado correctamente')
      }
    } else {
      const { error: insertError } =
        await supabase
          .from('registros')
          .insert({
            nombre: progress.usuario.nombre,
            telefono: progress.usuario.telefono,
            dia_completado: ultimoDiaCompletado,
            ultimo_acceso: progress.lastAccess
          })

      if (insertError) {
        console.error(
          '❌ Error al insertar:',
          insertError
        )
      } else {
        console.log('✅ Insertado correctamente')
      }
    }
  } catch (error) {
    console.error(
      '❌ Error en sincronización:',
      error
    )
  }
}

// Marcar momento como completado
export function markMomentCompleted(
  momentId: string,
  dia?: number,
  momentIndex?: number
): void {
  const progress = getProgress()
  if (!progress) return

  const diaKey = dia !== undefined ? dia : 0

  if (!progress.dias[diaKey]) {
    progress.dias[diaKey] = {
      completado: false
    }
  }

  if (!progress.dias[diaKey].momentos) {
    progress.dias[diaKey].momentos = []
  }

  if (
    !progress.dias[diaKey].momentos!.includes(momentId)
  ) {
    progress.dias[diaKey].momentos!.push(momentId)
  }

  saveProgress(progress)

  if (progress.usuario) {
    sincronizarConSupabase(progress)
  }
}

// Comprobar si un momento ya fue completado
export function isMomentCompleted(
  momentId: string
): boolean {
  const progress = getProgress()
  if (!progress) return false

  for (const diaKey of Object.keys(progress.dias)) {
    const dia = progress.dias[parseInt(diaKey)]

    if (
      dia.momentos &&
      dia.momentos.includes(momentId)
    ) {
      return true
    }
  }

  return false
}

// Obtener siguiente día
export function getNextDia(
  progress: ProgressData | null
): number {
  return getSiguienteDiaDisponible(progress)
}

// Obtener semana y día relativo a partir de un día absoluto (1-28)
export function getSemanaDia(diaAbsoluto: number): { semana: number; dia: number } {
  const semana = Math.ceil(diaAbsoluto / 7)
  const dia = ((diaAbsoluto - 1) % 7) + 1
  return { semana, dia }
}

// Obtener día absoluto a partir de semana y día relativo (1-7)
export function getDiaAbsoluto(semana: number, dia: number): number {
  return (semana - 1) * 7 + dia
}

// Obtener progreso de una semana específica
export function getProgresoSemanal(
  progress: ProgressData | null,
  semana: number
): { completados: number; total: number; porcentaje: number } {
  const total = 7
  let completados = 0
  const inicioDia = (semana - 1) * 7 + 1
  const finDia = semana * 7

  for (let i = inicioDia; i <= finDia; i++) {
    if (progress?.dias[i]?.completado) {
      completados++
    }
  }

  return {
    completados,
    total,
    porcentaje: Math.round((completados / total) * 100)
  }
}