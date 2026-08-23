// Local development API server for Gemini chat
// Run: node api-dev-server.js
// Requires: GEMINI_API_KEY environment variable or .env file

import { createServer } from 'http';
import { config } from 'dotenv';

// Load .env file if present
config();

// Import the handler dynamically
const handlerModule = await import('./api/chat.js');
const handler = handlerModule.default;

const PORT = 3001;

const server = createServer(async (req, res) => {
  // Parse body for POST requests
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        req.body = JSON.parse(body);
      } catch {
        req.body = {};
      }

      // Create a response-like object compatible with Vercel handler
      const mockRes = {
        statusCode: 200,
        headers: {},
        setHeader(key, value) { this.headers[key] = value; },
        status(code) { this.statusCode = code; return this; },
        json(data) {
          res.writeHead(this.statusCode, { ...this.headers, 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data));
        },
        end() { res.writeHead(this.statusCode, this.headers); res.end(); },
      };

      await handler(req, mockRes);
    });
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🧘 AyurvedaDaily API dev server running on http://localhost:${PORT}`);
  console.log(`   GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ Found' : '❌ Missing — set it in .env or environment'}\n`);
});
