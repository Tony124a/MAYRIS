/* =========================================================
   data.js — AQUÍ AGREGAS PROYECTOS Y PERSONAL.
   No hace falta tocar ningún HTML: guarda este archivo y listo.

   ---------- PROYECTOS ----------
   Copia un bloque { ... }, pégalo debajo del anterior
   (con una coma entre bloques) y cambia los datos.

     titulo       nombre del proyecto
     lugar        ciudad o distrito
     anio         año de ejecución
     categoria    "Vivienda", "Obra civil", "Topografía", "Supervisión"...
                  (los filtros de la página se crean solos con estas palabras)
     servicios    lo que hicimos: ["Diseño", "Construcción"]  (puede ir vacío: [])
     descripcion  texto corto sobre la obra (opcional, puede ir vacío: "")
     foto         imagen principal, ej. "proyectos/casa-norte.jpg"
     fotos        más fotos para la galería, ej. ["proyectos/casa-norte-2.jpg"]  (opcional)

   Los proyectos más nuevos van ARRIBA.

   ---------- EQUIPO ----------
     nombre       nombre completo
     cargo        ej. "Ingeniero civil", "Topógrafo", "Maestro de obra"
     grupo        título de la sección donde aparece, ej. "Ingenieros",
                  "Equipo de campo", "Colaboradores"  (se agrupan solos)
     colegiado    true si está colegiado en el CIP, si no false
     foto         ruta de la foto (opcional). Sin foto se muestra su inicial.
     detalle      frase corta opcional, ej. "Especialista en estructuras"
   ========================================================= */
window.MAYRIS = {

  proyectos: [
    {
      titulo: "PLANO DE LOCALIZACION Y UBICACION",
      lugar: "Sicuani",
      anio: "2026",
      categoria: "TOPOGRAFIA",
      servicios: [],
      descripcion: "Plano catastral - SUNARP",
      foto: "proyectos/proyec1.jpg",
      fotos: [""],
      enlace: "https://www.facebook.com/share/p/1LsaJgUdjn/",
      enlaceTexto: "mirame"
    },
    {
      titulo: "PLANO DE ESTRUCTURA",
      lugar: "Sicuani",
      anio: "2026",
      categoria: "ESTRUCTURAS",
      servicios: [],
      descripcion: "Vivineda familiar",
      foto: "proyectos/p2_1.jpg",
      fotos: ["proyectos/p2_2.jpg"],
      enlace: "https://www.facebook.com/share/p/1E2qEkAxKB/",
      enlaceTexto: "mirame"
    }

    /* Plantilla para el siguiente proyecto (copia el bloque fuera del comentario y recuerda la coma):
    ,{
      titulo: "Nombre del proyecto",
      lugar: "Ciudad",
      anio: "2026",
      categoria: "Obra civil",
      servicios: ["Diseño", "Construcción"],
      descripcion: "Texto corto sobre la obra.",
      foto: "proyectos/mi-foto.jpg",
      fotos: ["proyectos/mi-foto-2.jpg", "proyectos/mi-foto-3.jpg"]
    }
    */
  ],

  equipo: [
    {
      nombre: "Edwin Jhon ",
      cargo: "Ingeniero ",
      grupo: "Ingenieros",
      colegiado: true,
      foto: "icons/FOTO_JHON.jpg",
      detalle: ""
    },
    {
      nombre: "Chela",
      cargo: "Ingeniera ",
      grupo: "Ingenieros",
      colegiado: true,
      foto: "icons/FOTO CHELA.jpg",
      detalle: ""
    },
    {
      nombre: "Antony",
      cargo: "Programador junior",
      grupo: "Programadores",
      colegiado: false,
      foto: "icons/pro.jpeg",
      detalle: ""
    },
    {
      nombre: "Adan",
      cargo: "Ingeniero",
      grupo: "Ingenieros",
      colegiado: false,
      foto: "icons/inge.jpeg",
      detalle: ""
    }


    /* Plantilla para sumar a alguien más:
    ,{
      nombre: "Nombre Apellido",
      cargo: "Topógrafo",
      grupo: "Equipo de campo",
      colegiado: false,
      foto: "imagen/equipo-nombre.jpg",
      detalle: ""
    }
    */
  ]
};
