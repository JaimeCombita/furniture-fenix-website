import { createServer } from 'node:http';
import { sendContactEmail, validateContactPayload } from '../server/contact/core.mjs';

const PORT = Number(process.env.LOCAL_API_PORT || 3000);


const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  res.end(JSON.stringify(payload));
};

const server = createServer(async (req, res) => {
  if (req.url !== '/api/contact') {
    sendJson(res, 404, { success: false, message: 'Ruta no encontrada.' });
    return;
  }

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { success: false, message: 'Método no permitido.' });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    const payload = raw ? JSON.parse(raw) : {};

    const validationError = validateContactPayload(payload);
    if (validationError) {
      sendJson(res, 400, { success: false, message: validationError });
      return;
    }

    const safePayload = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      company: (payload.company || '').trim(),
      subject: payload.subject.trim(),
      message: payload.message.trim(),
      productId: (payload.productId || '').trim(),
    };

    const result = await sendContactEmail(safePayload);
    sendJson(res, result.statusCode, { success: result.success, message: result.message });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { success: false, message: 'El cuerpo de la solicitud no tiene un JSON válido.' });
      return;
    }

    console.error('Local API error:', error);
    sendJson(res, 500, { success: false, message: 'Ocurrió un error inesperado al enviar el mensaje.' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[local-api] Running on http://127.0.0.1:${PORT}`);
});
