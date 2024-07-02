const Usuario = require('../models/usuariom');

exports.modificarRol = async (req, res) => {
    try {
        const { nombre, nuevoRol } = req.body;

        // Verificar que el nuevo rol esté en el rango del 1 al 7
        if (nuevoRol < 1 || nuevoRol > 7) {
            return res.status(400).json({ message: 'El nuevo rol debe estar en el rango del 1 al 7' });
        }

        // Verificar si existe algún usuario con el nuevo rol
        const existingUser = await Usuario.findOne({
            where: {
                id_rol: nuevoRol
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: `Ya existe un usuario con el rol ${nuevoRol}` });
        }

        // Actualizar el rol del usuario
        const usuario = await Usuario.update({
            id_rol: nuevoRol
        }, {
            where: {
                nombre: nombre
            }
        });

        res.status(200).json({
            message: 'Rol de usuario actualizado',
            usuario
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar rol de usuario' });
    }
};

