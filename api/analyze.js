export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image, mimeType } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Identify this object and provide:\n1. Object Name\n2. Description\n3. Uses\n4. Interesting Facts"
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: image
                  }
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

console.log(data);

if (!response.ok) {
  return res.status(response.status).json({
    error: data.error?.message || "Gemini API error"
  });
}

const text =
  data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  "No result found.";

    return res.status(200).json({ result: text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to analyze image",
    });
  }
}