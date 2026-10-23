# CINEGRADE AI — Reference Color Studio

Prototipo estático para publicar con GitHub Pages.

## Incluye
- Interfaz adaptable para escritorio y móvil.
- Vista previa local de vídeos compatibles con el navegador.
- Carga local de una imagen de referencia.
- Looks de demostración y controles de intensidad, contraste, temperatura y saturación.
- Los archivos se procesan en la vista previa del navegador y no se envían a un servidor.

## Limitaciones importantes
Esta versión es un **prototipo frontend**, no un motor de color grading final:
- Los looks usan filtros CSS aproximados en la vista previa.
- No se hace una transformación técnica certificada de DJI D-Log M a Rec.709.
- La imagen de referencia no se analiza automáticamente ni se convierte a una LUT.
- No se renderiza ni exporta un vídeo nuevo.
- La protección de piel y la consistencia entre planos son objetivos de producto, no funciones activas.

Para una versión profesional, conectar un motor real de color (por ejemplo, FFmpeg + filtros/LUT calibradas y gestión de color), análisis de referencia, renderizado por lotes y exportación. GitHub Pages solo aloja la interfaz estática; no ejecuta el backend de procesamiento.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub llamado `cinegrade-ai`.
2. Sube `index.html`, `styles.css`, `app.js` y `README.md` a la raíz del repositorio.
3. Abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/(root)`, y pulsa **Save**.
6. Espera a que termine el despliegue. La URL será similar a `https://TU-USUARIO.github.io/cinegrade-ai/`.

Si quieres una URL raíz como `https://TU-USUARIO.github.io/`, el repositorio debe llamarse `TU-USUARIO.github.io`. Para un dominio propio, se configura en Settings → Pages → Custom domain y se añaden los registros DNS indicados por GitHub.

## Siguiente fase recomendada
1. Definir el flujo exacto de normalización D-Log M.
2. Implementar análisis de referencias y generación/selección de LUT.
3. Añadir procesamiento y exportación real con una cola de renderizado.
4. Añadir tests con archivos de cámara reales y material de referencia autorizado.
