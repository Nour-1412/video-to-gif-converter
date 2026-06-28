const { createFFmpeg, fetchFile } = FFmpeg;

const ffmpeg = createFFmpeg({
    log: true
});

const input = document.getElementById("videoInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const dropZone = document.getElementById("dropZone");

let selectedFile = null;
// Select video
input.addEventListener("change", function () {

    selectedFile = this.files[0];

    if (selectedFile) {

        preview.src = URL.createObjectURL(selectedFile);
        preview.style.display = "block";

        result.innerHTML = "✅ Video loaded successfully. Ready to convert.";

    }

});
// Drag & Drop Support

dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropZone.style.borderColor = "#06b6d4";
    dropZone.style.background = "#1e293b";
});

dropZone.addEventListener("dragleave", function () {
    dropZone.style.borderColor = "#4f46e5";
    dropZone.style.background = "#1f2937";
});

dropZone.addEventListener("drop", function (e) {
    e.preventDefault();

    dropZone.style.borderColor = "#4f46e5";
    dropZone.style.background = "#1f2937";

    const files = e.dataTransfer.files;

    if (files.length > 0) {

        selectedFile = files[0];

        preview.src = URL.createObjectURL(selectedFile);
        preview.style.display = "block";

        result.innerHTML = "✅ Video loaded successfully. Ready to convert.";

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

    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }

    progressBar.style.width = "35%";
    progressText.innerHTML = "Preparing video...";
    ffmpeg.FS(
        "writeFile",
        "input.mp4",
        await fetchFile(selectedFile)
    );

    progressBar.style.width = "60%";
    progressText.innerHTML = "Converting video...";

    await ffmpeg.run(
        "-i",
        "input.mp4",
        "-vf",
        "fps=10,scale=320:-1",
        "output.gif"
    );

    progressBar.style.width = "90%";
    progressText.innerHTML = "Creating GIF...";

    const data = ffmpeg.FS("readFile", "output.gif");

    const gifUrl = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/gif" })
    );

    progressBar.style.width = "100%";
    progressText.innerHTML = "Completed ✅";
    result.innerHTML = `
        <h3>✅ Conversion Completed!</h3>

        <img src="${gifUrl}"
             style="max-width:100%; border-radius:12px; margin:20px 0;" />

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
}
    
