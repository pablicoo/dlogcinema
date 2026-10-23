# CINEGRADE AI — browser processing prototype

## Publish/update on GitHub Pages
1. Download and extract this ZIP.
2. Open https://github.com/pablicoo/dlogcinema
3. Select **Add file → Upload files**.
4. Upload `index.html`, `styles.css`, `app.js`, `README.md` to the repository root and commit.
5. Wait for Pages to redeploy: https://pablicoo.github.io/dlogcinema/

## What this version does
- Video stays in the browser and is not uploaded to an application server.
- Optional still-image reference; a basic average red/blue estimate nudges warmth.
- FFmpeg WebAssembly renders an MP4 in-browser with contrast, saturation and color-balance filters.
- Six preset creative looks and controls.

## Limitations / important
This is a local processing prototype, not yet a fully autonomous expert AI colorist. The “agent” explains a recipe based on the selected look and controls; reference matching is only a simple warm/cool estimate. It does not perform a calibrated DJI D-Log M to Rec.709 transform. The current optional “normalization” is a generic curve and must not be represented as a proper D-Log M LUT. A calibrated LUT/transform and real vision-language model integration are needed for professional results.

FFmpeg.wasm downloads WebAssembly assets from unpkg on first export. Use a modern Chromium/Firefox browser, serve over HTTPS (GitHub Pages does), and start with short clips; browser memory can be a limiting factor. No API key is included or exposed.
