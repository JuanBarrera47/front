import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    password: ''
  });

  useEffect(() => {
    // Obtener los usuarios registrados desde el backend
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enviar los datos del usuario al backend
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
      // Actualizar la lista de usuarios después de registrar
      fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(data => setUsers(data));

      // Limpiar el formulario
      setFormData({ nombres: '', apellidos: '', fechaNacimiento: '', password: '' });
    });
  };

  return (
    <div className="App">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          placeholder="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <h2>Usuarios Registrados</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.nombres} {user.apellidos}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
