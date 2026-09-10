import { supabase } from '@/lib/supabase';
import type { CategoriaOracion, VisibilidadPeticion } from './types';

/**
 * Crear una nueva petición
 */
export async function crearPeticion(params: {
  usuario_id: string;
  texto: string;
  categoria: CategoriaOracion;
  visibilidad: VisibilidadPeticion;
}): Promise<{ success: boolean; error?: string }> {
  const { usuario_id, texto, categoria, visibilidad } = params;

  const { error } = await supabase
    .from('peticiones')
    .insert({
      usuario_id,
      texto: texto.trim(),
      categoria,
      visibilidad,
      estado: 'ACTIVA',
      oraciones_count: 0,
    });

  if (error) {
    console.error('❌ Error al crear petición:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Unirse en oración por una petición
 * Retorna: { success, ya_oro, error }
 */
export async function orarPorPeticion(params: {
  peticion_id: string;
  usuario_id: string;
  mensaje?: string;
  es_anonima?: boolean;
}): Promise<{ success: boolean; ya_oro?: boolean; error?: string }> {
  const { peticion_id, usuario_id, mensaje, es_anonima = false } = params;

  // Verificar si ya oró
  const { data: existente } = await supabase
    .from('oraciones')
    .select('id')
    .eq('peticion_id', peticion_id)
    .eq('usuario_id', usuario_id)
    .maybeSingle();

  if (existente) {
    return { success: false, ya_oro: true };
  }

  const { error } = await supabase
    .from('oraciones')
    .insert({
      peticion_id,
      usuario_id,
      mensaje: mensaje?.trim() || null,
      es_anonima,
    });

  if (error) {
    // Si es error de unique constraint, significa que ya oró
    if (error.code === '23505') {
      return { success: false, ya_oro: true };
    }
    console.error('❌ Error al orar:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Marcar una petición como respondida (solo el autor)
 */
export async function marcarComoRespondida(
  peticion_id: string,
  usuario_id: string
): Promise<{ success: boolean; error?: string }> {
  // Verificar que el usuario es el autor
  const { data: peticion, error: fetchError } = await supabase
    .from('peticiones')
    .select('usuario_id')
    .eq('id', peticion_id)
    .maybeSingle();

  if (fetchError || !peticion) {
    return { success: false, error: 'Petición no encontrada' };
  }

  if (peticion.usuario_id !== usuario_id) {
    return { success: false, error: 'No tienes permiso para marcar esta petición' };
  }

  const { error } = await supabase
    .from('peticiones')
    .update({ estado: 'RESPONDIDA' })
    .eq('id', peticion_id);

  if (error) {
    console.error('❌ Error al marcar como respondida:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Crear un testimonio
 */
export async function crearTestimonio(params: {
  peticion_id: string;
  usuario_id: string;
  texto: string;
  visible_publicamente: boolean;
}): Promise<{ success: boolean; error?: string }> {
  const { peticion_id, usuario_id, texto, visible_publicamente } = params;

  // Verificar que el usuario es el autor
  const { data: peticion } = await supabase
    .from('peticiones')
    .select('usuario_id, estado')
    .eq('id', peticion_id)
    .maybeSingle();

  if (!peticion) {
    return { success: false, error: 'Petición no encontrada' };
  }

  if (peticion.usuario_id !== usuario_id) {
    return { success: false, error: 'No tienes permiso para crear testimonio' };
  }

  if (peticion.estado !== 'RESPONDIDA') {
    return { success: false, error: 'La petición debe estar marcada como respondida' };
  }

  const { error } = await supabase
    .from('testimonios')
    .insert({
      peticion_id,
      usuario_id,
      texto: texto.trim(),
      visible_publicamente,
    });

  if (error) {
    console.error('❌ Error al crear testimonio:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Reportar una petición
 */
export async function reportarPeticion(params: {
  peticion_id: string;
  usuario_id: string;
  motivo: string;
}): Promise<{ success: boolean; error?: string }> {
  const { peticion_id, usuario_id, motivo } = params;

  const { error } = await supabase
    .from('reportes')
    .insert({
      peticion_id,
      usuario_id,
      motivo: motivo.trim(),
    });

  if (error) {
    console.error('❌ Error al reportar:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Verificar rate limiting (máximo 3 peticiones por 24h)
 */
export async function puedeCrearPeticion(usuario_id: string): Promise<boolean> {
  const hace24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from('peticiones')
    .select('*', { count: 'exact', head: true })
    .eq('usuario_id', usuario_id)
    .gte('created_at', hace24h);

  if (error) {
    console.error('❌ Error al verificar rate limit:', error);
    return true; // Si hay error, permitir por defecto
  }

  return (count || 0) < 3;
}