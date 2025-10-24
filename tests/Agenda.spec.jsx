import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils.jsx';

import Servicios from '../src/pages/Servicios.jsx';
import Agenda from '../src/pages/Agenda.jsx';

describe('Agenda page', () => {
  test('muestra mensaje cuando no hay citas', () => {
    renderWithProviders(<Agenda />);
    expect(screen.getByText(/no tienes citas aún/i)).toBeInTheDocument();
  });

  test('agendar desde Servicios agrega una fila en Agenda', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'alert').mockImplementation(() => {}); // ServiceCard usa alert

    renderWithProviders(
      <>
        <Servicios />
        <Agenda />
      </>
    );

    // Tomamos la PRIMERA tarjeta de servicio
    const card = screen.getAllByTestId('service-card')[0];

    // Rellenamos los campos dentro de esa card (evita confusiones)
    const nombre = within(card).getByPlaceholderText(/nombre cliente/i);
    const direccion = within(card).getByPlaceholderText(/dirección/i);
    const fechaInput = card.querySelector('input[type="datetime-local"]');

    await user.clear(nombre);
    await user.type(nombre, 'Juan Pérez');
    await user.type(direccion, 'Av. Siempre Viva 123');

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    await user.type(fechaInput, `${yyyy}-${mm}-${dd}T10:30`);

    // Agendar
    await user.click(within(card).getByRole('button', { name: /agendar/i }));

    // Verificamos la tabla y la fila con el cliente
    const tabla = await screen.findByRole('table');
    const filas = within(tabla).getAllByRole('row');
    const fila = filas.find(r => within(r).queryByText(/juan pérez/i));
    expect(fila).toBeTruthy();
  });
});
