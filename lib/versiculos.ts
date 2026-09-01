export interface Versiculo {
  texto: string
  referencia: string
  categoria: 'conexion' | 'crecimiento' | 'servicio' | 'multiplicacion' | 'general'
}

export const VERSICULOS: Versiculo[] = [
  {
    texto: "Porque yo sé los planes que tengo para ustedes, afirma el Señor. Son planes de bienestar y no de calamidad, para darles un futuro y una esperanza.",
    referencia: "Jeremías 29:11",
    categoria: "conexion"
  },
  {
    texto: "Busquen primero el reino de Dios y su justicia, y todas estas cosas les serán añadidas.",
    referencia: "Mateo 6:33",
    categoria: "crecimiento"
  },
  {
    texto: "Permanezcan en mí, y yo permaneceré en ustedes. Así como la rama no puede dar fruto por sí misma, sino que permanece en la vid, tampoco ustedes pueden dar fruto si no permanecen en mí.",
    referencia: "Juan 15:4",
    categoria: "crecimiento"
  },
  {
    texto: "Cada uno ponga al servicio de los demás el don que haya recibido, administrando fielmente la gracia de Dios en sus diversas formas.",
    referencia: "1 Pedro 4:10",
    categoria: "servicio"
  },
  {
    texto: "Vayan, pues, y hagan discípulos de todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo.",
    referencia: "Mateo 28:19",
    categoria: "multiplicacion"
  },
  {
    texto: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    referencia: "Salmo 119:105",
    categoria: "general"
  },
  {
    texto: "Todo lo puedo en Cristo que me fortalece.",
    referencia: "Filipenses 4:13",
    categoria: "general"
  },
  {
    texto: "Echando toda su ansiedad sobre él, porque él tiene cuidado de ustedes.",
    referencia: "1 Pedro 5:7",
    categoria: "conexion"
  },
  {
    texto: "No se conformen a este siglo, sino transfórmense por medio de la renovación de su mente.",
    referencia: "Romanos 12:2",
    categoria: "crecimiento"
  },
  {
    texto: "Así que, hermanos míos, estén firmes y constantes, creciendo en la obra del Señor siempre, sabiendo que su trabajo en el Señor no es en vano.",
    referencia: "1 Corintios 15:58",
    categoria: "multiplicacion"
  }
];

// Función para obtener el versículo del día (cambia cada 24 horas)
export function getVersiculoDelDia(): Versiculo {
  const hoy = new Date();
  // Calcular el día del año (1-366)
  const inicio = new Date(hoy.getFullYear(), 0, 0);
  const diff = hoy.getTime() - inicio.getTime();
  const unDia = 1000 * 60 * 60 * 24;
  const diaDelAnio = Math.floor(diff / unDia);
  
  // Seleccionar versículo basado en el día
  const index = diaDelAnio % VERSICULOS.length;
  return VERSICULOS[index];
}

// Función para obtener un versículo aleatorio
export function getVersiculoAleatorio(): Versiculo {
  const index = Math.floor(Math.random() * VERSICULOS.length);
  return VERSICULOS[index];
}