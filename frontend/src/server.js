const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// Endpoint para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { nombres, apellidos, fechaNacimiento, password } = req.body;
  users.push({ nombres, apellidos, fechaNacimiento, password });
  res.status(201).send({ message: 'Usuario registrado exitosamente' });
});

// Endpoint para obtener la lista de usuarios
app.get('/api/users', (req, res) => {
  res.send(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
