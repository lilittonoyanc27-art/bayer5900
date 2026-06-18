export interface Option {
  key: "a" | "b" | "c";
  text: string;
  translation: string;
}

export interface Question {
  id: number;
  question: string;
  questionArmenian: string;
  options: Option[];
}

export const spanishQuestions: Question[] = [
  {
    id: 1,
    question: "¿Qué haces normalmente después de las clases?",
    questionArmenian: "Ի՞նչ ես սովորաբար անում դասերից հետո։",
    options: [
      { key: "a", text: "Hago los deberes.", translation: "Տնայիններս եմ անում։" },
      { key: "b", text: "Juego con mis amigos.", translation: "Խաղում եմ ընկերներիս հետ։" },
      { key: "c", text: "Descanso en casa.", translation: "Հանգստանում եմ տանը։" }
    ]
  },
  {
    id: 2,
    question: "¿Qué has hecho esta semana?",
    questionArmenian: "Ի՞նչ ես արել այս շաբաթ։",
    options: [
      { key: "a", text: "He estudiado español.", translation: "Իսպաներեն եմ սովորել։" },
      { key: "b", text: "He visto una película.", translation: "Ֆիլմ եմ դիտել։" },
      { key: "c", text: "He ayudado a mi familia.", translation: "Օգնել եմ ընտանիքիս։" }
    ]
  },
  {
    id: 3,
    question: "¿A dónde fuiste el verano pasado?",
    questionArmenian: "Ո՞ւր ես գնացել անցյալ ամռանը։",
    options: [
      { key: "a", text: "Fui al mar.", translation: "Գնացել եմ ծով։" },
      { key: "b", text: "Fui al pueblo.", translation: "Գնացել եմ գյուղ։" },
      { key: "c", text: "Fui a otra ciudad.", translation: "Գնացել եմ ուրիշ քաղաք։" }
    ]
  },
  {
    id: 4,
    question: "¿Qué comiste ayer?",
    questionArmenian: "Ի՞նչ ես կերել երեկ։",
    options: [
      { key: "a", text: "Comí pasta.", translation: "Մակարոն եմ կերել։" },
      { key: "b", text: "Comí pollo con arroz.", translation: "Հավ եմ կերել բրնձով։" },
      { key: "c", text: "Comí una ensalada.", translation: "Աղցան եմ կերել։" }
    ]
  },
  {
    id: 5,
    question: "¿Qué hacías cuando eras pequeño/a?",
    questionArmenian: "Ի՞նչ էիր անում, երբ փոքր էիր։",
    options: [
      { key: "a", text: "Jugaba mucho.", translation: "Շատ էի խաղում։" },
      { key: "b", text: "Dibujaba todos los días.", translation: "Ամեն օր նկարում էի։" },
      { key: "c", text: "Veía dibujos animados.", translation: "Մուլտֆիլմեր էի դիտում։" }
    ]
  },
  {
    id: 6,
    question: "¿Cuál es tu pasatiempo favorito?",
    questionArmenian: "Ո՞րն է քո սիրելի զբաղմունքը։",
    options: [
      { key: "a", text: "Leer libros de aventuras.", translation: "Արկածային գրքեր կարդալը։" },
      { key: "b", text: "Escuchar música pop.", translation: "Փոփ երաժշտություն լսելը։" },
      { key: "c", text: "Cocinar platos nuevos.", translation: "Նոր ուտեստներ պատրաստելը։" }
    ]
  },
  {
    id: 7,
    question: "¿Cómo es tu rutina de la mañana?",
    questionArmenian: "Ինչպիսի՞ն է քո առավոտյան առօրյան։",
    options: [
      { key: "a", text: "Me levanto temprano y tomo café.", translation: "Վաղ եմ արթնանում և սուրճ խմում։" },
      { key: "b", text: "Hago ejercicio por media hora.", translation: "Կես ժամ մարզվում եմ։" },
      { key: "c", text: "Me ducho y salgo corriendo.", translation: "Ցնցուղ եմ ընդունում և շտապ դուրս գալիս։" }
    ]
  },
  {
    id: 8,
    question: "¿Qué planes tienes para el fin de semana?",
    questionArmenian: "Ի՞նչ պլաններ ունես հանգստյան օրերի համար։",
    options: [
      { key: "a", text: "Voy a ir al cine con amigos.", translation: "Ընկերներիս հետ կինո եմ գնալու։" },
      { key: "b", text: "Voy a visitar a mis abuelos.", translation: "Այցելելու եմ տատիկիս ու պապիկիս։" },
      { key: "c", text: "Me quedaré en la cama todo el día.", translation: "Ամբողջ օրը անկողնում եմ մնալու։" }
    ]
  },
  {
    id: 9,
    question: "¿Por qué quieres aprender español?",
    questionArmenian: "Ինչո՞ւ ես ուզում իսպաներեն սովորել։",
    options: [
      { key: "a", text: "Porque me encanta viajar.", translation: "Որովհետև սիրում եմ ճանապարհորդել։" },
      { key: "b", text: "Para entender las canciones españolas.", translation: "Իսպանական երգերը հասկանալու համար։" },
      { key: "c", text: "Por mi trabajo y estudios.", translation: "Աշխատանքիս և ուսմանս համար։" }
    ]
  },
  {
    id: 10,
    question: "¿Cómo es el clima en tu ciudad hoy?",
    questionArmenian: "Ինչպիսի՞ն է եղանակը քո քաղաքում այսօր։",
    options: [
      { key: "a", text: "Hace mucho sol y calor.", translation: "Շատ արևոտ է և շոգ։" },
      { key: "b", text: "Está nublado y hace frío.", translation: "Ամպամած է և ցուրտ։" },
      { key: "c", text: "Está lloviendo sin parar.", translation: "Անդադար անձրևում է։" }
    ]
  },
  {
    id: 11,
    question: "¿Qué vas a cenar hoy?",
    questionArmenian: "Ի՞նչ ես ընթրելու այսօր։",
    options: [
      { key: "a", text: "Un trozo de pizza deliciosa.", translation: "Մեկ կտոր համեղ պիցցա։" },
      { key: "b", text: "Sopa caliente de verduras.", translation: "Տաք բանջարեղենային ապուր։" },
      { key: "c", text: "Solo un té con galletas.", translation: "Ընդամենը թեյ՝ թխվածքաբլիթով։" }
    ]
  },
  {
    id: 12,
    question: "¿Cuál es tu película favorita?",
    questionArmenian: "Ո՞րն է քո սիրելի ֆիլմը։",
    options: [
      { key: "a", text: "Una película de acción emocionante.", translation: "Հետաքրքիր մարտաֆիլմ։" },
      { key: "b", text: "Una comedia muy divertida.", translation: "Շատ զվարճալի կատակերգություն։" },
      { key: "c", text: "Un drama romántico profundo.", translation: "Խորը ռոմանտիկ դրամա։" }
    ]
  },
  {
    id: 13,
    question: "¿Cómo celebras tu cumpleaños?",
    questionArmenian: "Ինչպե՞ս ես նշում ծննդյանդ օրը։",
    options: [
      { key: "a", text: "Hago una gran fiesta en casa.", translation: "Մեծ հավաքույթ եմ անում տանը։" },
      { key: "b", text: "Salgo a cenar con mi pareja.", translation: "Սիրելիիս հետ գնում եմ ընթրելու։" },
      { key: "c", text: "No suelo celebrar mi cumpleaños.", translation: "Սովորաբար չեմ նշում ծնունդս։" }
    ]
  },
  {
    id: 14,
    question: "¿Dónde te gustaría vivir en el futuro?",
    questionArmenian: "Որտե՞ղ կցանկանայիր ապրել ապագայում։",
    options: [
      { key: "a", text: "En una casa de campo tranquila.", translation: "Խաղաղ գյուղական տանը։" },
      { key: "b", text: "En un apartamento moderno en el centro.", translation: "Կենտրոնում գտնվող ժամանակակից բնակարանում։" },
      { key: "c", text: "Cerca de la playa bajo el sol.", translation: "Ափի մոտ՝ արևի տակ։" }
    ]
  },
  {
    id: 15,
    question: "¿Qué música escuchas cuando estás triste?",
    questionArmenian: "Ի՞նչ երաժշտություն ես լսում, երբ տխուր ես։",
    options: [
      { key: "a", text: "Música clásica e instrumental.", translation: "Դասական և գործիքային երաժշտություն։" },
      { key: "b", text: "Canciones tristes y melancólicas.", translation: "Տխուր և մելանխոլիկ երգեր։" },
      { key: "c", text: "Música alegre para animarme.", translation: "Ուրախ երաժշտություն՝ տրամադրությունս բարձրացնելու համար։" }
    ]
  },
  {
    id: 16,
    question: "¿Prefieres el té o el café?",
    questionArmenian: "Թե՞յ ես նախընտրում, թե՞ սուրճ։",
    options: [
      { key: "a", text: "Prefiero el té verde con limón.", translation: "Նախընտրում եմ կանաչ թեյ լիմոնով։" },
      { key: "b", text: "Prefiero el café bien cargado por la mañana.", translation: "Առավոտյան նախընտրում եմ թունդ սուրճ։" },
      { key: "c", text: "Me gustan ambos por igual.", translation: "Երկուսն էլ հավասարապես սիրում եմ։" }
    ]
  },
  {
    id: 17,
    question: "¿Qué hiciste el fin de semana pasado?",
    questionArmenian: "Ի՞նչ արեցիր անցյալ հանգստյան օրերին։",
    options: [
      { key: "a", text: "Fui de compras al centro comercial.", translation: "Գնումների գնացի առևտրի կենտրոն։" },
      { key: "b", text: "Limpié toda la casa y lavé la ropa.", translation: "Մաքրեցի ամբողջ տունը և լվացք արեցի։" },
      { key: "c", text: "Leí un libro muy interesante en mi cama.", translation: "Անկողնումս շատ հետաքրքիր գիրք կարդացի։" }
    ]
  },
  {
    id: 18,
    question: "¿Cómo viajas normalmente al trabajo o escuela?",
    questionArmenian: "Ինչպե՞ս ես սովորաբար գնում աշխատանքի կամ դպրոց։",
    options: [
      { key: "a", text: "Voy en metro o autobús público.", translation: "Գնում եմ մետրոյով կամ հասարակական ավտոբուսով։" },
      { key: "b", text: "Conduzco mi propio coche.", translation: "Վարում եմ իմ սեփական մեքենան։" },
      { key: "c", text: "Voy andando porque vivo muy cerca.", translation: "Ոտքով եմ գնում, որովհետև շատ մոտ եմ ապրում։" }
    ]
  },
  {
    id: 19,
    question: "¿Qué mascota te gustaría tener?",
    questionArmenian: "Ի՞նչ ընտանի կենդանի կցանկանայիր ունենալ։",
    options: [
      { key: "a", text: "Me gustaría tener un perro juguetón.", translation: "Կցանկանայի ունենալ խաղասեր շուն։" },
      { key: "b", text: "Preferiría un gato independiente.", translation: "Կնախընտրեի անկախ կատու։" },
      { key: "c", text: "No quiero tener mascotas en casa.", translation: "Չեմ ուզում տանը ընտանի կենդանիներ պահել։" }
    ]
  },
  {
    id: 20,
    question: "¿Cuál es tu estación del año favorita y por qué?",
    questionArmenian: "Ո՞րն է քո սիրելի եղանակը և ինչո՞ւ։",
    options: [
      { key: "a", text: "La primavera por las flores hermosas.", translation: "Գարունը՝ գեղեցիկ ծաղիկների պատճառով։" },
      { key: "b", text: "El verano porque voy de vacaciones.", translation: "Ամառը՝ որովհետև արձակուրդ եմ գնում։" },
      { key: "c", text: "El otoño por los colores de las hojas.", translation: "Աշունը՝ տերևների գույների պատճառով։" }
    ]
  }
];
