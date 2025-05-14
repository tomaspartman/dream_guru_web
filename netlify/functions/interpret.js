exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const prompt = `You are a wise dream guru. Someone had this dream: "${body.dream}". Please explain the hidden meaning behind it in a mystical and thoughtful way.`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-rw-1b", {
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
        body: JSON.stringify({ result: "The guru is thinking deeply... try again shortly." })
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error." })
    };
  }
};
