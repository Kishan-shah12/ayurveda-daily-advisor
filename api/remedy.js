// Vercel Serverless Function — Gemini AI Symptom Checker Proxy
// Environment variable required: GEMINI_API_KEY

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  try {
    const { symptom, dosha } = req.body;

    if (!symptom || typeof symptom !== 'string') {
      return res.status(400).json({ error: 'Symptom is required' });
    }

    const systemPrompt = `You are an expert Ayurvedic practitioner. A user is describing a problem or symptom they are experiencing.
Your goal is to provide a single, highly effective, safe Ayurvedic home remedy for their problem.

Guidelines:
1. Format your response beautifully. You can use markdown like **bolding** for emphasis.
2. Keep it concise: A short intro, the ingredients needed, and how to use it.
3. If they provide a dosha, tailor the remedy specifically to balance that dosha.
4. Do NOT include a medical disclaimer (the UI already has one).
5. Only provide ONE primary remedy to keep it simple and actionable.
6. Use an encouraging, warm tone.
`;

    const userPrompt = `I am experiencing: "${symptom}"` + (dosha ? `\nMy dominant dosha is: ${dosha}` : '');

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }],
          }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 400,
        }
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API error (${geminiResponse.status})`);
    }

    const data = await geminiResponse.json();
    
    // Extract text response
    let text = '';
    if (data.candidates && data.candidates[0]?.content?.parts) {
      text = data.candidates[0].content.parts.map(p => p.text).join('\n');
    }

    if (!text) {
      throw new Error('Received empty response from AI model');
    }

    return res.status(200).json({ remedy: text });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
