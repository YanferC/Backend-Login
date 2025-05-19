// LoginService/IndexLogin.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../users');

const app = express();
const SECRET_KEY = 'clave_secreta'; // <-- debe coincidir con el otro servicio

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Incluye la cédula en el token
  const token = jwt.sign(
    { id: user.id, username: user.username, cedula: user.cedula },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.listen(3000, () => {
  console.log('Servidor de login escuchando en http://localhost:3000');
});
