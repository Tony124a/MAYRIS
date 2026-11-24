/* =========================================================
   layout.js — Navbar y footer compartidos por todas las páginas.
   Edítalos aquí una sola vez y se actualizan en todo el sitio.

   Cada página solo necesita:
     <body data-page="inicio|nosotros|servicios|proyectos|contacto">
     <div id="site-nav"></div>      (arriba)
     <div id="site-footer"></div>   (abajo)
     <script src="layout.js"></script>
   ========================================================= */
(function () {
  "use strict";

  /* ---- Redes: cámbialas aquí y se actualizan en el footer y en Contacto ---- */
  var SOCIAL = {
    whatsapp:  "https://wa.me/51941413953",
    facebook:  "https://www.facebook.com/people/Mayris-Ingenieros/61596265297008/",
    messenger: "",   /* vacío = se arma solo con tu enlace de Facebook (m.me/TU-PAGINA) */
    tiktok:    "https://www.tiktok.com/@TU-USUARIO"
  };

  /* A partir de facebook.com/NombreDePagina arma m.me/NombreDePagina */
  function messengerFrom(fb) {
    try {
      var u = new URL(fb);
      var id = u.searchParams.get("id");
      if (!id) {
        var parts = u.pathname.split("/").filter(Boolean);
        id = parts[parts.length - 1];
      }
      return id ? "https://m.me/" + id : fb;
    } catch (e) { return fb; }
  }
  if (!SOCIAL.messenger) SOCIAL.messenger = messengerFrom(SOCIAL.facebook);

  var LINKS = [
    { key: "inicio",    href: "index.html",     label: "Inicio" },
    { key: "nosotros",  href: "nosotros.html",  label: "Nosotros" },
    { key: "servicios", href: "servicios.html", label: "Servicios" },
    { key: "proyectos", href: "proyectos.html", label: "Proyectos" },
    { key: "contacto",  href: "contacto.html",  label: "Contacto" }
  ];

  var MAPS = "https://maps.app.goo.gl/4NQJXcA7vqoh6USq7";

  var page = document.body.getAttribute("data-page") || "inicio";

  /* ---- NAVBAR ---- */
  var items = LINKS.map(function (l) {
    var cur = l.key === page ? ' aria-current="page"' : "";
    return '<li><a href="' + l.href + '"' + cur + ">" + l.label + "</a></li>";
  }).join("");

  var navHtml = [
    '<nav class="nav" aria-label="Principal">',
    '  <div class="nav-in">',
    '    <a class="brand" href="index.html" aria-label="Mayris Ingenieros, inicio">',
    '      <img src="imagen/logo.jpg" alt="">',
    '      <span><b>MAYRIS</b><small>INGENIEROS</small></span>',
    "    </a>",
    '    <ul class="links">' + items + "</ul>",
    "  </div>",
    "</nav>"
  ].join("\n");

  /* ---- FOOTER ---- */
  var year = new Date().getFullYear();
  var arrow = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

  var footerHtml = [
    '<footer class="site-footer">',
    '  <div class="ft-in">',

    '    <div class="ft-top">',
    '      <div class="ft-id">',
    '        <a class="brand brand-foot" href="index.html" aria-label="Mayris Ingenieros, inicio">',
    '          <img src="imagen/logo.jpg" alt="">',
    "          <span><b>MAYRIS</b><small>INGENIEROS</small></span>",
    "        </a>",
    "      </div>",
    '      <p class="ft-quote">Ingeniería para <em class="rot" data-words="puentes,viviendas,caminos,ideas,proyectos">puentes</em> <span class="rot-end">que duran.</span></p>',
    "    </div>",

    '    <div class="ft-grid">',
    '      <nav class="ft-col" aria-label="Mapa del sitio">',
    "        <h3>Explora</h3>",
    "        <ul>",
    '          <li><a href="index.html">Inicio</a></li>',
    '          <li><a href="nosotros.html">Nosotros</a></li>',
    '          <li><a href="servicios.html">Servicios</a></li>',
    '          <li><a href="proyectos.html">Proyectos</a></li>',
    '          <li><a href="contacto.html">Contacto</a></li>',
    "        </ul>",
    "      </nav>",

    '      <div class="ft-col">',
    "        <h3>Servicios</h3>",
    "        <ul>",
    '          <li><a href="servicios.html#topografia">Topografía</a></li>',
    '          <li><a href="servicios.html#diseno">Diseño</a></li>',
    '          <li><a href="servicios.html#construccion">Construcción</a></li>',
    '          <li><a href="servicios.html#supervision">Supervisión</a></li>',
    "        </ul>",
    "      </div>",

    '      <div class="ft-col">',
    "        <h3>Contacto</h3>",
    "        <ul>",
    "          <li>Jirón 04 de Noviembre S/N,<br>Urb. Manzanares, Sicuani · Canchis · Cusco</li>",
    '          <li><a href="#">Telefono</a> &nbsp;·&nbsp; <a href="https://wa.me/51941413953">941 413 953</a></li>',
    '          <li><a href="mailto:edwinjh2018@gmail.com">edwinjh2018@gmail.com</a></li>',
    "        </ul>",
    '        <a class="link-arrow" href="' + MAPS + '" target="_blank" rel="noopener">Ver en Google Maps ' + arrow + "</a>",
    "      </div>",

    '      <div class="ft-col ft-follow">',
    "        <h3>Síguenos</h3>",
    "        <p>Escríbenos o mira nuestras obras en tus redes.</p>",
    '        <div class="social">',
    '          <a class="soc soc-wa" href="' + SOCIAL.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp">',
    '            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5L9.3 8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-.7 2.1.1 3.5a11.6 11.6 0 0 0 4.6 4.2c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z"/></svg>',
    "            WhatsApp",
    "          </a>",
    '          <a class="soc soc-fb" href="' + SOCIAL.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">',
    '            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z"/></svg>',
    "            Facebook",
    "          </a>",
    '          <a class="soc soc-ms" href="' + SOCIAL.messenger + '" target="_blank" rel="noopener" aria-label="Messenger">',
    '            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 2C6.5 2 2 6.1 2 11.3c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5l-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7z"/></svg>',
    "            Messenger",
    "          </a>",
    '          <a class="soc soc-tt" href="' + SOCIAL.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok">',
    '            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M16.6 3c.3 1.8 1.5 3.2 3.4 3.4v2.9c-1.3 0-2.5-.4-3.4-1v6.4A5.6 5.6 0 1 1 11 9v3a2.6 2.6 0 1 0 2.6 2.6V3h3Z"/></svg>',
    "            TikTok",
    "          </a>",
    "        </div>",
    "      </div>",
    "    </div>",

    '    <div class="ft-mark" aria-hidden="true">MAYRIS</div>',

    '    <div class="ft-legal">',
    "      <span>© " + year + " Mayris Ingenieros</span>",
    "      <span>Topografía · Diseño · Construcción · Supervisión</span>",
    '      <a class="btn btn-solid btn-top" href="#inicio" aria-label="Volver al inicio de la página">',
    "        Volver arriba",
    '        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>',
    "      </a>",
    "    </div>",

    "  </div>",
    "</footer>"
  ].join("\n");

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  mount("site-nav", navHtml);
  mount("site-footer", footerHtml);

  /* Enlaces de redes dentro de las páginas (ej. Contacto): <a data-social="facebook"> */
  [].forEach.call(document.querySelectorAll("[data-social]"), function (a) {
    var k = a.getAttribute("data-social");
    if (SOCIAL[k]) a.href = SOCIAL[k];
  });

  /* ---- Palabra que cambia: <em class="rot" data-words="a,b,c">a</em> ---- */
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  [].forEach.call(document.querySelectorAll(".rot[data-words]"), function (node) {
    var words = node.getAttribute("data-words").split(",").map(function (w) { return w.trim(); }).filter(Boolean);
    if (words.length < 2 || reduce) return;
    var i = 0;
    setInterval(function () {
      node.classList.add("is-out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        node.textContent = words[i];
        node.classList.remove("is-out");
      }, 380);
    }, 2600);
  });

  /* ---- Navbar: transparente sobre la portada, oscuro al terminar ---- */
  var nav  = document.querySelector(".nav");
  var hero = document.getElementById("inicio");
  if (!nav) return;

  function check() {
    var pasada = hero
      ? hero.getBoundingClientRect().bottom <= nav.offsetHeight
      : (window.pageYOffset || document.documentElement.scrollTop) > 600;
    nav.classList.toggle("is-scrolled", pasada);
  }
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check);
  window.addEventListener("load", check);
  check();
})();
