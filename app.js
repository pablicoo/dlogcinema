(() => {
const $=id=>document.getElementById(id);
const videoInput=$("videoInput"),video=$("videoPreview"),empty=$("videoEmpty"),stageTag=$("stageTag");
let videoUrl=null,imageUrl=null,selectedLook="natural",mode="auto";
const looks={
natural:{contrast:1.08,saturation:.96,sepia:0,hue:0,brightness:1},
teal:{contrast:1.16,saturation:1.08,sepia:.12,hue:4,brightness:.97},
film:{contrast:.94,saturation:.82,sepia:.16,hue:-3,brightness:1.03},
golden:{contrast:1.04,saturation:1.05,sepia:.2,hue:-5,brightness:1.04},
noir:{contrast:1.25,saturation:.65,sepia:0,hue:0,brightness:.88},
clean:{contrast:1.03,saturation:1.02,sepia:0,hue:0,brightness:1.02}};
function setStatus(s){$("statusMessage").textContent=s}
function setMode(next){
 mode=next;
 document.querySelectorAll(".mode-button").forEach(b=>b.classList.toggle("selected",b.dataset.mode===mode));
 $("autoExplainer").hidden=mode!=="auto";
 $("referenceSection").hidden=mode!=="reference";
 $("applyButton").textContent=mode==="auto"?"✦ Generar dirección creativa":"✦ Aplicar dirección con referencia";
 setStatus(mode==="auto"?"Modo automático: el look se basa en el estilo elegido; el análisis semántico de escena aún está pendiente.":"Modo referencia: puedes añadir una imagen como guía visual. El matching automático de color aún está pendiente.");
}
document.querySelectorAll(".mode-button").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mode)));
videoInput.addEventListener("change",()=>{
 const f=videoInput.files&&videoInput.files[0];if(!f)return;
 if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(f);video.src=videoUrl;video.hidden=false;empty.hidden=true;stageTag.hidden=false;
 $("videoName").textContent=f.name;$("videoInfo").textContent=`${(f.size/1048576).toFixed(1)} MB · local`;updatePreview();
 setStatus("Vídeo cargado. Puedes elegir dirección automática o una referencia; el procesamiento actual es solo de previsualización.");
});
$("videoStage").addEventListener("dragover",e=>e.preventDefault());
$("videoStage").addEventListener("drop",e=>{e.preventDefault();const f=[...e.dataTransfer.files].find(x=>x.type.startsWith("video/")||/\.(mov|mp4|m4v|webm)$/i.test(x.name));if(!f)return;const dt=new DataTransfer();dt.items.add(f);videoInput.files=dt.files;videoInput.dispatchEvent(new Event("change"))});
$("referenceInput").addEventListener("change",()=>{
 const f=$("referenceInput").files&&$("referenceInput").files[0];if(!f)return;
 if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=URL.createObjectURL(f);$("referencePreview").src=imageUrl;$("referencePreview").hidden=false;$("referenceEmpty").hidden=true;$("referenceName").textContent=f.name;$("removeReference").hidden=false;
 setStatus("Referencia cargada localmente. En esta versión todavía no se analiza automáticamente su paleta.");
});
$("removeReference").addEventListener("click",()=>{
 $("referenceInput").value="";$("referencePreview").hidden=true;$("referencePreview").removeAttribute("src");$("referenceEmpty").hidden=false;$("referenceName").textContent="Ninguna referencia seleccionada";$("removeReference").hidden=true;
 if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=null;setStatus("Referencia eliminada. Puedes continuar sin referencia o añadir otra.");
});
document.querySelectorAll(".look-card").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".look-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selectedLook=b.dataset.look;updatePreview()}));
const bind=(id,out,fmt)=>$(id).addEventListener("input",()=>{$(out).textContent=fmt(Number($(id).value));updatePreview()});
bind("intensity","intensityOut",v=>`${v}%`);bind("contrast","contrastOut",v=>v>0?`+${v}`:`${v}`);bind("warmth","warmthOut",v=>v>0?`+${v}`:`${v}`);bind("saturation","saturationOut",v=>v>0?`+${v}`:`${v}`);
$("lookToggle").addEventListener("change",updatePreview);
function updatePreview(){
 if(video.hidden)return;if(!$("lookToggle").checked){video.style.filter="none";return}
 const l=looks[selectedLook],i=Number($("intensity").value)/100,c=1+(l.contrast-1)*i+Number($("contrast").value)/100,s=1+(l.saturation-1)*i+Number($("saturation").value)/100,sepia=Math.max(0,l.sepia*i+Number($("warmth").value)/300),hue=l.hue*i,brightness=1+(l.brightness-1)*i;
 video.style.filter=`contrast(${Math.max(.5,c)}) saturate(${Math.max(0,s)}) sepia(${Math.min(.5,sepia)}) hue-rotate(${hue}deg) brightness(${brightness})`;
}
$("applyButton").addEventListener("click",()=>{
 if(video.hidden){setStatus("Primero sube un vídeo para previsualizar la dirección creativa.");videoInput.click();return}
 if(mode==="reference"&&!imageUrl){setStatus("Has elegido el modo con referencia, pero no has añadido una imagen. Sube una o cambia a modo Automática.");$("referenceInput").click();return}
 setStatus(mode==="auto"?"Dirección creativa aplicada a la previsualización con el look y los controles elegidos. El análisis IA de la escena y la exportación real todavía deben implementarse.":"Look aplicado a la previsualización. La referencia está cargada, pero el análisis automático de paleta y la exportación real todavía deben implementarse.");
 updatePreview();
});
window.addEventListener("beforeunload",()=>{if(videoUrl)URL.revokeObjectURL(videoUrl);if(imageUrl)URL.revokeObjectURL(imageUrl)});
})();