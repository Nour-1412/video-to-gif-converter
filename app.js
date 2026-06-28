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
