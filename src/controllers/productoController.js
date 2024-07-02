const Producto = require('../models/productom');

// Crear un nuevo área
exports.createProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las áreas
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un área por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un área por ID
exports.updateProducto = async (req, res) => {
  try {
    const [updated] = await Producto.update(req.body, {
      where: { id_producto: req.params.id }
    });
    if (updated) {
      const updatedProducto = await Producto.findByPk(req.params.id);
      res.status(200).json(updatedProducto);
    } else {
      res.status(404).json({ message: 'Producto no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un área por ID
exports.deleteProducto = async (req, res) => {
  try {
    const deleted = await Producto.destroy({
      where: { id_producto: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Producto eliminada' });
    } else {
      res.status(404).json({ message: 'Producto no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

