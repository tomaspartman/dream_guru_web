async function interpretDream() {
  const dreamText = document.getElementById('dreamInput').value.trim();

  if (!dreamText) {
    document.getElementById('result').innerText = "Please describe your dream first.";
    return;
  }

  document.getElementById('result').innerText = "The guru is meditating on your dream... please wait.";

  try {
    const response = await fetch("https://rad-cuchufli-39c86d.netlify.app/.netlify/functions/interpret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dream: dreamText })
    });

    const data = await response.json();

    if (data.result) {
      document.getElementById('result').innerText = data.result;
    } else {
      document.getElementById('result').innerText = "The guru could not interpret your dream at the moment.";
    }

  } catch (error) {
    document.getElementById('result').innerText = "Something went wrong. The guru is silent.";
    console.error("Function error:", error);
  }
}
