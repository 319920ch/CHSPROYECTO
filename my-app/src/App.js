import './App.css';

function App() {
  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <div className="espacioy2">
          <h1 className="titulo1"> Bienvenido a Soluciones Metálicas</h1>
          <p className="pprincipal">
            Somos una empresa metalúrgica líder en la industria, con más de 50 años de experiencia en la fabricación de productos de alta calidad. Nuestro compromiso con la excelencia y la innovación nos ha convertido en un socio confiable para nuestros clientes. <br></br>
          </p>
        </div>
        {/* <a href="#" className="button1">Más sobre nosotros</a> */}
      </div>
      <div className="contenedor3">
        <div className="card">
          <div className="header"><center><strong> Iniciar sesión</strong></center> </div>
            <center><img src="./LOGO.jpeg" alt="Logo de aplicación" / ></center>
          <div className="content">
            <p><center>Ingresa tus credenciales para acceder a tu cuenta</center></p>
            <div className="contenedor4">
              <div className="contenedor5">
                <label className="label" htmlFor="email">
                  Nombre de Usuario
                </label>
                <input
                  className="input"
                  id="nombre"
                  placeholder="Juan Perez"
                  type="nombre"
                />
              </div>
              <div className="contenedor5">
                <label className="label" htmlFor="contrasena">
                  Contraseña
                </label>
                <input
                  className="input"
                  id="contrasena"
                  type="contrasena"
                />
              </div>
            </div>
            <button className="button2">Iniciar sesión </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;