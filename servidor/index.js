//Paquetes y modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//conexión base de datos
mongoose
  .connect(
    'mongodb+srv://montblack123:M0ngoBd123117@cluster0.dnkngga.mongodb.net/nomina?retryWrites=true&w=majority',
  )

  .then(function (db) {
    console.log('conectado a la base de datos');
  })
  .catch(function (err) {
    console.log(err);
  });

//configuraciones
//configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/js', express.static(path.resolve('../cliente/administrador/js')));
app.use(
  '/css',
  express.static(path.resolve('../cliente/administrador/css')),
);

const Admin = require('./models/administrador');
const Empleados = require('./models/empleados');
const Deducible = require('./models/deducibles');
const Cargos = require('./models/cargos');
const Horas_extra = require('./models/horas_extra');

//Ruta Principal
app.get('/', function (req, res) {
  res.sendFile(path.resolve('../cliente/home/html/index.html'));
});

/* Rutas Brandon  */
// Inicio de sesion administrador
app.post('/login_admin', async function (req, res) {
  let login_usuario = res.body.usuario;
  let login_contras = res.body.contrasena;
  let existe_admin = await Admin.findOne({
    $and: [{ usuario: login_usuario }, { contrasena: login_contras }],
  });

  if (existe_admin != null) {
    res.send('Bienvenido de nuevo');
    console.log('claves ' + existe_admin.usuario, existe_admin.contrasena);
  } else {
    res.send('Usuario no encontrado');
  }
});

/*Rutas Nataly*/
app.get("/listado-empleados", function (req, res) {
  res.sendFile(path.resolve("../cliente/administrador/html/listado-empleados.html"));
});

//Ruta -Obtener empleados de la BD
app.get("/obtenerListadoEmpleados", async function (req, res) {
  let docs = await Empleados.find();
  res.send(docs);
});

app.post("/agregar-empleados", async function (req, res) {
  let datos_enviados = req.body;
  let nuevo_registro = new Empleados(datos_enviados);
  await nuevo_registro.save();
  res.send("Se registro el empleado");
});

app.get('/form-empleados', function(req, res){
  res.sendFile(path.resolve('../cliente/administrador/html/agregar-empleado.html'))
})

// Horas extra
app.get("/listado-horas-extra", function (req, res) {
  res.sendFile(path.resolve("../cliente/administrador/html/listado-horas-extras.html"));
});

app.get("/obtenerListadoHorasExtra", async function (req, res) {
  let doc = await Horas_extra.find();
  res.send(doc);
});

app.post("/agregar-horas-extra", async function (req, res) {
  let datos_enviados = req.body;
  let nuevo_registro = new Horas_extra(datos_enviados);
  await nuevo_registro.save();
  res.send("Se registro la hora extra");
});

app.get("/form-horas-extras", function (req, res) {
  res.sendFile(path.resolve("../cliente/administrador/html/agregar-horas-extras.html"));
});

//Deducibles
app.get("/listado-deducibles", function (req, res) {
  res.sendFile(path.resolve("../cliente/administrador/html/listado-deducibles.html"));
});

app.get("/obtenerListadoDeducibles", async function (req, res) {
  let ded = await Deducible.find();
  res.send(ded);
});

app.listen(3000, function () {
  console.log('Servidor listo y preparado en el puerto 3000');
});
