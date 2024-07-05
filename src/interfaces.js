const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/conexiones'); // Asegúrate de tener la ruta correcta
const authRoutes = require('./routes/authRoutes'); // Importa el archivo de rutas de autenticación
const path = require('path');
const rolesRoutes = require('./routes/rolRoutes'); // Ajusta el nombre del archivo según corresponda
const initC = require('./routes/initContrato'); // Ajusta el nombre del archivo según corresponda
const productos = require('./routes/productoRoutes'); // Ajusta el nombre del archivo según corresponda
const initP = require('./routes/initProyectoRoutes');
const contratos = require('./routes/contratoRoutes');
const estados = require('./routes/estadoRoutes');
const buscainfo = require('./routes/buscainfoRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas 
app.use('/auth', authRoutes); // Usa '/auth' como prefijo para las rutas de autenticación
app.use('/api/roles', rolesRoutes); // Asegúrate de que la ruta base es /api/roles
app.use('/api/productos', productos); // Asegúrate de que la ruta base es /api/roles
app.use('/api/initC', initC); // Asegúrate de que la ruta base es /api/roles
app.use('/api/initP', initP);
app.use('/api/contratos', contratos);
app.use('/api/estados', estados);
app.use('/api/buscainfo', buscainfo);

// Ruta para renderizar la página de inicio
app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio', message: 'Bienvenido! Por favor inicia sesión o regístrate.' });
});

// Ruta para manejar otros posibles errores de rutas
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Conectar a la base de datos y sincronizar modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    return sequelize.sync(); // Sincronizar modelos
  })
  .then(() => {
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });