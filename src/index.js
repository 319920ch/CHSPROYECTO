const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const rolesRoutes = require('./routes/rolRoutes'); // Ajusta el nombre del archivo según corresponda
//const initCI = require('./routes/initContrato/iniciar'); // Ajusta el nombre del archivo según corresponda
//const initCI = require('./routes/initContrato/iniciar'); // Ajusta el nombre del archivo según corresponda

// Configuración de la aplicación
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a la base de datos
const db = require('./database/conexiones');
db.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Rutas de la aplicación
app.use('/api', routes);
// Usar rutas para roles
app.use('/api/roles', rolesRoutes); // Asegúrate de que la ruta base es /api/roles
//app.use('/api/initC/iniciar', initCI); // Asegúrate de que la ruta base es /api/roles

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});