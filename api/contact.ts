import { sendContactEmail, validateContactPayload } from '../server/contact/core.mjs';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  productId?: string;
};

type VercelRequest = {
  method?: string;
  body?: ContactPayload;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
};


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Método no permitido.' });
  }

  let payload: ContactPayload = {};

  try {
    payload = req.body || {};
  } catch {
    return res.status(400).json({
      success: false,
      message: 'El cuerpo de la solicitud no tiene un JSON válido.'
    });
  }

  const validationError = validateContactPayload(payload);

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  const safePayload = {
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    company: (payload.company || '').trim(),
    subject: payload.subject!.trim(),
    message: payload.message!.trim(),
    productId: (payload.productId || '').trim()
  };

  const result = await sendContactEmail(safePayload);
  return res.status(result.statusCode).json({
    success: result.success,
    message: result.message
  });
}
