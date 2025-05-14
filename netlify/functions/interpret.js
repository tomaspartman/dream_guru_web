exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const prompt = `You are a mystical dream guru. The user dreamed: "${body.dream}". Explain the meaning.`;

    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "HuggingFace API error", details: errText })
      };
    }

    const data = await response.json();

    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: data[0].generated_text })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: "The guru is deep in thought. Try again soon." })
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function crashed", message: err.message })
    };
  }
};
