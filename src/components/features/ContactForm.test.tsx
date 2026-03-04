import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

vi.mock('../../domains/contact', async () => {
  const actual = await vi.importActual<typeof import('../../domains/contact')>('../../domains/contact');

  return {
    ...actual,
    contactService: {
      sendMessage: vi.fn().mockResolvedValue({
        success: true,
        message: 'Mensaje enviado con éxito',
      }),
    },
  };
});

describe('ContactForm', () => {
  it('envía el formulario con datos válidos', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nombre completo/i), 'Cliente Prueba QA');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'cliente@prueba.com');
    await user.type(screen.getByLabelText(/teléfono/i), '3001234567');
    await user.selectOptions(screen.getByLabelText(/asunto/i), 'informacion');
    await user.type(screen.getByLabelText(/mensaje/i), 'Necesito información detallada de sus productos.');

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByText(/mensaje enviado con éxito/i)).toBeInTheDocument();
  });
});
