const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const analyzeBtn = document.getElementById("analyzeBtn");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
    result.innerHTML = "";
  }
});

analyzeBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];

  if (!file) {
    result.innerHTML = "Please select an image first.";
    return;
  }

  result.innerHTML = "Analyzing image...";

  const reader = new FileReader();

  reader.onloadend = async () => {
  try {
    const base64 = reader.result.split(",")[1];

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64,
        mimeType: file.type,
      }),
    });

    const data = await response.json();

    if (data.result) {
      result.innerHTML = `<pre>${data.result}</pre>`;
    } else {
      result.innerHTML = data.error || "Something went wrong.";
    }
  } catch (err) {
    result.innerHTML = "Error: " + err.message;
  }
};

reader.readAsDataURL(file);
});