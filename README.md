# CINEGRADE AI — Creative Direction Studio
Interfaz estática para GitHub Pages.

## Actualización
- Añade dos modos: dirección creativa automática sin referencia y dirección guiada por imagen opcional.
- Permite cargar/quitar la referencia y cambiar entre modos.
- Los controles de look afectan a la vista previa del vídeo dentro del navegador.

## Publicación en el repositorio existente
1. Descomprime el ZIP.
2. Abre https://github.com/pablicoo/dlogcinema
3. Usa **Add file → Upload files**.
4. Sube `index.html`, `styles.css`, `app.js` y `README.md` a la raíz, reemplazando los existentes.
5. Pulsa **Commit changes**.
6. Espera a que GitHub Pages publique la actualización y recarga https://pablicoo.github.io/dlogcinema/

## Limitaciones
Esto actualiza la interfaz y la previsualización con filtros CSS aproximados. Aún no hay análisis IA semántico, matching de paleta de la referencia, transformación calibrada D-Log M, renderizado ni exportación de vídeo. Esas funciones necesitan un motor de procesamiento real; GitHub Pages solo aloja los archivos estáticos.
