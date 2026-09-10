import { supabase } from '@/lib/supabase';
import type { Peticion, Oracion, Testimonio } from './types';

/**
 * Obtener peticiones públicas activas
 * Algoritmo: prioriza recientes, luego las con menos oraciones, luego diversidad
 */
export async function getPeticionesPublicas(limit = 20): Promise<Peticion[]> {
  const { data, error } = await supabase
    .from('peticiones')
    .select('*')
    .eq('estado', 'ACTIVA')
    .eq('visibilidad', 'publico')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('❌ Error al obtener peticiones:', error);
    return [];
  }

  return (data || []) as Peticion[];
}

/**
 * Obtener peticiones de un usuario específico
 */
export async function getPeticionesDeUsuario(usuario_id: string): Promise<Peticion[]> {
  const { data, error } = await supabase
    .from('peticiones')
    .select('*')
    .eq('usuario_id', usuario_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error al obtener peticiones del usuario:', error);
    return [];
  }

  return (data || []) as Peticion[];
}

/**
 * Obtener testimonios públicos
 */
export async function getTestimoniosPublicos(limit = 10): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from('testimonios')
    .select('*')
    .eq('visible_publicamente', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('❌ Error al obtener testimonios:', error);
    return [];
  }

  return (data || []) as Testimonio[];
}

/**
 * Obtener personas que oraron por una petición
 */
export async function getOracionesDePeticion(peticion_id: string): Promise<Oracion[]> {
  const { data, error } = await supabase
    .from('oraciones')
    .select('*')
    .eq('peticion_id', peticion_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error al obtener oraciones:', error);
    return [];
  }

  return (data || []) as Oracion[];
}

/**
 * Verificar si un usuario ya oró por una petición
 */
export async function usuarioYaOro(peticion_id: string, usuario_id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('oraciones')
    .select('id')
    .eq('peticion_id', peticion_id)
    .eq('usuario_id', usuario_id)
    .maybeSingle();

  if (error) {
    console.error('❌ Error al verificar oración:', error);
    return false;
  }

  return !!data;
}

/**
 * Obtener estadísticas comunitarias
 */
export async function getEstadisticasComunitarias() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  // Oraciones de hoy
  const { count: oracionesHoy } = await supabase
    .from('oraciones')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', hoy.toISOString());

  // Oraciones del mes
  const { count: oracionesMes } = await supabase
    .from('oraciones')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', inicioMes.toISOString());

  // Peticiones activas
  const { count: peticionesActivas } = await supabase
    .from('peticiones')
    .select('*', { count: 'exact', head: true })
    .eq('estado', 'ACTIVA');

  return {
    oracionesHoy: oracionesHoy || 0,
    oracionesMes: oracionesMes || 0,
    peticionesActivas: peticionesActivas || 0,
  };
}

/**
 * Obtener nombre del usuario por usuario_id (desde tabla registros)
 */
export async function getNombreUsuario(usuario_id: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('registros')
    .select('nombre')
    .eq('usuario_id', usuario_id)
    .maybeSingle();

  if (error || !data) return null;
  return data.nombre;
}