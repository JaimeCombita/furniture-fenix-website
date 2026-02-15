import React, { useState } from 'react';
import { Button } from '../ui';
import './ContactForm.css';

interface ContactFormProps {
  productId?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    productId: productId || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Formulario enviado:', formData);
      setSubmitMessage('¡Gracias por contactarnos! Te responderemos pronto.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        productId: productId || ''
      });
    } catch {
      setSubmitMessage('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
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
            required
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+57 300 123 4567"
          />
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
          required
        >
          <option value="">Selecciona un asunto</option>
          <option value="cotizacion">Solicitar cotización</option>
          <option value="informacion">Información de productos</option>
          <option value="licitacion">Licitaciones y contratos</option>
          <option value="servicio">Servicio post-venta</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Escribe tu mensaje aquí..."
        />
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
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
};
