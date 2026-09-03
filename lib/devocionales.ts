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
    lecturaRef: "Jerem�as 29:11-14",
    lecturaTexto: "Porque yo s� los planes que tengo para ustedes, afirma el Se�or. Son planes de bienestar y no de calamidad, para darles un futuro y una esperanza. Entonces me invocar�n y vendr�n a orarme, y yo los escuchar�. Me buscar�n y me encontrar�n, porque me buscar�n de todo coraz�n. Me dejar� encontrar por ustedes, afirma el Se�or, y los har� volver de su cautiverio.",
    fraseDelDia: "Dios tiene planes de bien para ti.",
    descubre: {
      pregunta: "�Qu� dice Dios que debemos hacer para encontrarlo?",
      opciones: [
        { id: "a", texto: "Esperar que Dios nos busque" },
        { id: "b", texto: "Buscarlo de todo coraz�n", esCorrecta: true },
        { id: "c", texto: "Resolver primero nuestros problemas" },
        { id: "d", texto: "Buscarlo solamente cuando lo necesitamos" },
      ],
      explicacion: "El texto no promete que Dios aparezca por inercia; invita a una b�squeda entera, no a medias.",
      versiculoApoyo: "Jerem�as 29:13",
    },
    conecta: {
      pregunta: "�C�mo est� tu b�squeda de Dios �ltimamente?",
      opciones: [
        { id: "a", texto: "Lo busco principalmente cuando tengo problemas" },
        { id: "b", texto: "Quiero acercarme m�s, pero me cuesta ser constante" },
        { id: "c", texto: "Estoy buscando a Dios con mayor intenci�n" },
        { id: "d", texto: "Siento que necesito volver a empezar" },
      ],
    },
    camina: {
      desafio: "Aparta 10 minutos hoy para estar a solas con Dios, sin celular, y h�blale sinceramente.",
      oracion: "Se�or, hoy quiero buscarte de todo coraz�n. Ay�dame a no conformarme con buscarte a medias. Am�n.",
    },
  },
  {
    dia: 2,
    titulo: "Ponlo primero",
    tema: "Prioridades",
    fase: 'conecta',
    lecturaRef: "Mateo 6:33",
    lecturaTexto: "Busquen primero el reino de Dios y su justicia, y todas estas cosas les ser�n a�adidas.",
    fraseDelDia: "Cuando Dios es primero, todo lo dem�s encuentra su lugar.",
    descubre: {
      pregunta: "�Qu� promete Jes�s si ponemos a Dios primero?",
      opciones: [
        { id: "a", texto: "Que seremos ricos" },
        { id: "b", texto: "Que no tendremos problemas" },
        { id: "c", texto: "Que todas las cosas necesarias nos ser�n a�adidas", esCorrecta: true },
        { id: "d", texto: "Que seremos famosos" },
      ],
      explicacion: "Jes�s no promete riqueza ni ausencia de problemas, sino que lo necesario vendr� cuando �l es la prioridad.",
      versiculoApoyo: "Mateo 6:33",
    },
    conecta: {
      pregunta: "�Qu� ocupa el primer lugar en tu vida hoy?",
      opciones: [
        { id: "a", texto: "El trabajo o los estudios" },
        { id: "b", texto: "Mis relaciones personales" },
        { id: "c", texto: "Mis preocupaciones y problemas" },
        { id: "d", texto: "Dios y su reino" },
      ],
    },
    camina: {
      desafio: "Hoy, antes de revisar el celular al despertar, dedica 5 minutos a orar y poner a Dios primero.",
      oracion: "Se�or, hoy te pongo en el primer lugar. Ordena mis prioridades seg�n tu voluntad. Am�n.",
    },
  },
  {
    dia: 3,
    titulo: "Permanece",
    tema: "Permanecer en Cristo",
    fase: 'crece',
    lecturaRef: "Juan 15:4-5",
    lecturaTexto: "Permanezcan en m�, y yo permanecer� en ustedes. As� como la rama no puede dar fruto por s� misma, sino que permanece en la vid, tampoco ustedes pueden dar fruto si no permanecen en m�. Yo soy la vid; ustedes son las ramas. El que permanece en m�, y yo en �l, dar� mucho fruto, porque separados de m� nada pueden hacer.",
    fraseDelDia: "Separados de �l nada podemos hacer.",
    descubre: {
      pregunta: "�Qu� dice Jes�s que pasa si no permanecemos en �l?",
      opciones: [
        { id: "a", texto: "Que seremos libres" },
        { id: "b", texto: "Que nada podemos hacer", esCorrecta: true },
        { id: "c", texto: "Que tendremos m�s oportunidades" },
        { id: "d", texto: "Que seremos m�s fuertes" },
      ],
      explicacion: "Jes�s es claro: sin conexi�n con �l, no podemos dar fruto verdadero.",
      versiculoApoyo: "Juan 15:5",
    },
    conecta: {
      pregunta: "�C�mo est� tu conexi�n con Jes�s hoy?",
      opciones: [
        { id: "a", texto: "Me siento muy conectado y cerca de �l" },
        { id: "b", texto: "A veces me alejo, pero vuelvo" },
        { id: "c", texto: "Siento que me he desconectado" },
        { id: "d", texto: "Quiero reconectarme hoy" },
      ],
    },
    camina: {
      desafio: "Hoy, en cada decisi�n que tomes, preg�ntate: �Qu� har�a Jes�s aqu�?",
      oracion: "Se�or Jes�s, hoy quiero permanecer en ti. Sin ti nada puedo hacer. Am�n.",
    },
  },
  {
    dia: 4,
    titulo: "Escucha",
    tema: "Escuchar la voz de Dios",
    fase: 'crece',
    lecturaRef: "1 Reyes 19:11-13",
    lecturaTexto: "El Se�or le dijo: Sal y ponte en el monte delante del Se�or. Y he aqu� que el Se�or pasaba, y un grande y poderoso viento que romp�a los montes y quebraba las pe�as delante del Se�or; pero el Se�or no estaba en el viento. Y tras el viento un terremoto; pero el Se�or no estaba en el terremoto. Y tras el terremoto un fuego; pero el Se�or no estaba en el fuego. Y tras el fuego un silbo apacible y delicado.",
    fraseDelDia: "Dios habla en el silencio.",
    descubre: {
      pregunta: "�D�nde estaba la presencia de Dios?",
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
      pregunta: "�Cu�ndo fue la �ltima vez que te detuviste a escuchar a Dios en silencio?",
      opciones: [
        { id: "a", texto: "Hoy mismo" },
        { id: "b", texto: "Esta semana" },
        { id: "c", texto: "Hace tiempo, necesito volver a hacerlo" },
        { id: "d", texto: "No recuerdo haberlo hecho" },
      ],
    },
    camina: {
      desafio: "Hoy busca 5 minutos de silencio total. Apaga todo ruido y simplemente escucha.",
      oracion: "Se�or, afina mis o�dos para escuchar tu voz suave. Ay�dame a hacer silencio para ti. Am�n.",
    },
  },
  {
    dia: 5,
    titulo: "Alim�ntate de la Palabra",
    tema: "La Biblia como alimento",
    fase: 'crece',
    lecturaRef: "Salmo 1:1-3",
    lecturaTexto: "Bienaventurado el var�n que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado; sino que en la ley del Se�or est� su delicia, y en su ley medita de d�a y de noche. Ser� como �rbol plantado junto a corrientes de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperar�.",
    fraseDelDia: "La Palabra de Dios es alimento para el alma.",
    descubre: {
      pregunta: "�Qu� pasa con la persona que medita en la Palabra d�a y noche?",
      opciones: [
        { id: "a", texto: "Se vuelve religioso" },
        { id: "b", texto: "Ser� como �rbol plantado junto a aguas que da fruto", esCorrecta: true },
        { id: "c", texto: "Tendr� mucho dinero" },
        { id: "d", texto: "Nunca tendr� problemas" },
      ],
      explicacion: "La Palabra nos da vida, estabilidad y fruto. No es una regla, es alimento.",
      versiculoApoyo: "Salmo 1:3",
    },
    conecta: {
      pregunta: "�Con qu� frecuencia lees la Biblia?",
      opciones: [
        { id: "a", texto: "Todos los d�as" },
        { id: "b", texto: "Algunas veces por semana" },
        { id: "c", texto: "Muy poco, casi nunca" },
        { id: "d", texto: "Quiero empezar a leerla m�s" },
      ],
    },
    camina: {
      desafio: "Hoy lee un cap�tulo completo de la Biblia. Empieza por el Evangelio de Juan, cap�tulo 1.",
      oracion: "Se�or, hoy quiero alimentarme de tu Palabra. Que sea l�mpara a mis pies. Am�n.",
    },
  },
  {
    dia: 6,
    titulo: "Habla con Dios",
    tema: "La oraci�n",
    fase: 'multiplica',
    lecturaRef: "Filipenses 4:6-7",
    lecturaTexto: "Por nada est�is afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oraci�n y ruego, con acci�n de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardar� vuestros corazones y vuestros pensamientos en Cristo Jes�s.",
    fraseDelDia: "La oraci�n transforma la ansiedad en paz.",
    descubre: {
      pregunta: "�Qu� reemplaza la oraci�n con acci�n de gracias?",
      opciones: [
        { id: "a", texto: "La tristeza" },
        { id: "b", texto: "El af�n y la ansiedad", esCorrecta: true },
        { id: "c", texto: "El aburrimiento" },
        { id: "d", texto: "El cansancio" },
      ],
      explicacion: "Pablo no dice que los problemas desaparezcan, sino que la paz de Dios guardar� nuestro coraz�n.",
      versiculoApoyo: "Filipenses 4:7",
    },
    conecta: {
      pregunta: "�Qu� te quita la paz hoy?",
      opciones: [
        { id: "a", texto: "Mis finanzas" },
        { id: "b", texto: "Mis relaciones" },
        { id: "c", texto: "Mi salud o la de alguien cercano" },
        { id: "d", texto: "Mi futuro incierto" },
      ],
    },
    camina: {
      desafio: "Hoy escribe en un papel 3 cosas que te preocupan y entr�galas a Dios en oraci�n.",
      oracion: "Padre, hoy te entrego mis preocupaciones. Recibo tu paz que sobrepasa todo entendimiento. Am�n.",
    },
  },
  {
    dia: 7,
    titulo: "Ten hambre y comparte",
    tema: "Hambre espiritual y multiplicaci�n",
    fase: 'multiplica',
    lecturaRef: "Mateo 5:6",
    lecturaTexto: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos ser�n saciados.",
    fraseDelDia: "El que tiene hambre de Dios, ser� saciado y podr� compartir.",
    descubre: {
      pregunta: "�Qu� promete Jes�s a los que tienen hambre y sed de justicia?",
      opciones: [
        { id: "a", texto: "Que ser�n ricos" },
        { id: "b", texto: "Que ser�n saciados", esCorrecta: true },
        { id: "c", texto: "Que ser�n famosos" },
        { id: "d", texto: "Que no tendr�n hambre nunca m�s" },
      ],
      explicacion: "Jes�s promete saciedad espiritual a quienes buscan a Dios con hambre genuina.",
      versiculoApoyo: "Mateo 5:6",
    },
    conecta: {
      pregunta: "�Tienes hambre de Dios hoy?",
      opciones: [
        { id: "a", texto: "S�, tengo un deseo profundo de m�s de �l" },
        { id: "b", texto: "A veces, pero me distraigo f�cil" },
        { id: "c", texto: "Me siento satisfecho con lo poco que hago" },
        { id: "d", texto: "Quiero que Dios me d� hambre de �l" },
      ],
    },
    camina: {
      desafio: "Hoy comparte esta experiencia con alguien que necesite acercarse a Dios. Env�ale el link.",
      oracion: "Se�or, dame hambre de ti. Que mi alma tenga sed de tu presencia cada d�a. Am�n.",
    },
  },
  {
    dia: 8,
    titulo: "D�a 8 - Profundizando en la Oraci�n",
    lecturaRef: "Mateo 6:5-15",
    lecturaTexto: "Y cuando ores, no seas como los hip�critas; porque ellos gustan de orar de pie en las sinagogas y en las esquinas de las calles, para ser vistos de los hombres. De cierto os digo que ya tienen su recompensa. Mas t�, cuando ores, entra en tu aposento, y cerrada la puerta, ora a tu Padre que est� en secreto; y tu Padre que ve en lo secreto te recompensar� en p�blico.",
    fraseDelDia: "La oraci�n es la respiraci�n del alma",
    fase: "crece",
  tema: "oracion",
    descubre: {
      pregunta: "�Qu� nos ense�a Jes�s sobre c�mo orar?",
      opciones: [
        { id: "a", texto: "Orar en p�blico para ser vistos", esCorrecta: false },
        { id: "b", texto: "Orar en privado con sinceridad", esCorrecta: true },
        { id: "c", texto: "Orar muchas palabras", esCorrecta: false }
      ],
      explicacion: "Jes�s nos ense�a que la oraci�n debe ser sincera y desde el coraz�n, no para impresionar a otros.",
      versiculoApoyo: "Mateo 6:6"
    },
    conecta: {
      pregunta: "�C�mo es tu vida de oraci�n actualmente?",
      opciones: [
        { id: "a", texto: "Oro todos los d�as" },
        { id: "b", texto: "Oro de vez en cuando" },
        { id: "c", texto: "Casi no oro" }
      ]
    },
    camina: {
      desafio: "Hoy dedica 10 minutos a orar en privado, sin distracciones.",
      oracion: "Se�or, ens��ame a orar con un coraz�n sincero. Am�n."
    }
  },
  {
    dia: 9,
    titulo: "D�a 9 - El Poder de la Palabra",
    lecturaRef: "Juan 1:1-5",
    lecturaTexto: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. Este era en el principio con Dios. Todas las cosas por �l fueron hechas, y sin �l nada de lo que ha sido hecho, fue hecho. En �l estaba la vida, y la vida era la luz de los hombres. La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella.",
    fraseDelDia: "La Palabra de Dios es viva y eficaz",
    fase: "crece",
  tema: "palabra",
    descubre: {
      pregunta: "�Qu� dice el texto sobre el Verbo (la Palabra)?",
      opciones: [
        { id: "a", texto: "Era solo un profeta", esCorrecta: false },
        { id: "b", texto: "Era Dios y estaba con Dios", esCorrecta: true },
        { id: "c", texto: "Fue creado al principio", esCorrecta: false }
      ],
      explicacion: "Jes�s (el Verbo) exist�a desde el principio y es Dios mismo hecho carne.",
      versiculoApoyo: "Juan 1:1"
    },
    conecta: {
      pregunta: "�Qu� lugar ocupa la Biblia en tu vida diaria?",
      opciones: [
        { id: "a", texto: "La leo todos los d�as" },
        { id: "b", texto: "La leo de vez en cuando" },
        { id: "c", texto: "Casi no la leo" }
      ]
    },
    camina: {
      desafio: "Lee un cap�tulo del Evangelio de Juan hoy y medita en �l.",
      oracion: "Se�or, que tu Palabra sea l�mpara a mis pies. Am�n."
    }
  },
  {
    dia: 10,
    titulo: "D�a 10 - Sirviendo con Amor",
    lecturaRef: "G�latas 5:13-14",
    lecturaTexto: "Porque vosotros, hermanos, a libertad fuisteis llamados; solamente que no us�is la libertad como ocasi�n para la carne, sino serv�os por amor los unos a los otros. Porque toda la ley en esta sola palabra se cumple: Amar�s a tu pr�jimo como a ti mismo.",
    fraseDelDia: "Servir es la forma m�s alta de amor",
    fase: "crece",
  tema: "servicio",
    descubre: {
      pregunta: "�Para qu� debemos usar nuestra libertad en Cristo?",
      opciones: [
        { id: "a", texto: "Para hacer lo que queramos", esCorrecta: false },
        { id: "b", texto: "Para servirnos por amor", esCorrecta: true },
        { id: "c", texto: "Para no seguir reglas", esCorrecta: false }
      ],
      explicacion: "La verdadera libertad cristiana se expresa sirviendo a otros con amor.",
      versiculoApoyo: "G�latas 5:13"
    },
    conecta: {
      pregunta: "�C�mo est�s sirviendo a otros actualmente?",
      opciones: [
        { id: "a", texto: "Sirvo activamente en mi iglesia" },
        { id: "b", texto: "Ayudo cuando puedo" },
        { id: "c", texto: "No estoy sirviendo" }
      ]
    },
    camina: {
      desafio: "Hoy haz un acto de servicio inesperado para alguien.",
      oracion: "Se�or, mu�strame c�mo servir a otros con tu amor. Am�n."
    }
  },
  {
    dia: 11,
    titulo: "D�a 11 - Fruto del Esp�ritu",
    lecturaRef: "G�latas 5:22-23",
    lecturaTexto: "Mas el fruto del Esp�ritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.",
    fraseDelDia: "El Esp�ritu produce fruto en nosotros",
    fase: "crece",
  tema: "fruto",
    descubre: {
      pregunta: "�Cu�ntos frutos del Esp�ritu se mencionan?",
      opciones: [
        { id: "a", texto: "Tres", esCorrecta: false },
        { id: "b", texto: "Nueve", esCorrecta: true },
        { id: "c", texto: "Doce", esCorrecta: false }
      ],
      explicacion: "El Esp�ritu Santo produce 9 frutos en nuestra vida: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.",
      versiculoApoyo: "G�latas 5:22-23"
    },
    conecta: {
      pregunta: "�Qu� fruto del Esp�ritu necesitas desarrollar m�s?",
      opciones: [
        { id: "a", texto: "Paciencia o paz" },
        { id: "b", texto: "Amor o gozo" },
        { id: "c", texto: "Dominio propio o mansedumbre" }
      ]
    },
    camina: {
      desafio: "Elige un fruto del Esp�ritu y pract�calo intencionalmente hoy.",
      oracion: "Esp�ritu Santo, produce tu fruto en mi vida. Am�n."
    }
  },
  {
    dia: 12,
    titulo: "D�a 12 - Compartiendo la Fe",
    lecturaRef: "Hechos 1:8",
    lecturaTexto: "Pero recibir�is poder, cuando haya venido sobre vosotros el Esp�ritu Santo, y me ser�is testigos en Jerusal�n, en toda Judea, en Samaria, y hasta lo �ltimo de la tierra.",
    fraseDelDia: "Somos testigos de Cristo",
    fase: "multiplica",
  tema: "testimonio",
    descubre: {
      pregunta: "�Qu� nos promete Jes�s en este vers�culo?",
      opciones: [
        { id: "a", texto: "Riquezas y prosperidad", esCorrecta: false },
        { id: "b", texto: "Poder para ser sus testigos", esCorrecta: true },
        { id: "c", texto: "Una vida sin problemas", esCorrecta: false }
      ],
      explicacion: "El Esp�ritu Santo nos da poder para ser testigos de Jes�s y compartir el evangelio.",
      versiculoApoyo: "Hechos 1:8"
    },
    conecta: {
      pregunta: "�Te sientes preparado para compartir tu fe?",
      opciones: [
        { id: "a", texto: "S�, lo hago regularmente" },
        { id: "b", texto: "Me gustar�a pero me da miedo" },
        { id: "c", texto: "No me siento preparado" }
      ]
    },
    camina: {
      desafio: "Hoy comparte con alguien lo que Dios ha hecho en tu vida.",
      oracion: "Se�or, dame valent�a para ser tu testigo. Am�n."
    }
  },
  {
    dia: 13,
    titulo: "D�a 13 - Haciendo Disc�pulos",
    lecturaRef: "Mateo 28:18-20",
    lecturaTexto: "Y Jes�s se acerc� y les habl� diciendo: Toda potestad me es dada en el cielo y en la tierra. Por tanto, id, y haced disc�pulos de todas las naciones, bautiz�ndolos en el nombre del Padre, y del Hijo, y del Esp�ritu Santo; ense��ndoles que guarden todas las cosas que os he mandado; y he aqu� yo estoy con vosotros todos los d�as, hasta el fin del mundo. Am�n.",
    fraseDelDia: "La gran comisi�n es hacer disc�pulos",
    fase: "multiplica",
  tema: "discipulado",
    descubre: {
      pregunta: "�Qu� nos manda Jes�s en este texto?",
      opciones: [
        { id: "a", texto: "Solo ir a la iglesia", esCorrecta: false },
        { id: "b", texto: "Hacer disc�pulos de todas las naciones", esCorrecta: true },
        { id: "c", texto: "Estudiar la Biblia solo", esCorrecta: false }
      ],
      explicacion: "Jes�s nos comisiona a hacer disc�pulos, no solo convertidos. Disc�pulos que obedezcan sus ense�anzas.",
      versiculoApoyo: "Mateo 28:19"
    },
    conecta: {
      pregunta: "�Est�s discipulando a alguien o siendo discipulado?",
      opciones: [
        { id: "a", texto: "Ambas cosas" },
        { id: "b", texto: "Solo soy discipulado" },
        { id: "c", texto: "Ninguna de las dos" }
      ]
    },
    camina: {
      desafio: "Invita a alguien a crecer junto contigo en la fe.",
      oracion: "Se�or, �same para hacer disc�pulos. Am�n."
    }
  },
  {
    dia: 14,
    titulo: "D�a 14 - Perseverando hasta el Fin",
    lecturaRef: "Santiago 1:12",
    lecturaTexto: "Bienaventurado el var�n que soporta la tentaci�n; porque cuando haya resistido la prueba, recibir� la corona de vida, que Dios ha prometido a los que le aman.",
    fraseDelDia: "�Persevera! La recompensa viene",
    fase: "multiplica",
  tema: "perseverancia",
    descubre: {
      pregunta: "�Qu� promete Dios a los que perseveran?",
      opciones: [
        { id: "a", texto: "La corona de vida", esCorrecta: true },
        { id: "b", texto: "Dinero y �xito", esCorrecta: false },
        { id: "c", texto: "Una vida sin problemas", esCorrecta: false }
      ],
      explicacion: "Dios promete la corona de vida (vida eterna) a quienes perseveran en la fe y le aman.",
      versiculoApoyo: "Santiago 1:12"
    },
    conecta: {
      pregunta: "�C�mo te sientes despu�s de estos 14 d�as?",
      opciones: [
        { id: "a", texto: "M�s cerca de Dios" },
        { id: "b", texto: "Con m�s hambre de �l" },
        { id: "c", texto: "Motivado a continuar" }
      ]
    },
    camina: {
      desafio: "�nete a un Grupo de Conexi�n para continuar creciendo.",
      oracion: "Se�or, gracias por estos 14 d�as. Ay�dame a perseverar. Am�n."
    }
  },
];
