async function obtenerProductos() {
    try {
      const response = await fetch("api/productos/");
      const productos = await response.json();
      return productos;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
  
  export default obtenerProductos;