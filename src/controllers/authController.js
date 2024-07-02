const Usuario = require('../models/usuariom');
const { generateToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/mailer');
const config = require('../config/config');

exports.forgotPassword = async (req, res) => {
  try {
    const { correo_electronico } = req.body;
    const user = await Usuario.findOne({ where: { correo_electronico } });
    if (!user) {
      return res.status(400).json({ message: 'El correo electrónico no está registrado' });
    }

    // Generate a password reset token
    const token = generateToken({ id: user.id }, '1h');

    // Send a password reset link to the user's email address
    const resetLink = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${token}`;
    await sendEmail(correo_electronico, 'Restablecer contraseña', `Hola,\n\nPara restablecer tu contraseña, visita el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste un restablecimiento de contraseña, ignora este correo electrónico.\n\nSaludos,\nEl equipo de CRIALED`);

    res.status(200).json({ message: 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return { error: 'El usuario no existe' };
    }
    return user;
  } catch (err) {
    return { error: 'Invalid token' };
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { contrasena } = req.body;

    // Verify the password reset token
    const payload = verifyToken(token, '1h');
    if (!payload) {
      return res.status(400).json({ message: 'El token de restablecimiento de contraseña ha expirado' });
    }

    // Update the user's password
    const user = await Usuario.findByPk(payload.id);
    if (!user) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    await user.update({ contrasena});

    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;
    const user = await Usuario.findOne({ where: { nombre, contrasena } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales Inválidas' });
    }
    res.status(200).json({ message: 'Ingreso exitoso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { nombre, correo_electronico, contrasena, id_rol } = req.body;
    const existingUser = await Usuario.findOne({ where: { nombre } });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe el usuario' });
    }

    // Verificar si el rol ya existe y si el id_rol es diferente de 8
    if (id_rol!== 8) {
      const existingRoleUser = await Usuario.findOne({ where: { id_rol } });
      if (existingRoleUser) {
        return res.status(400).json({ message: 'Ya existe un usuario con ese rol' });
      }
    }

    const user = await Usuario.create({
      nombre,
      correo_electronico,
      contrasena,
      id_rol,
    });
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};