exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const prompt = `You are a mystical dream guru. Someone dreamed: "${body.dream}". Explain the meaning of this dream.`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloom-560m", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();

    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: data[0].generated_text })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: "The guru is meditating too deeply to respond right now. Try again soon." })
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error." })
    };
  }
};
