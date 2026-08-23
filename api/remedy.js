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

    // Priority list of models to fallback on if rate limit is hit
    const MODELS = [
      'gemini-3.5-flash', 
      'gemini-3.6-flash', 
      'gemini-2.5-flash', 
      'gemini-3.1-flash-lite', 
      'gemini-3.5-flash-lite'
    ];

    let data = null;
    let lastError = null;

    for (const model of MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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

        if (geminiResponse.ok) {
          data = await geminiResponse.json();
          break; // Success! Break out of loop
        } else {
          lastError = await geminiResponse.json().catch(() => ({}));
          console.warn(`Model ${model} failed:`, geminiResponse.status, lastError);
        }
      } catch (e) {
        console.warn(`Fetch error for model ${model}:`, e);
        lastError = { error: { message: e.message } };
      }
    }

    if (!data) {
      throw new Error(lastError?.error?.message || 'Failed to get response from any Gemini model after fallback.');
    }
    
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
