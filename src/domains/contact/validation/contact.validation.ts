import type { ContactForm } from '../../../types';

export type ContactValidatedField = 'name' | 'email' | 'phone' | 'subject' | 'message';

export type ContactFieldErrors = Record<ContactValidatedField, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const initialContactErrors: ContactFieldErrors = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export const validateContactField = (field: ContactValidatedField, value: string): string => {
  const normalizedValue = value.trim();

  if (field === 'name') {
    if (!normalizedValue) return 'El nombre es obligatorio.';
    if (normalizedValue.length < 10) return 'El nombre debe tener mínimo 10 caracteres.';
    if (normalizedValue.length > 100) return 'El nombre debe tener máximo 100 caracteres.';
    return '';
  }

  if (field === 'email') {
    if (!normalizedValue) return 'El correo electrónico es obligatorio.';
    if (!emailPattern.test(normalizedValue)) return 'Ingresa un correo electrónico válido.';
    return '';
  }

  if (field === 'phone') {
    if (!normalizedValue) return 'El teléfono es obligatorio.';
    if (!/^\d+$/.test(normalizedValue)) return 'El teléfono debe contener solo números.';
    if (normalizedValue.length < 7) return 'El teléfono debe tener mínimo 7 caracteres.';
    return '';
  }

  if (field === 'subject') {
    if (!normalizedValue) return 'Debes seleccionar un asunto.';
    return '';
  }

  if (!normalizedValue) return 'El mensaje es obligatorio.';
  if (normalizedValue.length < 10) return 'El mensaje debe tener mínimo 10 caracteres.';
  return '';
};

export const validateContactForm = (
  data: Pick<ContactForm, ContactValidatedField>
): ContactFieldErrors => ({
  name: validateContactField('name', data.name),
  email: validateContactField('email', data.email),
  phone: validateContactField('phone', data.phone),
  subject: validateContactField('subject', data.subject),
  message: validateContactField('message', data.message),
});

export const hasContactValidationErrors = (fieldErrors: ContactFieldErrors): boolean => {
  return Object.values(fieldErrors).some((errorMessage) => Boolean(errorMessage));
};
