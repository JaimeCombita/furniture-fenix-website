import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const subjectLabels = {
  cotizacion: 'Solicitar cotización',
  informacion: 'Información de productos',
  licitacion: 'Licitaciones y contratos',
  servicio: 'Servicio post-venta',
  otro: 'Otro',
};

export const readEnvFallback = (key) => {
  const envFiles = ['.env.local', '.env'];

  for (const fileName of envFiles) {
    const filePath = resolve(process.cwd(), fileName);
    if (!existsSync(filePath)) continue;

    const fileContent = readFileSync(filePath, 'utf-8');
    const lines = fileContent.split(/\r?\n/);

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      const separatorIndex = line.indexOf('=');
      if (separatorIndex === -1) continue;

      const parsedKey = line.slice(0, separatorIndex).trim();
      if (parsedKey !== key) continue;

      const parsedValue = line.slice(separatorIndex + 1).trim();
      return parsedValue.replace(/^['\"]|['\"]$/g, '');
    }
  }

  return undefined;
};

const sanitize = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const validateContactPayload = (payload) => {
  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const phone = (payload.phone || '').trim();
  const subject = (payload.subject || '').trim();
  const message = (payload.message || '').trim();

  if (!name || name.length < 10 || name.length > 100) {
    return 'El nombre debe tener mínimo 10 y máximo 100 caracteres.';
  }

  if (!emailPattern.test(email)) {
    return 'Correo electrónico inválido.';
  }

  if (!/^\d{7,}$/.test(phone)) {
    return 'El teléfono debe contener solo números y al menos 7 caracteres.';
  }

  if (!subject) {
    return 'Debes seleccionar un asunto.';
  }

  if (message.length < 10) {
    return 'El mensaje debe tener mínimo 10 caracteres.';
  }

  return null;
};

export const buildContactEmailHtml = (payload) => {
  const selectedSubject = subjectLabels[payload.subject] || payload.subject;

  return `
  <div style="margin:0;padding:24px;background-color:#F4F7F9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#2F3542;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #CED6E0;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:#154578;padding:20px 24px;">
          <h1 style="margin:0;color:#FFFFFF;font-size:22px;line-height:1.2;">Nuevo mensaje de contacto</h1>
          <p style="margin:8px 0 0 0;color:#DDE8F3;font-size:14px;">Fénix Mobiliario Institucional</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;width:170px;font-weight:700;color:#154578;">Nombre</td><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;color:#2F3542;">${sanitize(payload.name)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;font-weight:700;color:#154578;">Email</td><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;">${sanitize(payload.email)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;font-weight:700;color:#154578;">Teléfono</td><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;">${sanitize(payload.phone)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;font-weight:700;color:#154578;">Empresa</td><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;">${sanitize(payload.company || 'No indicada')}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;font-weight:700;color:#154578;">Asunto</td><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;">${sanitize(selectedSubject)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;font-weight:700;color:#154578;">Producto</td><td style="padding:10px 0;border-bottom:1px solid #E7EDF3;">${sanitize(payload.productId || 'No aplica')}</td></tr>
          </table>
          <div style="margin-top:18px;padding:16px;border-radius:8px;background:#F4F7F9;border:1px solid #CED6E0;">
            <p style="margin:0 0 8px 0;font-weight:700;color:#154578;">Mensaje</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.5;color:#2F3542;">${sanitize(payload.message)}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;background:#F8FAFC;border-top:1px solid #E7EDF3;color:#6B7785;font-size:12px;">
          Este correo fue generado automáticamente desde el formulario de contacto del sitio web.
        </td>
      </tr>
    </table>
  </div>`;
};

export const getContactEmailConfig = () => {
  const apiKey = process.env.RESEND_API_KEY || readEnvFallback('RESEND_API_KEY');
  const from = process.env.RESEND_FROM_EMAIL || readEnvFallback('RESEND_FROM_EMAIL') || 'Fenix Web <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || readEnvFallback('CONTACT_TO_EMAIL') || 'mobiliariofenix.07@gmail.com';

  return { apiKey, from, to };
};

export const sendContactEmail = async (payload) => {
  const { apiKey, from, to } = getContactEmailConfig();

  if (!apiKey) {
    return { success: false, statusCode: 500, message: 'Falta configurar RESEND_API_KEY en el servidor.' };
  }

  const resend = new Resend(apiKey);
  const subjectLabel = subjectLabels[payload.subject] || payload.subject;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `[Contacto Web] ${subjectLabel} - ${payload.name}`,
      html: buildContactEmailHtml(payload),
    });

    if (error) {
      return {
        success: false,
        statusCode: 502,
        message: `No fue posible enviar el correo en este momento: ${error.message || 'error de proveedor.'}`,
      };
    }

    return { success: true, statusCode: 200, message: '¡Gracias por contactarnos! Te responderemos pronto.' };
  } catch {
    return { success: false, statusCode: 500, message: 'Ocurrió un error inesperado al enviar el mensaje.' };
  }
};
