const USER_ID_KEY = 'abriendo-camino-usuario-id';

/**
 * Genera un UUID v4 simple
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Obtiene o crea el UUID del usuario actual.
 * Este UUID se guarda en localStorage y se usa como identificador.
 * 
 * NOTA: Este NO es un sistema de autenticación seguro.
 * Es una solución MVP que será reemplazada por Supabase Auth.
 */
export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem(USER_ID_KEY, userId);
    console.log('🆕 Nuevo UUID de usuario generado:', userId);
  }
  
  return userId;
}

/**
 * Obtiene el UUID actual sin crear uno nuevo.
 */
export function getCurrentUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USER_ID_KEY);
}

/**
 * Verifica si el usuario tiene una identidad asignada.
 */
export function isUserIdentified(): boolean {
  return !!getCurrentUserId();
}

/**
 * Vincula el UUID local con un registro existente en la tabla 'registros'.
 * Se llama después de que el usuario completa el LoginModal.
 */
export async function vincularUsuarioConRegistro(telefono: string): Promise<void> {
  const userId = getOrCreateUserId();
  
  try {
    const { supabase } = await import('@/lib/supabase');
    
    // Actualizar el registro existente con el usuario_id
    const { error } = await supabase
      .from('registros')
      .update({ usuario_id: userId })
      .eq('telefono', telefono);
    
    if (error) {
      console.error('❌ Error al vincular usuario:', error);
    } else {
      console.log('✅ Usuario vinculado:', userId);
    }
  } catch (err) {
    console.error('Error al vincular usuario:', err);
  }
}