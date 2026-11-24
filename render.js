/* =========================================================
   render.js — Dibuja proyectos y equipo a partir de data.js.
   No necesitas editar este archivo.

   AVATAR DEL EQUIPO (en data.js, dentro de cada persona):
     foto:  "imagen/ana.jpg"   → se muestra la foto
     icono: "casco"            → se muestra un icono. Opciones:
            casco · topografia · diseno · supervision ·
            administracion · persona · inicial (la letra del nombre)
   Si hay foto y icono, la foto manda; si la foto no carga, se ve el icono.
   Si no pones ni foto ni icono, el icono se elige solo según el cargo
   (ingeniero → casco, topógrafo → topografia, supervisor → supervision…).
   ========================================================= */
(function () {
  "use strict";

  var D = window.MAYRIS || {};
  var proyectos = D.proyectos || [];
  var equipo = D.equipo || [];

  /* ---------- utilidades ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null && text !== "") n.textContent = text;
    return n;
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function photo(src, alt) {
    var i = document.createElement("img");
    i.src = src; i.alt = alt || ""; i.loading = "lazy"; i.decoding = "async";
    i.onerror = function () { this.remove(); };   /* si falta la foto, queda el fondo */
    return i;
  }
  function meta(p) {
    return [p.lugar, p.anio].filter(Boolean).join(" · ");
  }

  /* ---------- números que dependen de los datos ---------- */
  [].forEach.call(document.querySelectorAll("[data-count]"), function (n) {
    var k = n.getAttribute("data-count");
    if (k === "equipo") n.textContent = pad(equipo.length);
    if (k === "proyectos") n.textContent = pad(proyectos.length);
  });

  /* ---------- ICONOS DEL EQUIPO ---------- */
  var ICONS = {
    casco: '<path d="M4 16a8 8 0 0 1 16 0"/><path d="M2.5 16h19v2.5h-19z"/><path d="M10 8.3V16M14 8.3V16"/>',
    topografia: '<rect x="8" y="3.5" width="8" height="7" rx="1.5"/><path d="M16 7h3.5M12 10.5V14M12 14l-5 7M12 14l5 7M12 14v7"/>',
    diseno: '<circle cx="12" cy="4.6" r="1.6"/><path d="M12 6.2L6.5 20M12 6.2L17.5 20M8.6 15h6.8"/>',
    supervision: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M8.5 14l2.5 2.5 4.5-5"/>',
    administracion: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18"/>',
    persona: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>'
  };
  /* Nombres alternativos que también se aceptan en "icono" */
  var ALIAS = {
    ingeniero: "casco", ingeniera: "casco", obra: "casco", obrero: "casco", maestro: "casco",
    topografo: "topografia", topografa: "topografia",
    arquitecto: "diseno", arquitecta: "diseno", dibujante: "diseno", compas: "diseno",
    supervisor: "supervision", supervisora: "supervision",
    admin: "administracion", oficina: "administracion", maletin: "administracion",
    usuario: "persona"
  };
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  }
  function guess(cargo) {
    var t = norm(cargo);
    if (/topograf|agrimens|geodes/.test(t)) return "topografia";
    if (/arquitect|dise|dibuj|cad/.test(t)) return "diseno";
    if (/supervis|inspect|residente/.test(t)) return "supervision";
    if (/admin|secretar|contab|gerent|asistente/.test(t)) return "administracion";
    if (/ingenier|maestro|obrero|operari|capataz|alban/.test(t)) return "casco";
    return "persona";
  }
  /* Devuelve el dibujo del icono, o null si se pidió la inicial */
  function iconPath(p) {
    var k = norm(p.icono);
    if (k === "inicial") return null;
    if (ALIAS[k]) k = ALIAS[k];
    if (!ICONS[k]) k = guess(p.cargo);
    return ICONS[k];
  }

  /* ---------- EQUIPO ---------- */
  var team = document.getElementById("team");
  if (team) {
    team.textContent = "";
    var order = [], groups = {};
    equipo.forEach(function (p) {
      var g = p.grupo || "Equipo";
      if (!groups[g]) { groups[g] = []; order.push(g); }
      groups[g].push(p);
    });

    order.forEach(function (g) {
      var box = el("div", "team-group");
      box.appendChild(el("h3", "group-title", g));
      var grid = el("div", "card-grid c3");

      groups[g].forEach(function (p) {
        var card = el("article", "person-card lift");
        var av = el("div", "avatar");
        av.setAttribute("aria-hidden", "true");
        var inner = el("span", "av");
        var path = iconPath(p);
        if (path) inner.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + path + "</svg>";
        else inner.textContent = (p.nombre || "?").trim().charAt(0).toUpperCase();
        av.appendChild(inner);
        if (p.foto) av.appendChild(photo(p.foto, ""));   /* la foto tapa el icono; si no carga, se ve el icono */
        card.appendChild(av);

        var txt = el("div", "person-txt");
        txt.appendChild(el("h4", "", p.nombre));
        txt.appendChild(el("span", "role", p.cargo));
        if (p.detalle) txt.appendChild(el("p", "detail", p.detalle));
        card.appendChild(txt);
        grid.appendChild(card);
      });

      box.appendChild(grid);
      team.appendChild(box);
    });
  }

  /* ---------- SERVICIOS (se llenan desde servicios-data.js) ---------- */
  var svcGrid = document.getElementById("services-grid");
  if (svcGrid) {
    var servicios = D.servicios || [];
    var ARROW = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

    /* Dibujos que se ven mientras no haya foto */
    var ART = {
      topografia: '<ellipse cx="60" cy="62" rx="50" ry="34" transform="rotate(-12 60 62)"/><ellipse cx="60" cy="62" rx="38" ry="25" transform="rotate(-12 60 62)"/><ellipse cx="60" cy="62" rx="26" ry="16" transform="rotate(-12 60 62)"/><ellipse cx="60" cy="62" rx="13" ry="7" transform="rotate(-12 60 62)"/><path d="M60 10v14M60 100v10M6 62h10M104 62h10" opacity=".6"/><circle cx="60" cy="62" r="2" fill="currentColor"/>',
      diseno: '<rect x="16" y="20" width="88" height="68" rx="3"/><path d="M16 50h40M56 20v42M56 62h48M82 62v26"/><path d="M70 36a8 8 0 0 1 8 8" opacity=".6"/><path d="M16 102h88M16 98v8M104 98v8" opacity=".6"/>',
      obra: '<path d="M12 104h96"/><rect x="24" y="56" width="26" height="48"/><rect x="50" y="34" width="34" height="70"/><path d="M32 66h10M32 78h10M32 90h10M58 46h18M58 60h18M58 74h18M58 88h18" opacity=".6"/><path d="M100 104V18M100 18H70M100 28L88 18" opacity=".6"/>',
      supervision: '<circle cx="52" cy="54" r="32"/><path d="M37 54l11 11 19-22"/><path d="M76 78l28 28" stroke-width="2.6"/>',
      consultoria: '<rect x="30" y="18" width="60" height="86" rx="4"/><rect x="46" y="10" width="28" height="14" rx="3"/><path d="M42 48h36M42 62h36M42 76h20"/><path d="M68 86l6 6 12-14" opacity=".7"/>',
      estructural: '<path d="M12 36h96M12 104h96M28 36v68M60 36v68M92 36v68"/><path d="M28 36l32 68M92 36L60 104" opacity=".6"/><path d="M12 36l48-22 48 22" opacity=".6"/>',
      electrica: '<circle cx="60" cy="60" r="44"/><path d="M66 22L42 66h18l-6 32 26-46H64z"/>',
      sanitaria: '<path d="M60 14C60 14 34 46 34 70a26 26 0 0 0 52 0C86 46 60 14 60 14z"/><path d="M40 76q10 8 20 0t20 0" opacity=".7"/>'
    };
    var ART_ALIAS = { construccion: "obra", arquitectura: "diseno" };
    function artFor(s) {
      var k = norm(s.icono || s.id);
      if (ART_ALIAS[k]) k = ART_ALIAS[k];
      return ART[k] || ART.obra;
    }
    function artSvg(cls, s, w) {
      return '<svg class="' + cls + '" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="' + w + '" aria-hidden="true">' + artFor(s) + "</svg>";
    }

    /* Ventana con todo el detalle del servicio */
    var sdlg = null;
    function openService(s, i) {
      if (!sdlg) {
        sdlg = el("dialog", "proj-dialog");
        document.body.appendChild(sdlg);
        sdlg.addEventListener("click", function (e) { if (e.target === sdlg) sdlg.close(); });
      }
      sdlg.textContent = "";

      var close = el("button", "dlg-close", "×");
      close.type = "button";
      close.setAttribute("aria-label", "Cerrar");
      close.addEventListener("click", function () { sdlg.close(); });
      sdlg.appendChild(close);

      var stage = el("div", "dlg-stage is-art");
      stage.innerHTML = artSvg("dlg-art", s, 1.2);
      if (s.foto) { var ph = photo(s.foto, s.titulo); ph.loading = "eager"; stage.appendChild(ph); }
      sdlg.appendChild(stage);

      var info = el("div", "dlg-info");
      info.appendChild(el("span", "kicker", pad(i + 1) + " · " + (s.etiqueta || "Servicio")));
      info.appendChild(el("h3", "", s.titulo));
      if (s.resumen) info.appendChild(el("p", "", s.resumen));
      var list = el("ul", "dlg-list");
      (s.detalle || []).forEach(function (t) { list.appendChild(el("li", "", t)); });
      info.appendChild(list);
      sdlg.appendChild(info);

      if (typeof sdlg.showModal === "function") sdlg.showModal();
      else sdlg.setAttribute("open", "");
    }

    svcGrid.textContent = "";
    servicios.forEach(function (s, i) {
      var card = el("article", "svc-card lift");
      if (s.id) card.id = s.id;

      var media = el("div", "card-media");
      media.innerHTML = artSvg("card-art", s, 1.3);
      if (s.foto) media.appendChild(photo(s.foto, s.titulo));
      media.appendChild(el("span", "card-phase", s.etiqueta));
      media.appendChild(el("span", "card-num", pad(i + 1)));
      card.appendChild(media);

      var body = el("div", "svc-body");
      body.appendChild(el("h3", "", s.titulo));
      body.appendChild(el("p", "", s.resumen));
      var chips = el("ul", "chips");
      (s.chips || []).forEach(function (c) { chips.appendChild(el("li", "", c)); });
      body.appendChild(chips);
      var more = el("button", "link-arrow", "Ver detalle ");
      more.type = "button";
      more.insertAdjacentHTML("beforeend", ARROW);
      body.appendChild(more);
      card.appendChild(body);

      card.addEventListener("click", function () { openService(s, i); });
      svcGrid.appendChild(card);
    });

    /* Si llegas desde un enlace como servicios.html#topografia, baja a esa tarjeta */
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  }

  /* ---------- PROYECTOS ---------- */
  var grid = document.getElementById("projects-grid");
  if (!grid) return;

  var filtersBox = document.getElementById("filters");
  var empty = document.getElementById("projects-empty");
  var current = "Todos";

  /* Ventana de detalle con galería */
  var dlg = null;
  function openProject(p) {
    if (!dlg) {
      dlg = el("dialog", "proj-dialog");
      document.body.appendChild(dlg);
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    }
    dlg.textContent = "";

    var close = el("button", "dlg-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar");
    close.addEventListener("click", function () { dlg.close(); });
    dlg.appendChild(close);

    var fotos = (p.fotos && p.fotos.length) ? [p.foto].concat(p.fotos) : (p.foto ? [p.foto] : []);
    fotos = fotos.filter(Boolean);

    var stage = el("div", "dlg-stage");
    var main = null;
    function show(i) {
      if (main) main.remove();
      main = photo(fotos[i], p.titulo);
      main.loading = "eager";
      stage.appendChild(main);
    }
    if (fotos.length) show(0);
    dlg.appendChild(stage);

    if (fotos.length > 1) {
      var thumbs = el("div", "dlg-thumbs");
      fotos.forEach(function (src, i) {
        var b = el("button");
        b.type = "button";
        b.setAttribute("aria-label", "Foto " + (i + 1));
        if (i === 0) b.setAttribute("aria-current", "true");
        b.appendChild(photo(src, ""));
        b.addEventListener("click", function () {
          [].forEach.call(thumbs.children, function (c) { c.removeAttribute("aria-current"); });
          b.setAttribute("aria-current", "true");
          show(i);
        });
        thumbs.appendChild(b);
      });
      dlg.appendChild(thumbs);
    }

    var info = el("div", "dlg-info dlg-row");
    var txt = el("div", "dlg-text");
    if (p.categoria) txt.appendChild(el("span", "kicker", p.categoria));
    txt.appendChild(el("h3", "", p.titulo));
    txt.appendChild(el("span", "dlg-meta", meta(p)));
    if (p.descripcion) txt.appendChild(el("p", "", p.descripcion));
    if (p.servicios && p.servicios.length) {
      var chips = el("ul", "chips");
      p.servicios.forEach(function (s) { chips.appendChild(el("li", "", s)); });
      txt.appendChild(chips);
    }
    info.appendChild(txt);
    if (p.enlace) {
      var red = /tiktok/i.test(p.enlace) ? "Ver en TikTok" : /facebook|fb\.watch/i.test(p.enlace) ? "Ver en Facebook" : /youtu/i.test(p.enlace) ? "Ver en YouTube" : "Ver obra";
      var go = el("a", "btn btn-solid dlg-go", p.enlaceTexto || red);
      go.href = p.enlace; go.target = "_blank"; go.rel = "noopener";
      info.appendChild(go);
    }
    dlg.appendChild(info);

    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  function draw() {
    grid.textContent = "";
    var shown = 0;
    proyectos.forEach(function (p) {
      if (current !== "Todos" && p.categoria !== current) return;
      shown++;

      var card = el("button", "proj-card lift");
      card.type = "button";

      var media = el("span", "card-media");
      if (p.categoria) media.appendChild(el("span", "card-phase", p.categoria));
      if (p.foto) media.appendChild(photo(p.foto, p.titulo));
      media.appendChild(el("span", "card-open", "+"));
      card.appendChild(media);

      var cap = el("span", "proj-cap");
      cap.appendChild(el("b", "", p.titulo));
      cap.appendChild(el("em", "", meta(p)));
      if (p.descripcion) cap.appendChild(el("span", "d", p.descripcion));
      card.appendChild(cap);

      card.addEventListener("click", function () { openProject(p); });
      grid.appendChild(card);
    });
    if (empty) empty.hidden = shown !== 0;
  }

  /* Filtros automáticos según las categorías de data.js */
  var cats = [];
  proyectos.forEach(function (p) {
    if (p.categoria && cats.indexOf(p.categoria) < 0) cats.push(p.categoria);
  });
  if (filtersBox) {
    if (cats.length < 2) {
      filtersBox.hidden = true;
    } else {
      ["Todos"].concat(cats).forEach(function (c) {
        var b = el("button", "", c);
        b.type = "button";
        b.setAttribute("aria-pressed", c === current ? "true" : "false");
        b.addEventListener("click", function () {
          current = c;
          [].forEach.call(filtersBox.children, function (x) {
            x.setAttribute("aria-pressed", x === b ? "true" : "false");
          });
          draw();
        });
        filtersBox.appendChild(b);
      });
    }
  }

  draw();
})();
