import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('renders registration form', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Nombres/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Apellidos/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Fecha de Nacimiento/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
});

test('registers a user and displays in the list', async () => {
  render(<App />);
  
  // Simulamos el registro de un usuario
  fireEvent.change(screen.getByPlaceholderText(/Nombres/i), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByPlaceholderText(/Apellidos/i), { target: { value: 'Pérez' } });
  fireEvent.change(screen.getByPlaceholderText(/Fecha de Nacimiento/i), { target: { value: '2000-01-01' } });
  fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: '123456' } });
  
  // Hacemos click en el botón de registro
  fireEvent.click(screen.getByText(/Registrar/i));
  
  // Esperamos a que el usuario registrado aparezca en la lista
  await waitFor(() => {
    expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
  });
});
