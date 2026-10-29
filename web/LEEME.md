# La Capota · Golf Cabrio clásico (web)

Toda la web está en un único archivo: `index.html`.

## Cambiar tus datos
Abre `index.html`, baja casi hasta el final y edita el bloque `CONFIG`: nombre, zona, teléfono, WhatsApp, email, Instagram, año, color y precios.

## Poner las fotos de tu Golf
1. Crea una carpeta `img` junto a `index.html` y mete ahí tus fotos (por ejemplo `golf-1.jpg`, `golf-2.jpg`…).
2. En `CONFIG`, rellena `fotos: ["img/golf-1.jpg", "img/golf-2.jpg", "img/golf-3.jpg", "img/golf-4.jpg"]`.
   La primera sale en la portada; las siguientes, en la sección "El coche".
Mientras no haya fotos se muestra un dibujo del Golf Cabrio.

## Publicar en Netlify
Arrastra la carpeta que contiene `index.html` (no una carpeta que la contenga a ella) a Netlify > tu sitio > Deploys.
Para recibir las reservas: Netlify > Forms > Enable form detection, y vuelve a publicar.
