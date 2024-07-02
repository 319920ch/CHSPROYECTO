const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => {
  // Solo usuarios autenticados pueden acceder a esta ruta
  res.json({ message: 'Bienvenido a tu perfil!' });
});