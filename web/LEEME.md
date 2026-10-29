# Web · Vehículos con chófer para bodas y eventos

## 1. Tus datos
Abre `script.js` y edita el bloque `CONFIG`: nombre de la marca, zona, teléfono, WhatsApp, email, Instagram, color del coche y precios (si dejas un precio en `null` se muestra "Bajo presupuesto").

## 2. Foto de tu Golf
Guarda la foto como `img/golf.jpg`. Mejor en horizontal, de al menos 1600 px de ancho. Mientras no exista, la web muestra un marcador.

## 3. Fotos de ambiente
Están alojadas en Higgsfield (las URL que contienen `cloudfront.net` en `index.html`). Si prefieres tenerlas dentro de la web, descárgalas desde tu biblioteca de Higgsfield, guárdalas en `img/` y cambia esas URL por `img/nombre.jpg`.

## 4. Revisa los textos
Comprueba que lo que dice la web coincide con tu servicio: señal para reservar, factura a empresas, horas incluidas en cada tarifa, plazas, respuesta en 24 h…

## 5. Publicar en Netlify
Arrastra la carpeta `web` a Netlify (o conecta el repositorio: `netlify.toml` ya apunta a `web`).
Las solicitudes del formulario aparecen en Netlify > tu sitio > Forms; ahí puedes activar que te lleguen por email.
