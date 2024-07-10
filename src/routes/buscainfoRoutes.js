const express = require('express');
const router = express.Router();
const buscainfo = require('../controllers/buscainfo');

router.post('/c', buscainfo.getContratoInfo);
router.post('/a', buscainfo.getAreasInfo);
router.get('/v', buscainfo.getContratosVigentes);  // Nueva ruta para contratos vigentes


module.exports = router;