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

export const DEVOCIONALES: Devocional[] = [
  // ============ SEMANA 1: CONECTA ============
  {
    dia: 1, semana: 1,
    titulo: "Dia 1 - Vuelve a Dios",
    lecturaRef: "Jeremias 29:11-14",
    lecturaTexto: "Porque yo se los planes que tengo para ustedes, afirma el Senor. Son planes de bienestar y no de calamidad, para darles un futuro y una esperanza.",
    fraseDelDia: "Dios tiene planes de bien para ti.",
    fase: "conecta",
    descubre: {
      pregunta: "Que dice Dios que debemos hacer para encontrarlo?",
      opciones: [
        { id: "a", texto: "Esperar que Dios nos busque" },
        { id: "b", texto: "Buscarlo de todo corazon", esCorrecta: true },
        { id: "c", texto: "Resolver nuestros problemas" }
      ],
      explicacion: "Dios promete que cuando lo busquemos de todo corazon, lo encontraremos.",
      versiculoApoyo: "Jeremias 29:13"
    },
    conecta: {
      pregunta: "En que momento sentiste que Dios estaba lejos?",
      opciones: [
        { id: "a", texto: "En una crisis familiar" },
        { id: "b", texto: "Cuando tome malas decisiones" },
        { id: "c", texto: "Nunca senti que se alejo" }
      ]
    },
    camina: {
      desafio: "Hoy dedica 5 minutos a orar y decirle a Dios que quieres volver a El.",
      oracion: "Senor, hoy decido volver a ti. Amen."
    }
  },
  {
    dia: 2, semana: 1,
    titulo: "Dia 2 - El Llamado de Jesus",
    lecturaRef: "Mateo 4:18-20",
    lecturaTexto: "Jesus les dijo: Siganme, y los hare pescadores de hombres. Ellos dejaron las redes al instante y lo siguieron.",
    fraseDelDia: "Jesus te llama hoy. Responderas?",
    fase: "conecta",
    descubre: {
      pregunta: "Que hicieron Pedro y Andres cuando Jesus los llamo?",
      opciones: [
        { id: "a", texto: "Lo ignoraron" },
        { id: "b", texto: "Dejaron todo y lo siguieron al instante", esCorrecta: true },
        { id: "c", texto: "Le pidieron tiempo" }
      ],
      explicacion: "Respondieron inmediatamente al llamado de Jesus.",
      versiculoApoyo: "Mateo 4:20"
    },
    conecta: {
      pregunta: "Que te esta pidiendo Jesus que dejes hoy?",
      opciones: [
        { id: "a", texto: "Un habito que me aleja de Dios" },
        { id: "b", texto: "Una relacion que no me conviene" },
        { id: "c", texto: "Mi comodidad y rutina" }
      ]
    },
    camina: {
      desafio: "Identifica una cosa que te aleja de Dios y decide dejarla hoy.",
      oracion: "Jesus, hoy respondo a tu llamado. Amen."
    }
  },
  {
    dia: 3, semana: 1,
    titulo: "Dia 3 - Arrepentimiento",
    lecturaRef: "Hechos 3:19",
    lecturaTexto: "Asi que, arrepentios y convertios, para que sean borrados vuestros pecados; para que vengan de la presencia del Senor tiempos de refrigerio.",
    fraseDelDia: "El arrepentimiento abre la puerta a la bendicion.",
    fase: "conecta",
    descubre: {
      pregunta: "Que promete Dios cuando nos arrepentimos?",
      opciones: [
        { id: "a", texto: "Que nunca mas tendremos problemas" },
        { id: "b", texto: "Que nuestros pecados seran borrados", esCorrecta: true },
        { id: "c", texto: "Que seremos ricos" }
      ],
      explicacion: "Dios promete borrar nuestros pecados y darnos tiempos de refrigerio.",
      versiculoApoyo: "Hechos 3:19"
    },
    conecta: {
      pregunta: "Hay algo en tu vida de lo que necesitas arrepentirte?",
      opciones: [
        { id: "a", texto: "Si, hay varias cosas" },
        { id: "b", texto: "Algo especifico que me pesa" },
        { id: "c", texto: "No, estoy en paz con Dios" }
      ]
    },
    camina: {
      desafio: "Escribe en un papel aquello de lo que te arrepientes y entregalo a Dios.",
      oracion: "Senor, me arrepiento. Limpia mi corazon. Amen."
    }
  },
  {
    dia: 4, semana: 1,
    titulo: "Dia 4 - Bautismo y Nueva Vida",
    lecturaRef: "Romanos 6:3-4",
    lecturaTexto: "Porque somos sepultados juntamente con el para muerte por el bautismo, a fin de que como Cristo resucito de los muertos, asi tambien nosotros andemos en vida nueva.",
    fraseDelDia: "El bautismo es el inicio de una nueva vida.",
    fase: "conecta",
    descubre: {
      pregunta: "Que simboliza el bautismo?",
      opciones: [
        { id: "a", texto: "Solo un ritual" },
        { id: "b", texto: "Morir al pecado y resucitar a nueva vida", esCorrecta: true },
        { id: "c", texto: "Una tradicion sin significado" }
      ],
      explicacion: "El bautismo simboliza nuestra muerte al pecado y resurreccion a nueva vida.",
      versiculoApoyo: "Romanos 6:4"
    },
    conecta: {
      pregunta: "Has sido bautizado?",
      opciones: [
        { id: "a", texto: "Si, fue muy especial" },
        { id: "b", texto: "Si, pero no recuerdo mucho" },
        { id: "c", texto: "Aun no me he bautizado" }
      ]
    },
    camina: {
      desafio: "Si no te has bautizado, habla con un lider de tu iglesia.",
      oracion: "Senor, quiero vivir en novedad de vida. Amen."
    }
  },
  {
    dia: 5, semana: 1,
    titulo: "Dia 5 - La Gracia de Dios",
    lecturaRef: "Efesios 2:8-9",
    lecturaTexto: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se glorie.",
    fraseDelDia: "La salvacion es un regalo, no un premio.",
    fase: "conecta",
    descubre: {
      pregunta: "Como somos salvos segun este texto?",
      opciones: [
        { id: "a", texto: "Por nuestras buenas obras" },
        { id: "b", texto: "Por gracia mediante la fe", esCorrecta: true },
        { id: "c", texto: "Por seguir todas las reglas" }
      ],
      explicacion: "La salvacion es un don de Dios recibido por fe, no por obras.",
      versiculoApoyo: "Efesios 2:8"
    },
    conecta: {
      pregunta: "Alguna vez has sentido que debes ganarte el amor de Dios?",
      opciones: [
        { id: "a", texto: "Si, frecuentemente" },
        { id: "b", texto: "A veces" },
        { id: "c", texto: "No, se que es por gracia" }
      ]
    },
    camina: {
      desafio: "Hoy agradece a Dios por su gracia incondicional.",
      oracion: "Gracias Senor por tu gracia. No la merezco, pero la recibo. Amen."
    }
  },
  {
    dia: 6, semana: 1,
    titulo: "Dia 6 - La Oracion que Transforma",
    lecturaRef: "Filipenses 4:6-7",
    lecturaTexto: "Por nada esteis afanosos, sino sean conocidas vuestras peticiones delante de Dios. Y la paz de Dios guardara vuestros corazones.",
    fraseDelDia: "La oracion transforma la ansiedad en paz.",
    fase: "conecta",
    descubre: {
      pregunta: "Que promete Dios a quienes oran?",
      opciones: [
        { id: "a", texto: "Que todos sus problemas desapareceran" },
        { id: "b", texto: "La paz que sobrepasa todo entendimiento", esCorrecta: true },
        { id: "c", texto: "Riquezas materiales" }
      ],
      explicacion: "Dios promete su paz sobrenatural a quienes llevan sus peticiones a El.",
      versiculoApoyo: "Filipenses 4:7"
    },
    conecta: {
      pregunta: "Que te quita la paz hoy?",
      opciones: [
        { id: "a", texto: "Problemas financieros" },
        { id: "b", texto: "Problemas familiares" },
        { id: "c", texto: "Incertidumbre sobre el futuro" }
      ]
    },
    camina: {
      desafio: "Escribe 3 cosas por las que estas agradecido y ora por lo que te preocupa.",
      oracion: "Senor, te entrego mis preocupaciones. Dame tu paz. Amen."
    }
  },
  {
    dia: 7, semana: 1,
    titulo: "Dia 7 - Hambre de Dios",
    lecturaRef: "Mateo 5:6",
    lecturaTexto: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos seran saciados.",
    fraseDelDia: "El que tiene hambre de Dios, sera saciado.",
    fase: "conecta",
    descubre: {
      pregunta: "Que promete Jesus a los que tienen hambre de justicia?",
      opciones: [
        { id: "a", texto: "Que seran ricos" },
        { id: "b", texto: "Que seran saciados", esCorrecta: true },
        { id: "c", texto: "Que seran famosos" }
      ],
      explicacion: "Jesus promete saciedad espiritual a quienes buscan a Dios con hambre genuina.",
      versiculoApoyo: "Mateo 5:6"
    },
    conecta: {
      pregunta: "Tienes hambre de Dios hoy?",
      opciones: [
        { id: "a", texto: "Si, deseo mas de El" },
        { id: "b", texto: "A veces, pero me distraigo" },
        { id: "c", texto: "Me siento satisfecho" }
      ]
    },
    camina: {
      desafio: "Hoy comparte esta experiencia con alguien que necesite acercarse a Dios.",
      oracion: "Senor, dame hambre de ti cada dia. Amen."
    }
  },
  // ============ SEMANA 2: CRECE ============
  {
    dia: 8, semana: 2,
    titulo: "Dia 1 - Profundizando en la Oracion",
    lecturaRef: "Mateo 6:5-6",
    lecturaTexto: "Mas tu, cuando ores, entra en tu aposento, y cerrada la puerta, ora a tu Padre que esta en secreto; y tu Padre que ve en lo secreto te recompensara.",
    fraseDelDia: "La oracion sincera transforma el corazon.",
    fase: "crece",
    descubre: {
      pregunta: "Como nos ensena Jesus a orar?",
      opciones: [
        { id: "a", texto: "En publico para ser vistos" },
        { id: "b", texto: "En privado con sinceridad", esCorrecta: true },
        { id: "c", texto: "Con muchas palabras" }
      ],
      explicacion: "Jesus ensena que la oracion debe ser sincera, no para impresionar.",
      versiculoApoyo: "Mateo 6:6"
    },
    conecta: {
      pregunta: "Como es tu vida de oracion?",
      opciones: [
        { id: "a", texto: "Oro todos los dias" },
        { id: "b", texto: "Oro de vez en cuando" },
        { id: "c", texto: "Casi no oro" }
      ]
    },
    camina: {
      desafio: "Dedica 10 minutos a orar en privado, sin distracciones.",
      oracion: "Senor, ensename a orar con sinceridad. Amen."
    }
  },
  {
    dia: 9, semana: 2,
    titulo: "Dia 2 - El Poder de la Palabra",
    lecturaRef: "Juan 1:1-5",
    lecturaTexto: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. En el estaba la vida, y la vida era la luz de los hombres.",
    fraseDelDia: "La Palabra de Dios es viva y eficaz.",
    fase: "crece",
    descubre: {
      pregunta: "Que dice el texto sobre el Verbo?",
      opciones: [
        { id: "a", texto: "Era solo un profeta" },
        { id: "b", texto: "Era Dios y estaba con Dios", esCorrecta: true },
        { id: "c", texto: "Fue creado al principio" }
      ],
      explicacion: "Jesus (el Verbo) existia desde el principio y es Dios mismo.",
      versiculoApoyo: "Juan 1:1"
    },
    conecta: {
      pregunta: "Que lugar ocupa la Biblia en tu vida?",
      opciones: [
        { id: "a", texto: "La leo todos los dias" },
        { id: "b", texto: "La leo de vez en cuando" },
        { id: "c", texto: "Casi no la leo" }
      ]
    },
    camina: {
      desafio: "Lee un capitulo del Evangelio de Juan hoy.",
      oracion: "Senor, que tu Palabra sea lampara a mis pies. Amen."
    }
  },
  {
    dia: 10, semana: 2,
    titulo: "Dia 3 - La Fe que Mueve Montanas",
    lecturaRef: "Hebreos 11:1,6",
    lecturaTexto: "Es, pues, la fe la certeza de lo que se espera, la conviccion de lo que no se ve. Sin fe es imposible agradar a Dios.",
    fraseDelDia: "La fe es confiar en lo que no vemos.",
    fase: "crece",
    descubre: {
      pregunta: "Que es la fe segun Hebreos 11?",
      opciones: [
        { id: "a", texto: "Creer sin evidencia" },
        { id: "b", texto: "Certeza de lo que se espera", esCorrecta: true },
        { id: "c", texto: "Un sentimiento religioso" }
      ],
      explicacion: "La fe es la certeza y conviccion de las realidades que no vemos.",
      versiculoApoyo: "Hebreos 11:1"
    },
    conecta: {
      pregunta: "En que area necesitas mas fe hoy?",
      opciones: [
        { id: "a", texto: "En mi salud" },
        { id: "b", texto: "En mis finanzas" },
        { id: "c", texto: "En mis relaciones" }
      ]
    },
    camina: {
      desafio: "Escribe una oracion de fe por esa area especifica.",
      oracion: "Senor, aumenta mi fe. Creo, pero ayudame en mi incredulidad. Amen."
    }
  },
  {
    dia: 11, semana: 2,
    titulo: "Dia 4 - El Fruto del Espiritu",
    lecturaRef: "Galatas 5:22-23",
    lecturaTexto: "Mas el fruto del Espiritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.",
    fraseDelDia: "El Espiritu produce fruto en nosotros.",
    fase: "crece",
    descubre: {
      pregunta: "Cuantos frutos del Espiritu se mencionan?",
      opciones: [
        { id: "a", texto: "Tres" },
        { id: "b", texto: "Nueve", esCorrecta: true },
        { id: "c", texto: "Doce" }
      ],
      explicacion: "El Espiritu produce 9 frutos en nuestra vida.",
      versiculoApoyo: "Galatas 5:22-23"
    },
    conecta: {
      pregunta: "Que fruto necesitas desarrollar mas?",
      opciones: [
        { id: "a", texto: "Paciencia o paz" },
        { id: "b", texto: "Amor o gozo" },
        { id: "c", texto: "Dominio propio" }
      ]
    },
    camina: {
      desafio: "Elige un fruto y practicalo intencionalmente hoy.",
      oracion: "Espiritu Santo, produce tu fruto en mi vida. Amen."
    }
  },
  {
    dia: 12, semana: 2,
    titulo: "Dia 5 - La Humildad de Cristo",
    lecturaRef: "Filipenses 2:3-5",
    lecturaTexto: "Nada hagais por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demas como superiores a el mismo.",
    fraseDelDia: "La humildad es grandeza verdadera.",
    fase: "crece",
    descubre: {
      pregunta: "Que nos pide Pablo en este texto?",
      opciones: [
        { id: "a", texto: "Ser los mejores siempre" },
        { id: "b", texto: "Estimar a los demas como superiores", esCorrecta: true },
        { id: "c", texto: "Competir con otros" }
      ],
      explicacion: "Pablo nos llama a la humildad, estimando a los demas.",
      versiculoApoyo: "Filipenses 2:3"
    },
    conecta: {
      pregunta: "En que area necesitas ser mas humilde?",
      opciones: [
        { id: "a", texto: "En mi trabajo" },
        { id: "b", texto: "En mi familia" },
        { id: "c", texto: "En mis relaciones" }
      ]
    },
    camina: {
      desafio: "Hoy reconoce publicamente el valor de alguien mas.",
      oracion: "Senor, dame un corazon humilde como el tuyo. Amen."
    }
  },
  {
    dia: 13, semana: 2,
    titulo: "Dia 6 - El Perdon que Libera",
    lecturaRef: "Efesios 4:32",
    lecturaTexto: "Antes sed benignos unos con otros, misericordiosos, perdonandoos unos a otros, como Dios tambien os perdono a vosotros en Cristo.",
    fraseDelDia: "Perdonar es liberarte a ti mismo.",
    fase: "crece",
    descubre: {
      pregunta: "Como debemos perdonar segun este texto?",
      opciones: [
        { id: "a", texto: "Solo si el otro lo merece" },
        { id: "b", texto: "Como Dios nos perdono", esCorrecta: true },
        { id: "c", texto: "Cuando se nos olvide el dano" }
      ],
      explicacion: "Debemos perdonar como Dios nos perdono: completamente.",
      versiculoApoyo: "Efesios 4:32"
    },
    conecta: {
      pregunta: "Hay alguien a quien necesites perdonar?",
      opciones: [
        { id: "a", texto: "Si, alguien especifico" },
        { id: "b", texto: "A mi mismo" },
        { id: "c", texto: "No, ya perdone a todos" }
      ]
    },
    camina: {
      desafio: "Ora por esa persona y suelta el rencor hoy.",
      oracion: "Senor, ayudame a perdonar como tu me perdonaste. Amen."
    }
  },
  {
    dia: 14, semana: 2,
    titulo: "Dia 7 - La Obediencia que Bendice",
    lecturaRef: "Juan 14:15",
    lecturaTexto: "Si me amais, guardad mis mandamientos. El que tiene mis mandamientos, y los guarda, ese es el que me ama.",
    fraseDelDia: "Obedecer es la prueba del amor.",
    fase: "crece",
    descubre: {
      pregunta: "Como demostramos que amamos a Jesus?",
      opciones: [
        { id: "a", texto: "Solo cantando alabanzas" },
        { id: "b", texto: "Guardando sus mandamientos", esCorrecta: true },
        { id: "c", texto: "Yendo a la iglesia" }
      ],
      explicacion: "Jesus dice que el amor se demuestra con obediencia.",
      versiculoApoyo: "Juan 14:15"
    },
    conecta: {
      pregunta: "Que mandamiento de Jesus te cuesta mas obedecer?",
      opciones: [
        { id: "a", texto: "Amar a mis enemigos" },
        { id: "b", texto: "Perdonar siempre" },
        { id: "c", texto: "Dar generosamente" }
      ]
    },
    camina: {
      desafio: "Elige un mandamiento y obedecelo hoy intencionalmente.",
      oracion: "Senor, dame fuerza para obedecerte con amor. Amen."
    }
  },
  // ============ SEMANA 3: SIRVE ============
  {
    dia: 15, semana: 3,
    titulo: "Dia 1 - Sirviendo con Amor",
    lecturaRef: "Galatas 5:13-14",
    lecturaTexto: "Vosotros, hermanos, a libertad fuisteis llamados; solamente que no useis la libertad como ocasion para la carne, sino servios por amor los unos a los otros.",
    fraseDelDia: "Servir es la forma mas alta de amor.",
    fase: "sirve",
    descubre: {
      pregunta: "Para que debemos usar nuestra libertad?",
      opciones: [
        { id: "a", texto: "Para hacer lo que queramos" },
        { id: "b", texto: "Para servirnos por amor", esCorrecta: true },
        { id: "c", texto: "Para no seguir reglas" }
      ],
      explicacion: "La libertad cristiana se expresa sirviendo a otros con amor.",
      versiculoApoyo: "Galatas 5:13"
    },
    conecta: {
      pregunta: "Como estas sirviendo a otros?",
      opciones: [
        { id: "a", texto: "Activamente en mi iglesia" },
        { id: "b", texto: "Ayudo cuando puedo" },
        { id: "c", texto: "No estoy sirviendo" }
      ]
    },
    camina: {
      desafio: "Hoy haz un acto de servicio inesperado.",
      oracion: "Senor, muestrame como servir hoy. Amen."
    }
  },
  {
    dia: 16, semana: 3,
    titulo: "Dia 2 - El Buen Samaritano",
    lecturaRef: "Lucas 10:25-37",
    lecturaTexto: "Quien, pues, de estos tres te parece que fue el projimo del que cayo en manos de los ladrones? El dijo: El que uso de misericordia con el.",
    fraseDelDia: "Tu projimo es quien te necesita.",
    fase: "sirve",
    descubre: {
      pregunta: "Quien fue el verdadero projimo en la parabola?",
      opciones: [
        { id: "a", texto: "El sacerdote" },
        { id: "b", texto: "El samaritano que ayudo", esCorrecta: true },
        { id: "c", texto: "El levita" }
      ],
      explicacion: "El samaritano mostro misericordia y fue el verdadero projimo.",
      versiculoApoyo: "Lucas 10:37"
    },
    conecta: {
      pregunta: "A quien puedes ayudar esta semana?",
      opciones: [
        { id: "a", texto: "Un vecino necesitado" },
        { id: "b", texto: "Un familiar" },
        { id: "c", texto: "Un desconocido" }
      ]
    },
    camina: {
      desafio: "Busca activamente a alguien que necesite ayuda hoy.",
      oracion: "Senor, abre mis ojos para ver a quien necesita ayuda. Amen."
    }
  },
  {
    dia: 17, semana: 3,
    titulo: "Dia 3 - Dones Espirituales",
    lecturaRef: "1 Pedro 4:10",
    lecturaTexto: "Cada uno ponga al servicio de los demas el don que haya recibido, administrando fielmente la gracia de Dios en sus diversas formas.",
    fraseDelDia: "Tienes un don para servir.",
    fase: "sirve",
    descubre: {
      pregunta: "Que debemos hacer con nuestros dones?",
      opciones: [
        { id: "a", texto: "Guardarlos para nosotros" },
        { id: "b", texto: "Ponerlos al servicio de los demas", esCorrecta: true },
        { id: "c", texto: "Usarlos solo para ganar dinero" }
      ],
      explicacion: "Dios nos da dones para servir a otros.",
      versiculoApoyo: "1 Pedro 4:10"
    },
    conecta: {
      pregunta: "Cual crees que es tu don espiritual?",
      opciones: [
        { id: "a", texto: "Ensenar o predicar" },
        { id: "b", texto: "Servir o ayudar" },
        { id: "c", texto: "Aun no lo se" }
      ]
    },
    camina: {
      desafio: "Usa tu don hoy para bendecir a alguien.",
      oracion: "Senor, ayudame a descubrir y usar mis dones. Amen."
    }
  },
  {
    dia: 18, semana: 3,
    titulo: "Dia 4 - La Generosidad",
    lecturaRef: "2 Corintios 9:7",
    lecturaTexto: "Cada uno de como propuso en su corazon: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.",
    fraseDelDia: "Dios ama al que da con alegria.",
    fase: "sirve",
    descubre: {
      pregunta: "Como debemos dar segun este texto?",
      opciones: [
        { id: "a", texto: "Por obligacion" },
        { id: "b", texto: "Con alegria y de corazon", esCorrecta: true },
        { id: "c", texto: "Solo cuando nos sobre" }
      ],
      explicacion: "Dios valora la actitud del corazon al dar.",
      versiculoApoyo: "2 Corintios 9:7"
    },
    conecta: {
      pregunta: "Como es tu actitud al dar?",
      opciones: [
        { id: "a", texto: "Doy con alegria" },
        { id: "b", texto: "Doy por obligacion" },
        { id: "c", texto: "Me cuesta dar" }
      ]
    },
    camina: {
      desafio: "Hoy da algo (tiempo, dinero, ayuda) con alegria.",
      oracion: "Senor, hazme un dador alegre. Amen."
    }
  },
  {
    dia: 19, semana: 3,
    titulo: "Dia 5 - Sirviendo en la Iglesia",
    lecturaRef: "Efesios 4:11-12",
    lecturaTexto: "Y el mismo constituyo a unos, apostoles; a otros, profetas; a otros, evangelistas; a otros, pastores y maestros, a fin de perfeccionar a los santos para la obra del ministerio.",
    fraseDelDia: "Cada miembro es importante en el cuerpo.",
    fase: "sirve",
    descubre: {
      pregunta: "Para que Dios da lideres a la iglesia?",
      opciones: [
        { id: "a", texto: "Para que ellos hagan todo" },
        { id: "b", texto: "Para equipar a los santos para el ministerio", esCorrecta: true },
        { id: "c", texto: "Para tener autoridad" }
      ],
      explicacion: "Los lideres equipan a todos los creyentes para servir.",
      versiculoApoyo: "Efesios 4:12"
    },
    conecta: {
      pregunta: "Sirves activamente en tu iglesia?",
      opciones: [
        { id: "a", texto: "Si, en un ministerio" },
        { id: "b", texto: "A veces ayudo" },
        { id: "c", texto: "No, pero quiero empezar" }
      ]
    },
    camina: {
      desafio: "Habla con un lider sobre como puedes servir.",
      oracion: "Senor, muestrame donde servir en tu casa. Amen."
    }
  },
  {
    dia: 20, semana: 3,
    titulo: "Dia 6 - Ayudando al Necesitado",
    lecturaRef: "Santiago 2:14-17",
    lecturaTexto: "De que aprovechara si alguno dice que tiene fe, y no tiene obras? Puede la fe salvarle? Si un hermano esta desnudo y tiene necesidad del mantenimiento de cada dia.",
    fraseDelDia: "La fe sin obras esta muerta.",
    fase: "sirve",
    descubre: {
      pregunta: "Que dice Santiago sobre la fe sin obras?",
      opciones: [
        { id: "a", texto: "Es suficiente" },
        { id: "b", texto: "Esta muerta", esCorrecta: true },
        { id: "c", texto: "Es aceptable" }
      ],
      explicacion: "La fe verdadera se demuestra con acciones.",
      versiculoApoyo: "Santiago 2:17"
    },
    conecta: {
      pregunta: "Conoces a alguien en necesidad fisica?",
      opciones: [
        { id: "a", texto: "Si, en mi comunidad" },
        { id: "b", texto: "En mi familia" },
        { id: "c", texto: "No estoy seguro" }
      ]
    },
    camina: {
      desafio: "Ayuda hoy a alguien con una necesidad practica.",
      oracion: "Senor, que mi fe se vea en mis obras. Amen."
    }
  },
  {
    dia: 21, semana: 3,
    titulo: "Dia 7 - El Siervo Fiel",
    lecturaRef: "Mateo 25:21",
    lecturaTexto: "Su senor le dijo: Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondre; entra en el gozo de tu senor.",
    fraseDelDia: "La fidelidad en lo poco trae bendicion.",
    fase: "sirve",
    descubre: {
      pregunta: "Que promete el senor al siervo fiel?",
      opciones: [
        { id: "a", texto: "Mas responsabilidades y gozo", esCorrecta: true },
        { id: "b", texto: "Descanso eterno" },
        { id: "c", texto: "Riquezas" }
      ],
      explicacion: "Dios recompensa la fidelidad con mas bendicion.",
      versiculoApoyo: "Mateo 25:21"
    },
    conecta: {
      pregunta: "En que area puedes ser mas fiel?",
      opciones: [
        { id: "a", texto: "En mi servicio a Dios" },
        { id: "b", texto: "En mi trabajo" },
        { id: "c", texto: "En mi familia" }
      ]
    },
    camina: {
      desafio: "Se fiel en una tarea pequena hoy que normalmente ignoras.",
      oracion: "Senor, hazme fiel en lo poco y en lo mucho. Amen."
    }
  },
  // ============ SEMANA 4: MULTIPLICA ============
  {
    dia: 22, semana: 4,
    titulo: "Dia 1 - Compartiendo la Fe",
    lecturaRef: "Hechos 1:8",
    lecturaTexto: "Pero recibireis poder, cuando haya venido sobre vosotros el Espiritu Santo, y me sereis testigos en Jerusalen, en toda Judea, en Samaria, y hasta lo ultimo de la tierra.",
    fraseDelDia: "Somos testigos de Cristo.",
    fase: "multiplica",
    descubre: {
      pregunta: "Que nos promete Jesus?",
      opciones: [
        { id: "a", texto: "Riquezas" },
        { id: "b", texto: "Poder para ser sus testigos", esCorrecta: true },
        { id: "c", texto: "Una vida sin problemas" }
      ],
      explicacion: "El Espiritu Santo nos da poder para ser testigos.",
      versiculoApoyo: "Hechos 1:8"
    },
    conecta: {
      pregunta: "Te sientes preparado para compartir tu fe?",
      opciones: [
        { id: "a", texto: "Si, lo hago regularmente" },
        { id: "b", texto: "Me gustaria pero me da miedo" },
        { id: "c", texto: "No me siento preparado" }
      ]
    },
    camina: {
      desafio: "Hoy comparte con alguien lo que Dios ha hecho en tu vida.",
      oracion: "Senor, dame valentia para ser tu testigo. Amen."
    }
  },
  {
    dia: 23, semana: 4,
    titulo: "Dia 2 - Haciendo Discipulos",
    lecturaRef: "Mateo 28:19-20",
    lecturaTexto: "Por tanto, id, y haced discipulos de todas las naciones, bautizandolos en el nombre del Padre, y del Hijo, y del Espiritu Santo.",
    fraseDelDia: "La gran comision es hacer discipulos.",
    fase: "multiplica",
    descubre: {
      pregunta: "Que nos manda Jesus?",
      opciones: [
        { id: "a", texto: "Solo ir a la iglesia" },
        { id: "b", texto: "Hacer discipulos de todas las naciones", esCorrecta: true },
        { id: "c", texto: "Estudiar solo" }
      ],
      explicacion: "Jesus nos comisiona a hacer discipulos.",
      versiculoApoyo: "Mateo 28:19"
    },
    conecta: {
      pregunta: "Estas discipulando o siendo discipulado?",
      opciones: [
        { id: "a", texto: "Ambas cosas" },
        { id: "b", texto: "Solo soy discipulado" },
        { id: "c", texto: "Ninguna" }
      ]
    },
    camina: {
      desafio: "Invita a alguien a crecer junto contigo en la fe.",
      oracion: "Senor, usame para hacer discipulos. Amen."
    }
  },
  {
    dia: 24, semana: 4,
    titulo: "Dia 3 - Sembrando la Palabra",
    lecturaRef: "Marcos 4:14",
    lecturaTexto: "El sembrador es el que siembra la palabra. Y estos son los de junto al camino donde la palabra es sembrada.",
    fraseDelDia: "Cada palabra sembrada puede dar fruto.",
    fase: "multiplica",
    descubre: {
      pregunta: "Que representa la semilla en la parabola?",
      opciones: [
        { id: "a", texto: "El dinero" },
        { id: "b", texto: "La palabra de Dios", esCorrecta: true },
        { id: "c", texto: "Las buenas obras" }
      ],
      explicacion: "La semilla es la palabra de Dios que sembramos en otros.",
      versiculoApoyo: "Marcos 4:14"
    },
    conecta: {
      pregunta: "A quien puedes sembrar la palabra hoy?",
      opciones: [
        { id: "a", texto: "Un amigo no creyente" },
        { id: "b", texto: "Un familiar" },
        { id: "c", texto: "Un companero de trabajo" }
      ]
    },
    camina: {
      desafio: "Comparte un versiculo con alguien hoy.",
      oracion: "Senor, usame para sembrar tu palabra. Amen."
    }
  },
  {
    dia: 25, semana: 4,
    titulo: "Dia 4 - Luz del Mundo",
    lecturaRef: "Mateo 5:14-16",
    lecturaTexto: "Vosotros sois la luz del mundo. Una ciudad asentada sobre un monte no se puede esconder. Asi alumbre vuestra luz delante de los hombres.",
    fraseDelDia: "Tu luz debe brillar para otros.",
    fase: "multiplica",
    descubre: {
      pregunta: "Que somos segun Jesus?",
      opciones: [
        { id: "a", texto: "La luz del mundo", esCorrecta: true },
        { id: "b", texto: "Solo seguidores" },
        { id: "c", texto: "Espectadores" }
      ],
      explicacion: "Jesus nos llama a ser luz que alumbra a otros.",
      versiculoApoyo: "Mateo 5:14"
    },
    conecta: {
      pregunta: "Como puedes ser luz en tu entorno?",
      opciones: [
        { id: "a", texto: "Con mis palabras" },
        { id: "b", texto: "Con mis acciones" },
        { id: "c", texto: "Con ambas" }
      ]
    },
    camina: {
      desafio: "Haz algo hoy que refleje la luz de Cristo.",
      oracion: "Senor, que mi luz brille para tu gloria. Amen."
    }
  },
  {
    dia: 26, semana: 4,
    titulo: "Dia 5 - El Poder del Testimonio",
    lecturaRef: "Apocalipsis 12:11",
    lecturaTexto: "Y ellos le han vencido por medio de la sangre del Cordero y de la palabra del testimonio de ellos, y no han amado sus vidas hasta la muerte.",
    fraseDelDia: "Tu testimonio tiene poder.",
    fase: "multiplica",
    descubre: {
      pregunta: "Como vencemos segun este texto?",
      opciones: [
        { id: "a", texto: "Solo con fuerza propia" },
        { id: "b", texto: "Por la sangre del Cordero y el testimonio", esCorrecta: true },
        { id: "c", texto: "Con conocimiento" }
      ],
      explicacion: "Vencemos por Cristo y por compartir nuestro testimonio.",
      versiculoApoyo: "Apocalipsis 12:11"
    },
    conecta: {
      pregunta: "Has compartido tu testimonio alguna vez?",
      opciones: [
        { id: "a", texto: "Si, varias veces" },
        { id: "b", texto: "Una vez" },
        { id: "c", texto: "Nunca, pero quiero" }
      ]
    },
    camina: {
      desafio: "Escribe tu testimonio en 3 parrafos y compartelo.",
      oracion: "Senor, dame valor para compartir mi historia. Amen."
    }
  },
  {
    dia: 27, semana: 4,
    titulo: "Dia 6 - Multiplicando el Amor",
    lecturaRef: "Juan 13:34-35",
    lecturaTexto: "Un mandamiento nuevo os doy: Que os ameis unos a otros; como yo os he amado, que tambien os ameis unos a otros. En esto conoceran todos que sois mis discipulos.",
    fraseDelDia: "El amor multiplica discipulos.",
    fase: "multiplica",
    descubre: {
      pregunta: "Como nos identificaran como discipulos?",
      opciones: [
        { id: "a", texto: "Por nuestra ropa" },
        { id: "b", texto: "Por nuestro amor unos a otros", esCorrecta: true },
        { id: "c", texto: "Por nuestros edificios" }
      ],
      explicacion: "El amor mutuo es la marca del discipulo.",
      versiculoApoyo: "Juan 13:35"
    },
    conecta: {
      pregunta: "Como estas amando a otros como Cristo?",
      opciones: [
        { id: "a", texto: "Sirviendo activamente" },
        { id: "b", texto: "Orando por ellos" },
        { id: "c", texto: "Necesito mejorar" }
      ]
    },
    camina: {
      desafio: "Muestra amor sacrificial a alguien hoy.",
      oracion: "Senor, ayudame a amar como tu amas. Amen."
    }
  },
  {
    dia: 28, semana: 4,
    titulo: "Dia 7 - Perseverando hasta el Fin",
    lecturaRef: "Santiago 1:12",
    lecturaTexto: "Bienaventurado el varon que soporta la tentacion; porque cuando haya resistido la prueba, recibira la corona de vida, que Dios ha prometido a los que le aman.",
    fraseDelDia: "Persevera! La recompensa viene.",
    fase: "multiplica",
    descubre: {
      pregunta: "Que promete Dios a los que perseveran?",
      opciones: [
        { id: "a", texto: "La corona de vida", esCorrecta: true },
        { id: "b", texto: "Dinero y exito" },
        { id: "c", texto: "Una vida sin problemas" }
      ],
      explicacion: "Dios promete la corona de vida a quienes perseveran.",
      versiculoApoyo: "Santiago 1:12"
    },
    conecta: {
      pregunta: "Como te sientes despues de estas 4 semanas?",
      opciones: [
        { id: "a", texto: "Mas cerca de Dios" },
        { id: "b", texto: "Con mas hambre de El" },
        { id: "c", texto: "Motivado a continuar" }
      ]
    },
    camina: {
      desafio: "Unete a un Grupo de Conexion para continuar creciendo.",
      oracion: "Senor, gracias por estas 4 semanas. Ayudame a perseverar. Amen."
    }
  }
];