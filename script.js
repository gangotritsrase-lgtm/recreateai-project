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

analyzeBtn.addEventListener("click", () => {
  const file = imageInput.files[0];

  if (!file) {
    result.innerHTML = "Please select an image first.";
    return;
  }

  result.innerHTML =
    "<h3>Selected Image</h3><p>AI integration will be added in the next step.</p>";
});