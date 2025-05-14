const API_TOKEN = "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";

async function interpretDream() {
  const dreamText = document.getElementById('dreamInput').value.trim();

  if (!dreamText) {
    document.getElementById('result').innerText = "Please describe your dream first.";
    return;
  }

  document.getElementById('result').innerText = "The guru is meditating on your dream... please wait.";

  const prompt = `You are an ancient dream guru. The user had the following dream:\n"${dreamText}"\nExplain what this dream means.`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-common_gen", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    });

    const data = await response.json();

    if (data && data[0] && data[0].generated_text) {
      document.getElementById('result').innerText = data[0].generated_text;
    } else {
      document.getElementById('result').innerText = "The guru could not interpret your dream at the moment.";
    }
  } catch (error) {
    document.getElementById('result').innerText = "Something went wrong. The guru is silent.";
    console.error("AI error:", error);
  }
}
