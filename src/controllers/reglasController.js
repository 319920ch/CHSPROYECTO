const Regla = require('../models/reglas');

// Crear una nueva regla
exports.createRegla = async (req, res) => {
    try {
        const { nombre, valor } = req.body;
        const nuevaRegla = await Regla.create({ nombre, valor });
        res.status(201).json(nuevaRegla);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la regla' });
    }
};

// Obtener todas las reglas
exports.getReglas = async (req, res) => {
    try {
        const reglas = await Regla.findAll();
        res.status(200).json(reglas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las reglas' });
    }
};

// Obtener una regla por ID
exports.getReglaById = async (req, res) => {
    try {
        const { id } = req.params;
        const regla = await Regla.findByPk(id);
        if (!regla) {
            res.status(404).json({ message: 'Regla no encontrada' });
        } else {
            res.status(200).json(regla);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la regla' });
    }
};

// Actualizar una regla por ID
exports.updateRegla = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, valor } = req.body;

        const regla = await Regla.findByPk(id);
        if (!regla) {
            res.status(404).json({ message: 'Regla no encontrada' });
        } else {
            regla.nombre = nombre;
            regla.valor = valor;
            await regla.save();
            res.status(200).json(regla);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la regla' });
    }
};

// Eliminar una regla por ID
exports.deleteRegla = async (req, res) => {
    try {
        const { id } = req.params;
        const regla = await Regla.findByPk(id);
        if (!regla) {
            res.status(404).json({ message: 'Regla no encontrada' });
        } else {
            await regla.destroy();
            res.status(204).json({ message: 'Regla eliminada correctamente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la regla' });
    }
};
