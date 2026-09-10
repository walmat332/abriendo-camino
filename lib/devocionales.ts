import { supabase } from '@/lib/supabase'

export interface Devocional {
  dia: number
  semana: number
  titulo: string
  lecturaRef: string
  lecturaTexto: string
  fraseDelDia: string
  fase: 'conecta' | 'crece' | 'sirve' | 'multiplica'
  descubre: {
    pregunta: string
    opciones: { id: string; texto: string; esCorrecta?: boolean }[]
    explicacion: string
    versiculoApoyo: string
  }
  conecta: {
    pregunta: string
    opciones: { id: string; texto: string }[]
  }
  camina: {
    desafio: string
    oracion: string
  }
}

export const TOTAL_SEMANAS = 4
export const DIAS_POR_SEMANA = 7
export const TOTAL_DIAS = 28

// Función para obtener un devocional específico desde Supabase
export async function getDevocional(semana: number, dia: number): Promise<Devocional | null> {
  try {
    // 1. Buscar el mes activo
    const { data: mesActivo } = await supabase
      .from('meses_reto')
      .select('id')
      .eq('activo', true)
      .single()

    if (!mesActivo) return null

    // 2. Buscar el día específico uniendo las tablas
    const { data, error } = await supabase
      .from('dias_reto')
      .select(`
        dia_numero,
        semanas!inner(numero_semana),
        titulo,
        fase,
        versiculo_referencia,
        versiculo_texto,
        reflexion,
        descubre_pregunta,
        descubre_opciones,
        descubre_explicacion,
        descubre_versiculo,
        conecta_pregunta,
        conecta_opciones,
        oracion,
        accion
      `)
      .eq('semanas.numero_semana', semana)
      .eq('dia_numero', dia)
      .eq('semanas.mes_id', mesActivo.id)
      .single()

    if (error || !data) {
      console.error('Error al obtener devocional:', error)
      return null
    }

    // 3. Mapear los datos de Supabase al formato que usa tu app
    return {
      dia: data.dia_numero,
      semana: data.semanas.numero_semana,
      titulo: data.titulo || `Día ${data.dia_numero}`,
      lecturaRef: data.versiculo_referencia,
      lecturaTexto: data.versiculo_texto,
      fraseDelDia: data.reflexion || '',
      fase: (data.fase as any) || 'conecta',
      descubre: {
        pregunta: data.descubre_pregunta || '',
        opciones: (data.descubre_opciones as any[]) || [],
        explicacion: data.descubre_explicacion || '',
        versiculoApoyo: data.descubre_versiculo || '',
      },
      conecta: {
        pregunta: data.conecta_pregunta || '',
        opciones: (data.conecta_opciones as any[]) || [],
      },
      camina: {
        desafio: data.accion || '',
        oracion: data.oracion || '',
      },
    }
  } catch (err) {
    console.error('Error en getDevocional:', err)
    return null
  }
}

// Función auxiliar para obtener todos los días de una semana (si la necesitas)
export async function getSemanaCompleta(semana: number): Promise<Devocional[]> {
  const dias: Devocional[] = []
  for (let i = 1; i <= 7; i++) {
    const devocional = await getDevocional(semana, i)
    if (devocional) dias.push(devocional)
  }
  return dias
}