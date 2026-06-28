const input = document.getElementById("videoInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

const progressBox = document.getElementById("progressBox");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const dropZone = document.getElementById("dropZone");

let selectedFile = null;
// File Upload
input.addEventListener("change", function () {

    selectedFile = this.files[0];

    if (!selectedFile) return;

    preview.src = URL.createObjectURL(selectedFile);
    preview.style.display = "block";

    result.innerHTML = "✅ Video loaded successfully. Ready to convert.";
});
// Drag & Drop
dropZone.addEventListener("dragover", function (e) {

    e.preventDefault();

    dropZone.style.borderColor = "#06b6d4";
    dropZone.style.background = "#1e293b";

});

dropZone.addEventListener("dragleave", function () {

    dropZone.style.borderColor = "#4f46e5";
    dropZone.style.background = "#111827";

});

dropZone.addEventListener("drop", function (e) {

    e.preventDefault();

    dropZone.style.borderColor = "#4f46e5";
    dropZone.style.background = "#111827";

    const files = e.dataTransfer.files;

    if (!files.length) return;

    selectedFile = files[0];

    preview.src = URL.createObjectURL(selectedFile);
    preview.style.display = "block";

    result.innerHTML = "✅ Video loaded successfully. Ready to convert.";

});
async function convertGIF() {

    if (!selectedFile) {
        result.innerHTML = "⚠️ Please upload a video first.";
        return;
    }

    progressBox.style.display = "block";
    progressBar.style.width = "5%";
    progressText.innerHTML = "Preparing video...";
        const video = document.createElement("video");

    video.src = URL.createObjectURL(selectedFile);

    video.muted = true;
    video.playsInline = true;

    await new Promise((resolve) => {

        video.onloadedmetadata = resolve;

    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 320;
    canvas.height = Math.round(video.videoHeight * (320 / video.videoWidth));

    progressBar.style.width = "15%";
    progressText.innerHTML = "Creating GIF encoder...";
    
