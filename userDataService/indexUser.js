// userDataService/indexUser.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());

const SECRET_KEY = 'clave_secreta'; // misma clave

const datosUsuarios = {
  "12345678": {
    nombre: "Juan Pérez",
    email: "juan@example.com",
    telefono: "555-1234"
  }
};

app.get('/datos', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ mensaje: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const cedula = decoded.cedula;
    const datos = datosUsuarios[cedula];

    if (datos) {
      res.json(datos);
    } else {
      res.status(404).json({ mensaje: 'Datos no encontrados' });
    }
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
});

app.listen(4000, () => {
  console.log('Microservicio de datos personales en http://localhost:4000');
});
