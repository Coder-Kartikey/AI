export async function summarize(text) {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_HF_TOKEN`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const data = await res.json();
  return data[0]?.summary_text;
}
