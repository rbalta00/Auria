# Facebook Pixel Installation — Auria

El sitio de Auria ahora tiene instalado el **Meta Pixel** para rastrear eventos de usuario y conversiones. 

## Pasos para completar la configuración

### 1. Obtener tu Pixel ID

Ve a **Meta Business Suite** → **Configuración** → **Conjuntos de datos y píxeles**:

1. Abre https://business.facebook.com/latest/settings/events_dataset_and_pixel?business_id=4139795976284954
2. Busca el "Conjunto de datos" o "Píxel" llamado **"Auria"**
3. Copia el **ID del píxel** (un número como `123456789012345`)

### 2. Actualizar el Pixel ID en index.html

En el archivo `index.html`, busca `AURIA_PIXEL_ID` y reemplázalo con tu ID real:

**Línea ~13:** (en el Meta Pixel Code)
```javascript
fbq('init', 'AURIA_PIXEL_ID');  // ← Reemplaza AURIA_PIXEL_ID
```

**Línea ~20:** (en el noscript tag)
```html
src="https://www.facebook.com/tr?id=AURIA_PIXEL_ID&ev=PageView&noscript=1"  <!-- Reemplaza AURIA_PIXEL_ID -->
```

### 3. Guardar y desplegar

Una vez actualizado, guarda el archivo y despliega a tu servidor/hosting donde aloja el sitio de Auria.

## Eventos que se rastrean

El Pixel ahora registra automáticamente:

- **PageView** — cada vez que alguien carga el sitio
- **ViewContent** — cuando abre la vista de un producto (lightbox)
- **AddToCart** — cuando agrega un producto a su selección
- **Lead** — cada vez que hace clic en un botón de WhatsApp (en cualquier lugar del sitio)

Todos los eventos incluyen datos como:
- Nombre y código del producto
- Categoría (Aretes, Pulseras, etc.)
- Precio y cantidad
- Fuente del clic (header, catálogo, lightbox, etc.)

## Verificar que funciona

1. Abre el sitio en tu navegador
2. Abre las DevTools (F12) → **Red** o **Console**
3. Busca llamadas a `facebook.com/tr?` — confirma que llegan con tu Pixel ID
4. En Meta Business Suite, ve a **Eventos Manager** → **Resumen** — deberías ver eventos en vivo después de algunos segundos

## Notas

- El Pixel usa `fbq` (Meta Pixel Library) que se carga automáticamente
- Si `fbq` no está disponible (error de red), los eventos se ignoran silenciosamente (no rompe el sitio)
- Para rastrear más eventos o crear audiencias personalizadas, usa la interfaz de Meta Events Manager

¿Preguntas? Revisa la documentación de Facebook Pixel en https://developers.facebook.com/docs/facebook-pixel/
