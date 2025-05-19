// users.js
const bcrypt = require('bcryptjs');

// Contraseña encriptada para "admin123"
const hashedPassword = bcrypt.hashSync('admin123', 8);

const users = [
  {
    id: 1,
    username: 'admin',
    password: hashedPassword,
    cedula: '12345678' // <- Agregado
  }
];

module.exports = users;
