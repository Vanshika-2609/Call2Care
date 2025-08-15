document.getElementById("submitBtn").addEventListener("click", async function () {
    const fileInput = document.getElementById("audioUpload");
    const resultBox = document.getElementById("result");

    // Clear previous result
    resultBox.innerHTML = "";
    resultBox.style.display = "block";

    if (!fileInput.files.length) {
        resultBox.innerHTML = "<span class='loading'>Please upload a .wav audio file.</span>";
        return;
    }

    const file = fileInput.files[0];
    if (file.type !== "audio/wav") {
        resultBox.innerHTML = "<span class='loading'>Only .wav files are supported.</span>";
        return;
    }

    // Show loading message
    resultBox.innerHTML = "<span class='loading'>Processing your audio... Please wait.</span>";

    // Prepare form data
    const formData = new FormData();
    formData.append("audio", file);

    try {
        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to process file. Server error.");
        }

        const data = await response.json();

        // Display diagnosis result
        resultBox.innerHTML = `
            <h3>Diagnosis Result</h3>
            <p><strong>Diagnosis:</strong> ${data.diagnosis}</p>
            <p><strong>Recommended Tests:</strong> ${data.recommended_tests.join(", ")}</p>
        `;
    } catch (error) {
        resultBox.innerHTML = `<span class='loading'>Error: ${error.message}</span>`;
    }
});
