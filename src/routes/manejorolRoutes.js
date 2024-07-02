const express = require('express');
const router = express.Router();
const manejorolController = require('../controllers/manejorol');

router.put('/modificarR', manejorolController.modificarRol);

module.exports = router;
