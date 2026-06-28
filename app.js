const { createFFmpeg, fetchFile } = FFmpeg;

const ffmpeg = createFFmpeg({ log: false });

const input = document.getElementById("videoInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

let selectedFile = null;

input.addEventListener("change", function () {
    selectedFile = this.files[0];

    if (selectedFile) {
        preview.src = URL.createObjectURL(selectedFile);
        preview.style.display = "block";

        result.innerHTML = "✅ Video loaded. Ready to convert.";
    }
});

async function convertGIF() {

    if (!selectedFile) {
        result.innerHTML = "⚠️ Please upload a video first.";
        return;
    }
const progressBox = document.getElementById("progressBox");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

progressBox.style.display = "block";

progressBar.style.width = "10%";
progressText.innerHTML = "Loading FFmpeg...";
    const quality = document.getElementById("quality")?.value || 10;
    const start = document.getElementById("startTime")?.value;
    const end = document.getElementById("endTime")?.value;

    result.innerHTML = "⏳ Loading converter...";

    if (!ffmpeg.isLoaded()) {

    progressBar.style.width = "20%";
    progressText.innerHTML = "Loading FFmpeg...";

    await ffmpeg.load();

    progressBar.style.width = "35%";
    progressText.innerHTML = "Preparing video...";

    }
    

  result.innerHTML = `
    <h3>✅ Conversion Completed!</h3>

    <img src="${gifUrl}"
         style="max-width:100%; border-radius:12px; margin:15px 0;">

    <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">

        <a href="${gifUrl}"
           download="converted.gif"
           style="padding:12px 22px; background:#06b6d4; color:#fff; text-decoration:none; border-radius:8px; font-weight:bold;">
            ⬇ Download GIF
        </a>

        <button onclick="location.reload()"
            style="padding:12px 22px; background:#4f46e5; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">
            🔄 Convert Another Video
        </button>

    </div>
`;  
