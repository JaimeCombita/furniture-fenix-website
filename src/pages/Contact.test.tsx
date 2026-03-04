import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './Contact';

describe('ContactPage', () => {
  it('renderiza el encabezado y formulario de contacto', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /contáctanos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /envíanos un mensaje/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });
});
