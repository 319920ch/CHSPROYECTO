const express = require('express');
const router = express.Router();
const buscainfo = require('../controllers/buscainfo');

router.get('/c', buscainfo.getContratoInfo);
router.post('/a', buscainfo.getAreasInfo);

module.exports = router;