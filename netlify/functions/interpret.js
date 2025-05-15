exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: "You are an ancient dream guru. Speak in a poetic, wise, and metaphorical tone. Interpret dreams with depth and a touch of mysticism."
          },
          {
            role: "user",
            content: `I had this dream: "${body.dream}". What does it mean?`
          }
        ],
        temperature: 0.85,
        max_tokens: 400
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid response from OpenAI", details: data })
      };
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function error", message: error.message })
    };
  }
};
