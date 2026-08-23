// Vercel Serverless Function — Gemini AI Chat Proxy
// Environment variable required: GEMINI_API_KEY

const SYSTEM_PROMPT = `You are AyurvedaDaily AI — a knowledgeable, warm, and supportive Ayurvedic wellness advisor.

LANGUAGE RULES:
- Always respond in the SAME language the user writes in. If they write in Hindi, respond in Hindi. If they write in Spanish, respond in Spanish. And so on for any language.
- If the user asks you to switch to a different language, comply immediately and continue in that language.
- Maintain natural, fluent responses in any language.

EXPERTISE:
- Ayurvedic doshas (Vata, Pitta, Kapha) — constitution analysis, imbalances, and balancing strategies
- Herbs and natural remedies — Ashwagandha, Turmeric, Tulsi, Triphala, Brahmi, Shatavari, Neem, Amla, and more
- Daily routines (Dinacharya) — morning rituals, meal timing, evening wind-down
- Seasonal routines (Ritucharya) — adapting lifestyle to seasons
- Diet and nutrition according to Ayurveda — six tastes, food combining, dosha-specific diets
- Yoga, pranayama, and meditation — practices for each dosha
- Panchakarma and detoxification concepts
- Ayurvedic skincare and beauty practices

GUIDELINES:
- Be friendly, concise, and practical in your responses.
- Use emojis sparingly (1-2 per response) to keep the tone warm and approachable.
- Always include a brief disclaimer when giving specific health-related advice: "This is for informational purposes only. Please consult a qualified practitioner for personalized guidance."
- If the user asks for a remedy that is not listed in our standard database or on the website, DO NOT just say it's not in the database. Instead, provide useful Ayurvedic tips and suggest a safe home remedy using common Ayurvedic ingredients, clearly stating that it is an AI-generated suggestion.
- If asked about topics outside Ayurveda and wellness, politely redirect: "I specialize in Ayurvedic wellness. For that question, I'd recommend consulting the appropriate resource. Is there anything about Ayurveda I can help with?"
- Format responses with clear structure — use short paragraphs and bullet points for lists.
- When discussing doshas, use their associated elements (Vata=Air+Space, Pitta=Fire+Water, Kapha=Earth+Water).
- For herb recommendations, always mention how to use them and any general cautions.
- Keep responses concise (2-4 short paragraphs max) unless the user asks for detailed information.`;

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
    const { message, history = [], userDosha } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation contents for Gemini API
    const contents = [];

    // Add conversation history
    for (const entry of history) {
      contents.push({
        role: entry.role === 'user' ? 'user' : 'model',
        parts: [{ text: entry.text }],
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });
    
    let dynamicPrompt = SYSTEM_PROMPT;
    if (userDosha) {
      dynamicPrompt += `\n\nUSER CONTEXT:\nThe user has taken the Dosha quiz and their dominant dosha is ${userDosha.toUpperCase()}. Tailor your advice and recommendations to this dosha specifically when relevant.`;
    }

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
    let lastStatus = null;

    // Fallback Loop
    for (const model of MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        const geminiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: dynamicPrompt }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              topP: 0.9,
              topK: 40,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            ],
          }),
        });

        if (geminiResponse.ok) {
          data = await geminiResponse.json();
          break; // Success! Break out of the loop
        } else {
          lastStatus = geminiResponse.status;
          lastError = await geminiResponse.text();
          console.warn(`Model ${model} failed with status ${lastStatus}: ${lastError}`);
          // If it's a 429 (Rate Limit) or 503 (Unavailable), continue to next model.
          // For now, we will fallback on ANY error just to be safe.
        }
      } catch (e) {
        console.warn(`Fetch error for model ${model}:`, e);
        lastError = e.message;
      }
    }

    if (!data) {
      console.error('All models failed. Last error:', lastStatus, lastError);
      return res.status(502).json({
        error: 'Failed to get response from Gemini after trying all fallback models.',
        detail: lastStatus,
      });
    }

    // Extract the response text
    const responseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I apologize, but I was unable to generate a response. Please try again.';

    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
