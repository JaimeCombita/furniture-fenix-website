import React, { useState } from 'react';
import { Button } from '../ui';
import { contactService } from '../../domains/contact';
import {
  hasContactValidationErrors,
  initialContactErrors,
  validateContactField,
  validateContactForm,
  type ContactFieldErrors,
  type ContactValidatedField,
} from '../../domains/contact';
import './ContactForm.css';

interface ContactFormProps {
  productId?: string;
}

type FormFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  productId: string;
};

type FieldTouched = Record<ContactValidatedField, boolean>;

const initialTouched: FieldTouched = {
  name: false,
  email: false,
  phone: false,
  subject: false,
  message: false
};

export const ContactForm: React.FC<ContactFormProps> = ({ productId }) => {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    productId: productId || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ContactFieldErrors>(initialContactErrors);
  const [touched, setTouched] = useState<FieldTouched>(initialTouched);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value
      };

      if (name in touched && touched[name as ContactValidatedField]) {
        const validatedField = name as ContactValidatedField;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [validatedField]: validateContactField(validatedField, value)
        }));
      }

      return updatedData;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!(name in touched)) return;

    const validatedField = name as ContactValidatedField;
    setTouched((prev) => ({
      ...prev,
      [validatedField]: true
    }));

    setErrors((prev) => ({
      ...prev,
      [validatedField]: validateContactField(validatedField, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validateContactForm(formData);
    const isValid = !hasContactValidationErrors(fieldErrors);

    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    });
    setErrors(fieldErrors);

    if (!isValid) {
      setSubmitMessage('Corrige los campos marcados antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await contactService.sendMessage(formData);
      setSubmitMessage(response.message || '¡Gracias por contactarnos! Te responderemos pronto.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        productId: productId || ''
      });
      setErrors(initialContactErrors);
      setTouched(initialTouched);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.';

      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nombre completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Tu nombre"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            className={errors.name ? 'input-error' : ''}
          />
          {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="tu@email.com"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            className={errors.email ? 'input-error' : ''}
          />
          {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="+57 300 123 4567"
            inputMode="numeric"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.phone)}
            className={errors.phone ? 'input-error' : ''}
          />
          {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="company">Empresa (opcional)</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject">Asunto *</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.subject)}
          className={errors.subject ? 'input-error' : ''}
        >
          <option value="">Selecciona un asunto</option>
          <option value="cotizacion">Solicitar cotización</option>
          <option value="informacion">Información de productos</option>
          <option value="licitacion">Licitaciones y contratos</option>
          <option value="servicio">Servicio post-venta</option>
          <option value="otro">Otro</option>
        </select>
        {touched.subject && errors.subject && <span className="field-error">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={6}
          placeholder="Escribe tu mensaje aquí..."
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          className={errors.message ? 'input-error' : ''}
        />
        {touched.message && errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      {submitMessage && (
        <div className={`submit-message ${submitMessage.includes('Gracias') ? 'success' : 'error'}`}>
          {submitMessage}
        </div>
      )}

      <Button 
        type="submit" 
        variant="primary" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="submit-loading" aria-live="polite">
            <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
            <span>Enviando...</span>
          </span>
        ) : 'Enviar mensaje'}
      </Button>
    </form>
  );
};
