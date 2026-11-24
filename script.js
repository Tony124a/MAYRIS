(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  /* ===================== CURVAS DE NIVEL ===================== */
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function smoothClosed(pts) {
    var n = pts.length, d = "";
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      if (i === 0) d += "M" + p1[0].toFixed(1) + " " + p1[1].toFixed(1);
      d += "C" +
        (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + " " + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + " " +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + " " + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + " " +
        p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    return d + "Z";
  }

  function hill(parent, o) {
    var rand  = rng(o.seed);
    var color = o.color || "#8cc6f2";
    var ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28];
    var STEPS = 44;

    for (var k = 1; k <= o.rings; k++) {
      var t = k / o.rings;
      var rx = o.rx * t, ry = o.ry * t;
      var wob = o.wobble * (0.5 + t);
      var pts = [];

      for (var i = 0; i < STEPS; i++) {
        var a = (i / STEPS) * Math.PI * 2;
        var r = 1 + wob * (
          0.55 * Math.sin(2 * a + ph[0] + t * 1.3) +
          0.30 * Math.sin(3 * a + ph[1] - t * 1.7) +
          0.15 * Math.sin(5 * a + ph[2] + t * 2.1)
        );
        pts.push([o.cx + Math.cos(a) * rx * r, o.cy + Math.sin(a) * ry * r]);
      }

      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", smoothClosed(pts));
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-opacity", k % 5 === 0 ? 0.42 : 0.2);
      path.setAttribute("stroke-width", k % 5 === 0 ? 1.4 : 0.9);
      path.setAttribute("vector-effect", "non-scaling-stroke");
      parent.appendChild(path);
    }
  }

  /* Banda de Servicios (fondo claro) */
  var big = document.getElementById("contours");
  if (big) {
    var cBig = big.getAttribute("data-color") || "#7aa9cd";
    big.setAttribute("viewBox", "0 0 1200 600");
    hill(big, { cx: 180, cy: 120, rx: 360, ry: 220, rings: 12, wobble: 0.10, seed: 7,  color: cBig });
    hill(big, { cx: 980, cy: 470, rx: 420, ry: 260, rings: 14, wobble: 0.09, seed: 21, color: cBig });
    hill(big, { cx: 620, cy: 300, rx: 200, ry: 130, rings: 7,  wobble: 0.12, seed: 42, color: cBig });
  }

  /* Tarjeta "Levantamiento topográfico" (fondo oscuro) */
  var mini = document.getElementById("miniContours");
  if (mini) {
    var cMini = mini.getAttribute("data-color") || "#7bbcf0";
    hill(mini, { cx: 200, cy: 150, rx: 260, ry: 190, rings: 12, wobble: 0.10, seed: 5, color: cMini });
  }

  /* ===================== FORMULARIO → WHATSAPP ===================== */
  var form = document.getElementById("quote");
  var send = document.getElementById("send");
  if (form && send) {
    var PHONE = "51941413953";   /* cambia a 51941413953 para el otro número */

    function buildLink() {
      var nombre   = form.elements["nombre"].value.trim();
      var tel      = form.elements["tel"].value.trim();
      var servicio = form.elements["servicio"].value;
      var msg      = form.elements["msg"].value.trim();

      var lines = ["Hola, quisiera solicitar una cotización a Mayris Ingenieros."];
      if (nombre) lines.push("Nombre: " + nombre);
      if (tel)    lines.push("Teléfono: " + tel);
      lines.push("Servicio: " + servicio);
      if (msg)    lines.push("Proyecto: " + msg);

      return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n"));
    }

    form.addEventListener("input",  function () { send.href = buildLink(); });
    form.addEventListener("change", function () { send.href = buildLink(); });
    send.addEventListener("click",  function () { send.href = buildLink(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); window.open(buildLink(), "_blank", "noopener"); });

    send.href = buildLink();
  }
})();