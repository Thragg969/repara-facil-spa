import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../src/pages/Home.jsx';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Home page', () => {
  it('muestra el título de bienvenida', () => {
    renderHome();
    // Ajusta el texto exacto al que tengas en Home.jsx
    expect(screen.getByText(/Bienvenido a ReparaFácil/i)).toBeInTheDocument();
  });

  it('tiene un botón para ver servicios', () => {
    renderHome();
    expect(screen.getByRole('button', { name: /ver servicios/i })).toBeInTheDocument();
  });

  it('renderiza al menos un técnico destacado (por title)', () => {
    renderHome();
    // Ajusta el title si en tu UI usas otro texto
    const anyCard = screen.queryAllByTitle(/Técnico:/i);
    expect(anyCard.length).toBeGreaterThan(0);
  });
});
