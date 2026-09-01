export interface Opcion {
  id: string
  texto: string
  esCorrecta?: boolean
}

export interface Devocional {
  dia: number
  titulo: string
  tema: string
  fase: 'conecta' | 'crece' | 'multiplica'
  lecturaRef: string
  lecturaTexto: string
  fraseDelDia: string
  descubre: {
    pregunta: string
    opciones: Opcion[]
    explicacion: string
    versiculoApoyo: string
  }
  conecta: {
    pregunta: string
    opciones: Opcion[]
  }
  camina: {
    desafio: string
    oracion: string
  }
}

export const DEVOCIONALES: Devocional[] = [
  {
    dia: 1,
    titulo: "Vuelve",
    tema: "Volver a Dios",
    fase: 'conecta',
    lecturaRef: "Jeremías 29:11-14",
    lecturaTexto: "Porque yo sé los planes que tengo para ustedes, afirma el Señor. Son planes de bienestar y no de calamidad, para darles un futuro y una esperanza. Entonces me invocarán y vendrán a orarme, y yo los escucharé. Me buscarán y me encontrarán, porque me buscarán de todo corazón. Me dejaré encontrar por ustedes, afirma el Señor, y los haré volver de su cautiverio.",
    fraseDelDia: "Dios tiene planes de bien para ti.",
    descubre: {
      pregunta: "¿Qué dice Dios que debemos hacer para encontrarlo?",
      opciones: [
        { id: "a", texto: "Esperar que Dios nos busque" },
        { id: "b", texto: "Buscarlo de todo corazón", esCorrecta: true },
        { id: "c", texto: "Resolver primero nuestros problemas" },
        { id: "d", texto: "Buscarlo solamente cuando lo necesitamos" },
      ],
      explicacion: "El texto no promete que Dios aparezca por inercia; invita a una búsqueda entera, no a medias.",
      versiculoApoyo: "Jeremías 29:13",
    },
    conecta: {
      pregunta: "¿Cómo está tu búsqueda de Dios últimamente?",
      opciones: [
        { id: "a", texto: "Lo busco principalmente cuando tengo problemas" },
        { id: "b", texto: "Quiero acercarme más, pero me cuesta ser constante" },
        { id: "c", texto: "Estoy buscando a Dios con mayor intención" },
        { id: "d", texto: "Siento que necesito volver a empezar" },
      ],
    },
    camina: {
      desafio: "Aparta 10 minutos hoy para estar a solas con Dios, sin celular, y háblale sinceramente.",
      oracion: "Señor, hoy quiero buscarte de todo corazón. Ayúdame a no conformarme con buscarte a medias. Amén.",
    },
  },
  {
    dia: 2,
    titulo: "Ponlo primero",
    tema: "Prioridades",
    fase: 'conecta',
    lecturaRef: "Mateo 6:33",
    lecturaTexto: "Busquen primero el reino de Dios y su justicia, y todas estas cosas les serán añadidas.",
    fraseDelDia: "Cuando Dios es primero, todo lo demás encuentra su lugar.",
    descubre: {
      pregunta: "¿Qué promete Jesús si ponemos a Dios primero?",
      opciones: [
        { id: "a", texto: "Que seremos ricos" },
        { id: "b", texto: "Que no tendremos problemas" },
        { id: "c", texto: "Que todas las cosas necesarias nos serán añadidas", esCorrecta: true },
        { id: "d", texto: "Que seremos famosos" },
      ],
      explicacion: "Jesús no promete riqueza ni ausencia de problemas, sino que lo necesario vendrá cuando Él es la prioridad.",
      versiculoApoyo: "Mateo 6:33",
    },
    conecta: {
      pregunta: "¿Qué ocupa el primer lugar en tu vida hoy?",
      opciones: [
        { id: "a", texto: "El trabajo o los estudios" },
        { id: "b", texto: "Mis relaciones personales" },
        { id: "c", texto: "Mis preocupaciones y problemas" },
        { id: "d", texto: "Dios y su reino" },
      ],
    },
    camina: {
      desafio: "Hoy, antes de revisar el celular al despertar, dedica 5 minutos a orar y poner a Dios primero.",
      oracion: "Señor, hoy te pongo en el primer lugar. Ordena mis prioridades según tu voluntad. Amén.",
    },
  },
  {
    dia: 3,
    titulo: "Permanece",
    tema: "Permanecer en Cristo",
    fase: 'crece',
    lecturaRef: "Juan 15:4-5",
    lecturaTexto: "Permanezcan en mí, y yo permaneceré en ustedes. Así como la rama no puede dar fruto por sí misma, sino que permanece en la vid, tampoco ustedes pueden dar fruto si no permanecen en mí. Yo soy la vid; ustedes son las ramas. El que permanece en mí, y yo en él, dará mucho fruto, porque separados de mí nada pueden hacer.",
    fraseDelDia: "Separados de Él nada podemos hacer.",
    descubre: {
      pregunta: "¿Qué dice Jesús que pasa si no permanecemos en Él?",
      opciones: [
        { id: "a", texto: "Que seremos libres" },
        { id: "b", texto: "Que nada podemos hacer", esCorrecta: true },
        { id: "c", texto: "Que tendremos más oportunidades" },
        { id: "d", texto: "Que seremos más fuertes" },
      ],
      explicacion: "Jesús es claro: sin conexión con Él, no podemos dar fruto verdadero.",
      versiculoApoyo: "Juan 15:5",
    },
    conecta: {
      pregunta: "¿Cómo está tu conexión con Jesús hoy?",
      opciones: [
        { id: "a", texto: "Me siento muy conectado y cerca de Él" },
        { id: "b", texto: "A veces me alejo, pero vuelvo" },
        { id: "c", texto: "Siento que me he desconectado" },
        { id: "d", texto: "Quiero reconectarme hoy" },
      ],
    },
    camina: {
      desafio: "Hoy, en cada decisión que tomes, pregúntate: ¿Qué haría Jesús aquí?",
      oracion: "Señor Jesús, hoy quiero permanecer en ti. Sin ti nada puedo hacer. Amén.",
    },
  },
  {
    dia: 4,
    titulo: "Escucha",
    tema: "Escuchar la voz de Dios",
    fase: 'crece',
    lecturaRef: "1 Reyes 19:11-13",
    lecturaTexto: "El Señor le dijo: Sal y ponte en el monte delante del Señor. Y he aquí que el Señor pasaba, y un grande y poderoso viento que rompía los montes y quebraba las peñas delante del Señor; pero el Señor no estaba en el viento. Y tras el viento un terremoto; pero el Señor no estaba en el terremoto. Y tras el terremoto un fuego; pero el Señor no estaba en el fuego. Y tras el fuego un silbo apacible y delicado.",
    fraseDelDia: "Dios habla en el silencio.",
    descubre: {
      pregunta: "¿Dónde estaba la presencia de Dios?",
      opciones: [
        { id: "a", texto: "En el viento fuerte" },
        { id: "b", texto: "En el terremoto" },
        { id: "c", texto: "En el fuego" },
        { id: "d", texto: "En el silbo apacible y delicado", esCorrecta: true },
      ],
      explicacion: "Dios no siempre habla en lo espectacular; a veces su voz es suave y requiere silencio para escucharla.",
      versiculoApoyo: "1 Reyes 19:12",
    },
    conecta: {
      pregunta: "¿Cuándo fue la última vez que te detuviste a escuchar a Dios en silencio?",
      opciones: [
        { id: "a", texto: "Hoy mismo" },
        { id: "b", texto: "Esta semana" },
        { id: "c", texto: "Hace tiempo, necesito volver a hacerlo" },
        { id: "d", texto: "No recuerdo haberlo hecho" },
      ],
    },
    camina: {
      desafio: "Hoy busca 5 minutos de silencio total. Apaga todo ruido y simplemente escucha.",
      oracion: "Señor, afina mis oídos para escuchar tu voz suave. Ayúdame a hacer silencio para ti. Amén.",
    },
  },
  {
    dia: 5,
    titulo: "Aliméntate de la Palabra",
    tema: "La Biblia como alimento",
    fase: 'crece',
    lecturaRef: "Salmo 1:1-3",
    lecturaTexto: "Bienaventurado el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado; sino que en la ley del Señor está su delicia, y en su ley medita de día y de noche. Será como árbol plantado junto a corrientes de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperará.",
    fraseDelDia: "La Palabra de Dios es alimento para el alma.",
    descubre: {
      pregunta: "¿Qué pasa con la persona que medita en la Palabra día y noche?",
      opciones: [
        { id: "a", texto: "Se vuelve religioso" },
        { id: "b", texto: "Será como árbol plantado junto a aguas que da fruto", esCorrecta: true },
        { id: "c", texto: "Tendrá mucho dinero" },
        { id: "d", texto: "Nunca tendrá problemas" },
      ],
      explicacion: "La Palabra nos da vida, estabilidad y fruto. No es una regla, es alimento.",
      versiculoApoyo: "Salmo 1:3",
    },
    conecta: {
      pregunta: "¿Con qué frecuencia lees la Biblia?",
      opciones: [
        { id: "a", texto: "Todos los días" },
        { id: "b", texto: "Algunas veces por semana" },
        { id: "c", texto: "Muy poco, casi nunca" },
        { id: "d", texto: "Quiero empezar a leerla más" },
      ],
    },
    camina: {
      desafio: "Hoy lee un capítulo completo de la Biblia. Empieza por el Evangelio de Juan, capítulo 1.",
      oracion: "Señor, hoy quiero alimentarme de tu Palabra. Que sea lámpara a mis pies. Amén.",
    },
  },
  {
    dia: 6,
    titulo: "Habla con Dios",
    tema: "La oración",
    fase: 'multiplica',
    lecturaRef: "Filipenses 4:6-7",
    lecturaTexto: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
    fraseDelDia: "La oración transforma la ansiedad en paz.",
    descubre: {
      pregunta: "¿Qué reemplaza la oración con acción de gracias?",
      opciones: [
        { id: "a", texto: "La tristeza" },
        { id: "b", texto: "El afán y la ansiedad", esCorrecta: true },
        { id: "c", texto: "El aburrimiento" },
        { id: "d", texto: "El cansancio" },
      ],
      explicacion: "Pablo no dice que los problemas desaparezcan, sino que la paz de Dios guardará nuestro corazón.",
      versiculoApoyo: "Filipenses 4:7",
    },
    conecta: {
      pregunta: "¿Qué te quita la paz hoy?",
      opciones: [
        { id: "a", texto: "Mis finanzas" },
        { id: "b", texto: "Mis relaciones" },
        { id: "c", texto: "Mi salud o la de alguien cercano" },
        { id: "d", texto: "Mi futuro incierto" },
      ],
    },
    camina: {
      desafio: "Hoy escribe en un papel 3 cosas que te preocupan y entrégalas a Dios en oración.",
      oracion: "Padre, hoy te entrego mis preocupaciones. Recibo tu paz que sobrepasa todo entendimiento. Amén.",
    },
  },
  {
    dia: 7,
    titulo: "Ten hambre y comparte",
    tema: "Hambre espiritual y multiplicación",
    fase: 'multiplica',
    lecturaRef: "Mateo 5:6",
    lecturaTexto: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.",
    fraseDelDia: "El que tiene hambre de Dios, será saciado y podrá compartir.",
    descubre: {
      pregunta: "¿Qué promete Jesús a los que tienen hambre y sed de justicia?",
      opciones: [
        { id: "a", texto: "Que serán ricos" },
        { id: "b", texto: "Que serán saciados", esCorrecta: true },
        { id: "c", texto: "Que serán famosos" },
        { id: "d", texto: "Que no tendrán hambre nunca más" },
      ],
      explicacion: "Jesús promete saciedad espiritual a quienes buscan a Dios con hambre genuina.",
      versiculoApoyo: "Mateo 5:6",
    },
    conecta: {
      pregunta: "¿Tienes hambre de Dios hoy?",
      opciones: [
        { id: "a", texto: "Sí, tengo un deseo profundo de más de Él" },
        { id: "b", texto: "A veces, pero me distraigo fácil" },
        { id: "c", texto: "Me siento satisfecho con lo poco que hago" },
        { id: "d", texto: "Quiero que Dios me dé hambre de Él" },
      ],
    },
    camina: {
      desafio: "Hoy comparte esta experiencia con alguien que necesite acercarse a Dios. Envíale el link.",
      oracion: "Señor, dame hambre de ti. Que mi alma tenga sed de tu presencia cada día. Amén.",
    },
  },
];