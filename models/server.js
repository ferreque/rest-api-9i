const express = require("express");
const cors = require("cors");
//importar conexion a DB
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    //cosas que quiero que se inicialicen cuando se levante el server
    this.app = express();
    this.usuariosPath = "/api/usuarios";
    //conexion
    this.conectarDB();
    //middleweres
    this.middleweres();
    //rutas
    this.routes();
  }

  //funcion para conectar la DB
  async conectarDB() {
    await dbConnection();
  }

  middleweres() {
    //Carpeta publica (todos uran el .use())
    this.app.use(express.static("public"));
    //cors
    this.app.use(cors());

    //acceso al body leer y parsear
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
