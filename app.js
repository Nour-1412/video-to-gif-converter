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
        await ffmpeg.load();
    }

    result.innerHTML = "⚙️ Converting video...";

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(selectedFile));

    let args = [
        '-i', 'input.mp4',
        '-vf', `fps=${quality},scale=320:-1`
    ];

    if (start) {
        args.unshift('-ss', start);
    }

    if (end) {
        args.push('-to', end);
    }

    args.push('output.gif');

    await ffmpeg.run(...args);

    const data = ffmpeg.FS('readFile', 'output.gif');

    const gifUrl = URL.createObjectURL(
        new Blob([data.buffer], { type: 'image/gif' })
    );

    result.innerHTML = `
        🎉 Conversion Completed!<br><br>
        <img src="${gifUrl}" style="max-width:100%; border-radius:10px;"><br><br>
        <a href="${gifUrl}" download="converted.gif"
           style="display:inline-block;padding:10px 20px;background:#06b6d4;color:white;text-decoration:none;border-radius:8px;">
           ⬇ Download GIF
        </a>
    `;
}
