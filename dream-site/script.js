function interpretDream() {
  const dreamText = document.getElementById('dreamInput').value.trim();
  
  if (!dreamText) {
    document.getElementById('result').innerText = "Please describe your dream first.";
    return;
  }

  document.getElementById('result').innerText = "The guru is meditating on your dream... please wait.";

  // AI funkciu doplníme v ďalšom kroku
}