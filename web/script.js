// ============================================================
//  TUS DATOS: cambia solo este bloque y toda la web se actualiza
// ============================================================
const CONFIG = {
  marca: "Cortejo",                  // nombre de tu negocio
  zona: "Madrid y alrededores",      // ciudad o zona de servicio
  telefono: "600 000 000",           // como quieres que se vea
  whatsapp: "34600000000",           // con prefijo de país, sin + ni espacios
  email: "reservas@tudominio.com",
  instagram: "",                     // usuario sin @ ("" lo oculta)
  color: "Negro",                    // color de tu Golf
  // Precios en euros. Déjalo en null y se mostrará "Bajo presupuesto".
  precios: {
    ceremonia: null,                 // p. ej. 190
    completo: null,                  // p. ej. 320
    hora: null                       // p. ej. 60
  }
};
// ============================================================

document.documentElement.classList.add("js");

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Textos
$$("[data-cfg]").forEach(el => {
  const v = CONFIG[el.dataset.cfg];
  if (v) el.textContent = el.dataset.cfg === "instagram" ? "@" + v : v;
});

// Enlaces de contacto
const waMsg = encodeURIComponent("Hola, quiero consultar disponibilidad para un evento.");
$$("[data-wa]").forEach(a => { a.href = `https://wa.me/${CONFIG.whatsapp}?text=${waMsg}`; a.target = "_blank"; a.rel = "noopener"; });
$$("[data-tel]").forEach(a => a.href = "tel:+" + CONFIG.whatsapp.replace(/\D/g, ""));
$$("[data-mail]").forEach(a => a.href = "mailto:" + CONFIG.email);
if (CONFIG.instagram) {
  $$("[data-ig]").forEach(a => { a.href = "https://instagram.com/" + CONFIG.instagram; a.target = "_blank"; a.rel = "noopener"; });
} else {
  $$("[data-ig-row]").forEach(li => li.remove());
}

// Precios
const unidad = { ceremonia: "", completo: "", hora: " / hora" };
$$("[data-price]").forEach(el => {
  const k = el.dataset.price, v = CONFIG.precios[k];
  if (v) el.innerHTML = `<small>Desde</small>${v} €<span style="font-size:.5em">${unidad[k]}</span>`;
  else { el.textContent = "Bajo presupuesto"; el.classList.add("ask"); }
});

// Foto del Golf: si aún no existe, se muestra un marcador elegante
const carImg = $("#carPhoto img");
if (carImg) {
  const noImg = () => $("#carPhoto").classList.add("no-img");
  carImg.addEventListener("error", noImg);
  if (carImg.complete && !carImg.naturalWidth) noImg();
}

// Cabecera
const hdr = $("#hdr"), mbar = $(".mbar");
const onScroll = () => {
  const y = window.scrollY;
  hdr.classList.toggle("solid", y > 60);
  if (mbar) mbar.classList.toggle("show", y > window.innerHeight * .7);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menú móvil
const burger = $("#burger"), menu = $("#menu");
const setMenu = open => {
  menu.classList.toggle("open", open);
  hdr.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

// Animaciones al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -8% 0px" });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (el.parentElement.children.length > 1 ? (i % 4) * 70 : 0) + "ms";
  io.observe(el);
});

// Parallax suave del banner
const banner = $(".banner > img");
if (banner && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const par = () => {
    const r = banner.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) banner.style.transform = `translateY(${(r.top / innerHeight) * -60 - 30}px)`;
  };
  window.addEventListener("scroll", par, { passive: true });
  par();
}

// Fechas: no se puede elegir una pasada
const hoy = new Date().toISOString().split("T")[0];
$$('input[type="date"]').forEach(i => i.min = hoy);

// Formulario rápido del hero → rellena el formulario de reserva
const book = $("#book");
const elegirEvento = v => { const r = $$('input[name="evento"]', book).find(r => r.value === v); if (r) r.checked = true; };
$("#quick").addEventListener("submit", e => {
  e.preventDefault();
  const q = new FormData(e.target);
  elegirEvento(q.get("evento"));
  book.fecha.value = q.get("fecha");
  book.recogida.value = q.get("recogida");
  $("#reserva").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => book.nombre.focus({ preventScroll: true }), 700);
});

// Tarjetas de ocasiones y tarifas preseleccionan el formulario
$$("[data-evento]").forEach(a => a.addEventListener("click", () => elegirEvento(a.dataset.evento)));
$$("[data-plan]").forEach(a => a.addEventListener("click", () => { book.tarifa.value = a.dataset.plan; }));

$("#y").textContent = new Date().getFullYear();
