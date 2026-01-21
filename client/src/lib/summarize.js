export async function summarizeText(text) {
  const res = await fetch(
    "https://fbugcprrzotnouwtdmpd.supabase.co/functions/v1/summarize",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.slice(0, 1500),
      }),
    }
  );

  const data = await res.json();

  console.log("AI RAW RESPONSE 👉", data);

  if (Array.isArray(data) && data.length > 0) {
    return data[0].summary_text;
  }

  if (data.error && data.estimated_time) {
    throw new Error("AI model is loading. Try again in a few seconds.");
  }

  if (data.error) {
    throw new Error(data.error);
  }

  throw new Error("Unexpected AI response");
}
