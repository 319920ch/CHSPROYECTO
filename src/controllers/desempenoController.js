const Desempeno = require('../models/desempenom');

// Crear un nuevo desempeño
exports.createDesempeno = async (req, res) => {
    try {
      const nuevoDesempeno = await Desempeno.create(req.body);
      res.status(201).json(nuevoDesempeno);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener todos los desempeños
  exports.getDesempenos = async (req, res) => {
    try {
      const desempenos = await Desempeno.findAll();
      res.status(200).json(desempenos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener un desempeño por ID
  exports.getDesempenoById = async (req, res) => {
    try {
      const desempeno = await Desempeno.findByPk(req.params.id);
      if (desempeno) {
        res.status(200).json(desempeno);
      } else {
        res.status(404).json({ message: 'Desempeño no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar un desempeño por ID
  exports.updateDesempeno = async (req, res) => {
    try {
      const [updated] = await Desempeno.update(req.body, {
        where: { id_desempeno: req.params.id }
      });
      if (updated) {
        const updatedDesempeno = await Desempeno.findByPk(req.params.id);
        res.status(200).json(updatedDesempeno);
      } else {
        res.status(404).json({ message: 'Desempeño no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar un desempeño por ID
  exports.deleteDesempeno = async (req, res) => {
    try {
      const deleted = await Desempeno.destroy({
        where: { id_desempeno: req.params.id }
      });
      if (deleted) {
        res.status(204).json({ message: 'Desempeño eliminado' });
      } else {
        res.status(404).json({ message: 'Desempeño no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };