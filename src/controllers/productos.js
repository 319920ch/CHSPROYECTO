const Producto = require('../models/productom');

exports.crearProducto = async (req, res) => {
  try {
    const { nombre_producto, descripcion_producto } = req.body;

    // Verificar que se hayan proporcionado todos los campos requeridos
    if (!nombre_producto || !descripcion_producto) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Crear un nuevo producto
    const nuevoProducto = await Producto.create({
      nombre_producto,
      descripcion_producto,
    });

    // Return the desired fields in the response
    res.status(201).json({
      id_producto: nuevoProducto.id_producto,
      nombre_producto: nuevoProducto.nombre_producto,
      descripcion_producto: nuevoProducto.descripcion_producto,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarProducto = async (req, res) => {
    try {
      const { id_producto } = req.body;
  
      // Verificar que se haya proporcionado el id del producto
      if (!id_producto) {
        return res.status(400).json({ error: 'Id del producto es requerido' });
      }
  
      // Verificar que el producto exista
      const producto = await Producto.findByPk(id_producto);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      // Eliminar el producto
      await producto.destroy();
  
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };