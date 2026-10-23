(() => {
  const $ = (id) => document.getElementById(id);
  const videoInput = $("videoInput");
  const video = $("videoPreview");
  const empty = $("videoEmpty");
  const stageTag = $("stageTag");
  const videoName = $("videoName");
  const videoInfo = $("videoInfo");
  const refInput = $("referenceInput");
  const refPreview = $("referencePreview");
  const refEmpty = $("referenceEmpty");
  const status = $("statusMessage");
  let videoUrl = null, imageUrl = null, selectedLook = "natural";

  const looks = {
    natural: {contrast:1.08, saturation:.96, sepia:0, hue:0, brightness:1},
    teal: {contrast:1.16, saturation:1.08, sepia:.12, hue:4, brightness:.97},
    film: {contrast:.94, saturation:.82, sepia:.16, hue:-3, brightness:1.03},
    golden: {contrast:1.04, saturation:1.05, sepia:.2, hue:-5, brightness:1.04},
    noir: {contrast:1.25, saturation:.65, sepia:0, hue:0, brightness:.88},
    clean: {contrast:1.03, saturation:1.02, sepia:0, hue:0, brightness:1.02}
  };

  videoInput.addEventListener("change", () => {
    const file = videoInput.files && videoInput.files[0];
    if (!file) return;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    videoUrl = URL.createObjectURL(file);
    video.src = videoUrl;
    video.hidden = false;
    empty.hidden = true;
    stageTag.hidden = false;
    videoName.textContent = file.name;
    videoInfo.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB · local`;
    status.textContent = "Vídeo cargado localmente. La vista previa usa filtros visuales aproximados; no se ha renderizado un archivo nuevo.";
    updatePreview();
  });

  $("videoStage").addEventListener("dragover", e => { e.preventDefault(); });
  $("videoStage").addEventListener("drop", e => {
    e.preventDefault();
    const file = [...e.dataTransfer.files].find(f => f.type.startsWith("video/") || /\.(mov|mp4|m4v|webm)$/i.test(f.name));
    if (!file) return;
    const dt = new DataTransfer(); dt.items.add(file); videoInput.files = dt.files;
    videoInput.dispatchEvent(new Event("change"));
  });

  refInput.addEventListener("change", () => {
    const file = refInput.files && refInput.files[0];
    if (!file) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    imageUrl = URL.createObjectURL(file);
    refPreview.src = imageUrl;
    refPreview.hidden = false;
    refEmpty.hidden = true;
    status.textContent = "Referencia cargada para consulta visual. El matching automático de paleta aún no está implementado.";
  });

  document.querySelectorAll(".look-card").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".look-card").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      selectedLook = button.dataset.look;
      updatePreview();
    });
  });

  const bindRange = (id, out, format) => $(id).addEventListener("input", () => {
    $(out).textContent = format(Number($(id).value));
    updatePreview();
  });
  bindRange("intensity", "intensityOut", v => `${v}%`);
  bindRange("contrast", "contrastOut", v => v > 0 ? `+${v}` : `${v}`);
  bindRange("warmth", "warmthOut", v => v > 0 ? `+${v}` : `${v}`);
  bindRange("saturation", "saturationOut", v => v > 0 ? `+${v}` : `${v}`);
  $("lookToggle").addEventListener("change", updatePreview);

  function updatePreview() {
    if (video.hidden) return;
    if (!$("lookToggle").checked) { video.style.filter = "none"; return; }
    const look = looks[selectedLook];
    const intensity = Number($("intensity").value) / 100;
    const contrast = 1 + (Number($("contrast").value) / 100);
    const warmth = Number($("warmth").value);
    const saturation = 1 + Number($("saturation").value) / 100;
    const c = 1 + (look.contrast - 1) * intensity + (contrast - 1);
    const s = 1 + (look.saturation - 1) * intensity + (saturation - 1);
    const sepia = Math.max(0, look.sepia * intensity + warmth / 300);
    const hue = look.hue * intensity;
    const brightness = 1 + (look.brightness - 1) * intensity;
    video.style.filter = `contrast(${Math.max(.5,c)}) saturate(${Math.max(0,s)}) sepia(${Math.min(.5,sepia)}) hue-rotate(${hue}deg) brightness(${brightness})`;
  }

  $("analyzeButton").addEventListener("click", () => {
    if (!refInput.files.length) {
      status.textContent = "Primero añade una imagen de referencia. El análisis de color automático aún debe conectarse a un motor de IA.";
      refInput.click();
      return;
    }
    status.textContent = "La referencia está cargada. En esta versión los looks son aproximaciones visuales; aún no se extraen automáticamente paleta, curvas ni LUT de la imagen.";
  });

  window.addEventListener("beforeunload", () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  });
})();