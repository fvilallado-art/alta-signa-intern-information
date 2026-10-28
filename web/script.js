// ============================================================
//  TUS DATOS — cambia solo esto y toda la web se actualiza
// ============================================================
const CONFIG = {
  nombre: "Tu Empresa",          // p. ej. "Golf Nupcial"
  zona: "Tu ciudad",             // p. ej. "Madrid y alrededores"
  telefono: "600 000 000",       // como quieres que se vea
  whatsapp: "34600000000",       // con prefijo de país, sin + ni espacios
  email: "hola@tuempresa.com",
  instagram: "tuempresa",        // sin @ (déjalo "" si no tienes)
  precio: "Consultar",           // p. ej. "Desde 250 €"
  fotosGaleria: 6                // número de fotos img/galeria-1.jpg ... galeria-N.jpg
};
// ============================================================

document.querySelectorAll("[data-cfg]").forEach(el => {
  const v = CONFIG[el.dataset.cfg];
  if (v) el.textContent = el.dataset.cfg === "instagram" ? "@" + v : v;
});

const waText = encodeURIComponent("Hola, quiero información sobre el coche para mi boda.");
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${waText}`;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-tel]").forEach(a => a.href = "tel:" + CONFIG.telefono.replace(/\s/g, ""));
document.querySelectorAll("[data-mail]").forEach(a => a.href = "mailto:" + CONFIG.email);
document.querySelectorAll("[data-ig]").forEach(a => {
  if (!CONFIG.instagram) { a.closest("li").remove(); return; }
  a.href = "https://instagram.com/" + CONFIG.instagram;
  a.target = "_blank";
  a.rel = "noopener";
});

// Galería: carga img/galeria-N.jpg y oculta las que no existan
const gallery = document.getElementById("gallery");
for (let i = 1; i <= CONFIG.fotosGaleria; i++) {
  const img = new Image();
  img.loading = "lazy";
  img.alt = "Volkswagen Golf de boda, foto " + i;
  img.src = `img/galeria-${i}.jpg`;
  img.onerror = () => img.remove();
  gallery.appendChild(img);
}

// Si falta la foto principal, mostramos un fondo elegante en su lugar
document.querySelectorAll("img[data-fallback]").forEach(img => {
  const fail = () => img.classList.add("missing");
  img.addEventListener("error", fail);
  if (img.complete && !img.naturalWidth) fail();
});

// Menú móvil
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

// Barra superior sólida al hacer scroll
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// La fecha de la boda no puede ser pasada
const fecha = document.querySelector('input[name="fecha"]');
if (fecha) fecha.min = new Date().toISOString().split("T")[0];

document.getElementById("year").textContent = new Date().getFullYear();
