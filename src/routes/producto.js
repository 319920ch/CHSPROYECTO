const express = require('express');
const router = express.Router();
const producto = require('../controllers/productos');

router.post('/crear', producto.crearProducto);
router.delete('/eliminar', producto.eliminarProducto);

module.exports = router;