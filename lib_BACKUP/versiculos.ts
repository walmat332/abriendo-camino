import { supabase } from '@/lib/supabase'

export interface Versiculo {
  id?: number
  texto: string
  referencia: string
  categoria: 'conexion' | 'crecimiento' | 'servicio' | 'multiplicacion' | 'general'
}

// Función para obtener el versículo del día (cambia cada 24 horas)
export async function getVersiculoDelDia(): Promise<Versiculo | null> {
  try {
    const hoy = new Date()
    // Calcular el día del año (1-366)
    const inicio = new Date(hoy.getFullYear(), 0, 0)
    const diff = hoy.getTime() - inicio.getTime()
    const unDia = 1000 * 60 * 60 * 24
    const diaDelAnio = Math.floor(diff / unDia)
    
    // Obtener todos los versículos de Supabase
    const { data: versiculos, error } = await supabase
      .from('versiculos')
      .select('*')
      
    if (error) {
      console.error('Error al obtener versículos:', error)
      return null
    }
    
    if (!versiculos || versiculos.length === 0) {
      return null
    }
    
    // Seleccionar versículo basado en el día
    const index = diaDelAnio % versiculos.length
    return versiculos[index]
  } catch (err) {
    console.error('Error en getVersiculoDelDia:', err)
    return null
  }
}

// Función para obtener un versículo aleatorio
export async function getVersiculoAleatorio(): Promise<Versiculo | null> {
  try {
    const { data: versiculos, error } = await supabase
      .from('versiculos')
      .select('*')
    
    if (error) {
      console.error('Error al obtener versículos:', error)
      return null
    }
    
    if (!versiculos || versiculos.length === 0) {
      return null
    }
    
    const index = Math.floor(Math.random() * versiculos.length)
    return versiculos[index]
  } catch (err) {
    console.error('Error en getVersiculoAleatorio:', err)
    return null
  }
}

// Función para obtener versículos por categoría
export async function getVersiculosPorCategoria(categoria: string): Promise<Versiculo[]> {
  try {
    const { data: versiculos, error } = await supabase
      .from('versiculos')
      .select('*')
      .eq('categoria', categoria)
    
    if (error) {
      console.error('Error al obtener versículos por categoría:', error)
      return []
    }
    
    return versiculos || []
  } catch (err) {
    console.error('Error en getVersiculosPorCategoria:', err)
    return []
  }
}