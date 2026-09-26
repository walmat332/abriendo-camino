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

export async function getDevocional(
  semana: number,
  dia: number
): Promise<Devocional | null> {
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

    // 2. Buscar la semana exacta dentro del mes activo
    const { data: semanaData, error: semanaError } = await supabase
      .from('semanas')
      .select('id, numero_semana')
      .eq('mes_id', mesActivo.id)
      .eq('numero_semana', semana)
      .maybeSingle()

    if (semanaError || !semanaData) {
      console.error('Error buscando semana:', semanaError)
      return null
    }

    // 3. Buscar el día usando la nueva estructura:
    // Cada semana tiene Día 1 al Día 7.
    let { data, error } = await supabase
      .from('dias_reto')
      .select(`
        dia_numero,
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
      .eq('semana_id', semanaData.id)
      .eq('dia_numero', dia)
      .maybeSingle()

    // 4. Compatibilidad con meses antiguos.
    // Si no existe Día 1-7 dentro de esa semana,
    // probamos el formato antiguo global:
    // Semana 1 = días 1-7
    // Semana 2 = días 8-14
    // Semana 3 = días 15-21
    // Semana 4 = días 22-28
    if (!data && !error) {
      const diaLegacy = (semana - 1) * 7 + dia

      // Solo hacemos fallback si realmente es diferente
      // al número solicitado.
      if (diaLegacy !== dia) {
        const legacyResult = await supabase
          .from('dias_reto')
          .select(`
            dia_numero,
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
          .eq('semana_id', semanaData.id)
          .eq('dia_numero', diaLegacy)
          .maybeSingle()

        data = legacyResult.data
        error = legacyResult.error
      }
    }

    if (error) {
      console.error('Error al obtener devocional de Supabase:', error)
      return null
    }

    if (!data) {
      console.warn(
        `No se encontró devocional para semana ${semana}, día ${dia} en el mes activo.`
      )
      return null
    }

    // Función segura para parsear JSON
    const safeParse = (val: any) => {
      if (!val) return []

      if (typeof val === 'string') {
        try {
          return JSON.parse(val)
        } catch {
          return []
        }
      }

      return val
    }

    // 5. Mapear los datos al formato exacto que usa la app
    return {
      // Importante:
      // La app trabaja siempre con Día 1-7.
      // Aunque septiembre tenga almacenado 22-28,
      // aquí devolvemos el día solicitado por la navegación.
      dia,
      semana: semanaData.numero_semana || semana,
      titulo: data.titulo || `Día ${dia}`,
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