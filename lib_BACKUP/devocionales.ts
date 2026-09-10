import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Devocional {
  dia: number
  semana: number
  titulo: string
  fase: string
  lecturaRef: string
  lecturaTexto: string
  fraseDelDia?: string
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

export async function getDevocional(semana: number, dia: number): Promise<Devocional | null> {
  try {
    // 1. Buscar el mes activo
    const { data: mesActivo, error: mesError } = await supabase
      .from('meses_reto')
      .select('id')
      .eq('activo', true)
      .maybeSingle()

    if (mesError || !mesActivo) {
      console.error('Error buscando mes activo:', mesError)
      return null
    }

    // 2. Buscar el día específico uniendo las tablas
    const { data, error } = await supabase
      .from('dias_reto')
      .select(`
        dia_numero,
        semanas (numero_semana),
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
      .eq('dia_numero', dia)
      .eq('semanas.numero_semana', semana)
      .eq('semanas.mes_id', mesActivo.id)
      .maybeSingle()

    if (error) {
      console.error('Error al obtener devocional de Supabase:', error)
      return null
    }

    if (!data) {
      console.warn(`No se encontró devocional para semana ${semana}, día ${dia} en el mes activo.`)
      return null
    }

    // 3. Manejar la relación de semanas (Supabase puede devolverlo como objeto o array)
    const semanaData = Array.isArray(data.semanas) ? data.semanas[0] : data.semanas

    // Función segura para parsear JSON (las opciones vienen como string desde la BD)
    const safeParse = (val: any) => {
      if (!val) return []
      if (typeof val === 'string') {
        try { return JSON.parse(val) } catch { return [] }
      }
      return val
    }

    // 4. Mapear los datos al formato exacto que usa tu app
    return {
      dia: data.dia_numero,
      semana: semanaData?.numero_semana || semana,
      titulo: data.titulo || `Día ${data.dia_numero}`,
      fase: data.fase || 'conecta',
      lecturaRef: data.versiculo_referencia || '',
      lecturaTexto: data.versiculo_texto || data.reflexion || '',
      fraseDelDia: data.reflexion || '',
      descubre: {
        pregunta: data.descubre_pregunta || '',
        opciones: safeParse(data.descubre_opciones),
        explicacion: data.descubre_explicacion || '',
        versiculoApoyo: data.descubre_versiculo || ''
      },
      conecta: {
        pregunta: data.conecta_pregunta || '',
        opciones: safeParse(data.conecta_opciones)
      },
      camina: {
        desafio: data.accion || '',
        oracion: data.oracion || ''
      }
    }
  } catch (err) {
    console.error('Error inesperado en getDevocional:', err)
    return null
  }
}