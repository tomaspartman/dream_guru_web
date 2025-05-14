exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const prompt = `You are an ancient dream guru. The user had the following dream:\n"${body.dream}"\nExplain what this dream means.`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();

    console.log("Hugging Face API response:", JSON.stringify(data)); // pridaj si toto pre debug

    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: data[0].generated_text })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: "The guru is still in deep meditation. Try again shortly." })
      };
    }

  } catch (err) {
    console.error("Server error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error." })
    };
  }
};
