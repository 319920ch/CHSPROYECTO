const Empleado = require('../models/empleadom');

// Helper function to validate Ecuadorian ID (cedula)
function validateCedula(cedula) {
  if (cedula.length !== 10) return false;
  const digits = cedula.split('').map(Number);
  const provinceCode = parseInt(cedula.substring(0, 2), 10);

  if (provinceCode < 1 || provinceCode > 24) return false;

  const lastDigit = digits.pop();
  const sum = digits.reduce((acc, digit, index) => {
    if (index % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    return acc + digit;
  }, 0);

  const verifier = 10 - (sum % 10);
  return lastDigit === (verifier === 10 ? 0 : verifier);
}

// Helper function to validate phone number
function validatePhoneNumber(phoneNumber) {
  return phoneNumber.length === 10 && phoneNumber.startsWith('09');
}

// Method to register a new employee
exports.registerEmpleado = async (req, res) => {
    try {
    const { nombres, apellidos, cedula, tiempo_exp_general, numero_contacto } = req.body;

    if (!validateCedula(cedula)) {
        return res.status(400).json({ message: 'Cedula ecuatoriana inválida' });
    }

    if (!validatePhoneNumber(numero_contacto)) {
        return res.status(400).json({ message: 'Número de contacto inválido, debe tener 10 dígitos y empezar con 09' });
    }

       // Check if the cedula is already in use
        const existingEmpleado = await Empleado.findOne({ where: { cedula } });
        if (existingEmpleado) {
        return res.status(400).json({ message: 'La cédula ya está registrada' });
        }

        // Create new employee
        const newEmpleado = await Empleado.create({
        nombres,
        apellidos,
        cedula,
        tiempo_exp_general,
        numero_contacto
        });

        return res.status(201).json(newEmpleado);
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el empleado', error: error.message });
    }
    };
