export type CategoriaOracion = 
  | 'salud'
  | 'familia'
  | 'trabajo'
  | 'finanzas'
  | 'estudios'
  | 'matrimonio'
  | 'vida_espiritual'
  | 'hogar'
  | 'situacion_personal'
  | 'otro';

export type EstadoPeticion = 
  | 'ACTIVA'
  | 'RESPONDIDA'
  | 'CERRADA'
  | 'OCULTA';

export type VisibilidadPeticion = 'publico' | 'anonimo';

export interface Peticion {
  id: string;
  usuario_id: string;
  texto: string;
  categoria: CategoriaOracion;
  visibilidad: VisibilidadPeticion;
  estado: EstadoPeticion;
  oraciones_count: number;
  created_at: string;
  updated_at: string;
  nombre_autor?: string;
  es_autor?: boolean;
  ya_ore?: boolean;
}

export interface Oracion {
  id: string;
  peticion_id: string;
  usuario_id: string;
  mensaje: string | null;
  es_anonima: boolean;
  created_at: string;
  nombre_usuario?: string;
}

export interface Testimonio {
  id: string;
  peticion_id: string;
  usuario_id: string;
  texto: string;
  visible_publicamente: boolean;
  created_at: string;
  nombre_autor?: string;
  texto_peticion?: string;
}

export interface Reporte {
  id: string;
  peticion_id: string;
  usuario_id: string;
  motivo: string;
  resuelto: boolean;
  created_at: string;
}

export const CATEGORIAS: { value: CategoriaOracion; label: string; emoji: string }[] = [
  { value: 'salud', label: 'Salud', emoji: '❤️' },
  { value: 'familia', label: 'Familia', emoji: '‍👩‍👧' },
  { value: 'trabajo', label: 'Trabajo', emoji: '💼' },
  { value: 'finanzas', label: 'Finanzas', emoji: '💰' },
  { value: 'estudios', label: 'Estudios', emoji: '📚' },
  { value: 'matrimonio', label: 'Matrimonio', emoji: '💍' },
  { value: 'vida_espiritual', label: 'Vida espiritual', emoji: '🙏' },
  { value: 'hogar', label: 'Hogar', emoji: '🏠' },
  { value: 'situacion_personal', label: 'Situación personal', emoji: '❤️‍' },
  { value: 'otro', label: 'Otro', emoji: '✨' },
];

export const MENSAJES_ANIMO = [
  { emoji: '❤️', texto: 'Estoy contigo' },
  { emoji: '🙏', texto: 'Dios está contigo' },
  { emoji: '💪', texto: 'No te rindas' },
  { emoji: '✨', texto: 'Dios tiene el control' },
];