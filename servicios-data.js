/* =========================================================
   servicios-data.js — AQUÍ EDITAS LOS SERVICIOS de la página Servicios.
   No hace falta tocar ningún HTML: guarda este archivo y listo.

   Cada servicio es un bloque { ... }. Para agregar uno, copia un bloque,
   pégalo debajo con una coma entre bloques y cambia los datos.
   El orden de aquí es el orden en la página.

     id        palabra corta sin espacios ni tildes, ej. "topografia".
               Sirve para los enlaces (servicios.html#topografia).
               Los del pie de página usan: topografia, diseno, construccion, supervision.
     titulo    nombre del servicio
     etiqueta  palabra corta que sale sobre la foto, ej. "Obra"
     resumen   frase corta que se ve en la tarjeta
     chips     2 o 3 palabras clave que se ven en la tarjeta
     detalle   lista completa: se ve al tocar "Ver detalle"
     icono     dibujo que se ve mientras no haya foto. Opciones:
               obra · consultoria · supervision · diseno · estructural ·
               electrica · sanitaria · topografia
     foto      imagen de la tarjeta, ej. "imagen/servicio-obras.jpg"
               (si no existe el archivo, se ve el dibujo del icono)
   ========================================================= */
window.MAYRIS = window.MAYRIS || {};

window.MAYRIS.servicios = [

  {
    id: "construccion",
    titulo: "Ingeniería y ejecución de obras",
    etiqueta: "Obra",
    resumen: "Ejecución de obras civiles, viviendas, edificaciones e infraestructura, con planificación y control de obra.",
    chips: ["Obras civiles", "Viviendas y edificaciones", "Infraestructura"],
    detalle: [
      "Ejecución de obras civiles en general.",
      "Construcción de viviendas, edificaciones e infraestructura.",
      "Obras de infraestructura urbana y rural.",
      "Obras de mejoramiento, ampliación, rehabilitación y mantenimiento.",
      "Obras de concreto, estructuras y cimentaciones.",
      "Desarrollo y ejecución de proyectos de ingeniería.",
      "Planificación y control de obras."
    ],
    icono: "obra",
    foto: "serv/ejecucion.jpeg"
  },

  {
    id: "consultoria",
    titulo: "Consultoría en ingeniería",
    etiqueta: "Consultoría",
    resumen: "Consultoría técnica, expedientes técnicos, estudios, presupuestos e informes para proyectos de infraestructura y construcción.",
    chips: ["Expedientes técnicos", "Presupuestos y metrados", "Informes técnicos"],
    detalle: [
      "Consultoría técnica en ingeniería civil y especialidades complementarias.",
      "Elaboración de expedientes técnicos.",
      "Formulación y desarrollo de proyectos de ingeniería.",
      "Estudios técnicos y documentación de proyectos.",
      "Elaboración de presupuestos, metrados, análisis de costos unitarios y programación de obras.",
      "Asesoramiento técnico en proyectos de infraestructura y construcción.",
      "Elaboración de informes técnicos y documentación especializada."
    ],
    icono: "consultoria",
    foto: "serv/consulta.jpeg"
  },

  {
    id: "supervision",
    titulo: "Supervisión de obras",
    etiqueta: "Control",
    resumen: "Supervisión técnica y control de calidad, avances, valorizaciones y cumplimiento de planos y cronogramas.",
    chips: ["Control de calidad", "Valorizaciones y avances", "Informes de supervisión"],
    detalle: [
      "Supervisión de obras civiles y de edificación.",
      "Supervisión técnica y control de calidad.",
      "Seguimiento y control de ejecución de proyectos.",
      "Verificación de cumplimiento de planos, especificaciones técnicas y documentación contractual.",
      "Control de metrados, valorizaciones y avances físicos.",
      "Elaboración de informes técnicos de supervisión.",
      "Seguimiento de cronogramas y cumplimiento de metas."
    ],
    icono: "supervision",
    foto: "serv/supervicion.jpeg"
  },

  {
    id: "diseno",
    titulo: "Arquitectura y diseño",
    etiqueta: "Arquitectura",
    resumen: "Diseño arquitectónico y planos de viviendas, edificaciones y proyectos residenciales, comerciales e institucionales.",
    chips: ["Planos arquitectónicos", "Distribución de espacios", "Modelamiento gráfico"],
    detalle: [
      "Diseño arquitectónico de viviendas y edificaciones.",
      "Elaboración de planos arquitectónicos.",
      "Diseño, distribución y planificación de espacios.",
      "Modelamiento y representación gráfica de proyectos.",
      "Diseño de proyectos residenciales, comerciales e institucionales.",
      "Desarrollo de propuestas arquitectónicas funcionales y modernas.",
      "Compatibilización de proyectos arquitectónicos con otras especialidades, según alcance."
    ],
    icono: "diseno",
    foto: "serv/arquitec.jpeg"
  },

  {
    id: "estructural",
    titulo: "Ingeniería estructural y civil",
    etiqueta: "Estructuras",
    resumen: "Diseño y análisis estructural, planos y cimentaciones en concreto armado, acero y otros sistemas estructurales.",
    chips: ["Análisis estructural", "Cimentaciones", "Concreto armado y acero"],
    detalle: [
      "Diseño y análisis estructural.",
      "Elaboración de planos estructurales.",
      "Diseño de cimentaciones y elementos estructurales.",
      "Desarrollo de proyectos de concreto armado, acero y otros sistemas estructurales.",
      "Evaluación y asesoramiento técnico en estructuras, según alcance profesional.",
      "Compatibilización de especialidades."
    ],
    icono: "estructural",
    foto: "serv/estructural.jpeg"
  },

  {
    id: "electrica",
    titulo: "Ingeniería eléctrica",
    etiqueta: "Eléctrica",
    resumen: "Diseño de instalaciones eléctricas, iluminación y distribución para viviendas, edificaciones y otros proyectos.",
    chips: ["Planos eléctricos", "Iluminación", "Instalaciones eléctricas"],
    detalle: [
      "Diseño de instalaciones eléctricas interiores y exteriores.",
      "Elaboración de planos eléctricos.",
      "Diseño de sistemas de iluminación y distribución eléctrica.",
      "Desarrollo de proyectos eléctricos para viviendas, edificaciones y otros proyectos.",
      "Asesoramiento y consultoría en instalaciones eléctricas."
    ],
    icono: "electrica",
    foto: "serv/electr.jpeg"
  },

  {
    id: "sanitaria",
    titulo: "Ingeniería sanitaria",
    etiqueta: "Sanitaria",
    resumen: "Diseño de redes de agua potable, desagüe, drenaje y evacuación para edificaciones e infraestructura.",
    chips: ["Agua potable y desagüe", "Drenaje", "Planos sanitarios"],
    detalle: [
      "Diseño de instalaciones sanitarias.",
      "Elaboración de planos sanitarios.",
      "Diseño de redes de agua potable y desagüe.",
      "Diseño de sistemas de drenaje y evacuación.",
      "Desarrollo de proyectos sanitarios para edificaciones y otras infraestructuras.",
      "Asesoramiento técnico en instalaciones sanitarias."
    ],
    icono: "sanitaria",
    foto: "serv/sanitaria.jpeg"
  },

  {
    id: "topografia",
    titulo: "Topografía general",
    etiqueta: "Terreno",
    resumen: "Levantamientos, replanteos, nivelación y georreferenciación con equipos topográficos especializados.",
    chips: ["Levantamientos", "Replanteo de obras", "Planos topográficos"],
    detalle: [
      "Levantamientos topográficos.",
      "Levantamiento topográfico de terrenos urbanos y rurales.",
      "Levantamientos topográficos para proyectos de ingeniería y construcción.",
      "Replanteo de obras, estructuras, lotes y proyectos.",
      "Nivelación topográfica.",
      "Georreferenciación y control de coordenadas.",
      "Levantamiento de perfiles longitudinales y transversales.",
      "Elaboración de planos topográficos.",
      "Cálculo de áreas, perímetros y volúmenes.",
      "Levantamiento de terrenos para proyectos de vivienda, infraestructura, carreteras y obras civiles.",
      "Procesamiento de datos topográficos de campo y gabinete."
    ],
    icono: "topografia",
    foto: "serv/tp.jpeg"
  }

];
