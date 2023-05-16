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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.resolve('../cliente/administrador/css')));
app.use('/js', express.static(path.resolve('../cliente/administrador/js')));
app.use('/js', express.static(path.resolve('../cliente/home/js')));
app.use('/css', express.static(path.resolve('../cliente/home/css')));
app.use('/js', express.static(path.resolve('../cliente/empleado/js')));
app.use('/css', express.static(path.resolve('../cliente/empleado/css')));
app.use('/css', express.static(path.resolve('../cliente/administrador/css')));
app.use('/js', express.static(path.resolve('../cliente/administrador/js')));
app.use('/js', express.static(path.resolve('../cliente/home/js')));
app.use('/css', express.static(path.resolve('../cliente/home/css')));
app.use('/js', express.static(path.resolve('../cliente/empleado/js')));
app.use('/css', express.static(path.resolve('../cliente/empleado/css')));

const Admin = require('./models/administrador');
const Empleados = require('./models/empleados');
const Deducible = require('./models/deducibles');
const Cargos = require('./models/cargos');
const Horas_extra = require('./models/horas_extra');
const Tarjeta = require('./models/marcar_tarjeta');

//Ruta Principal
app.get('/', function (req, res) {
  //res.sendFile(path.resolve('../cliente/home/html/crearadmin.html'));
  res.sendFile(path.resolve('../cliente/home/html/index.html'));
});

app.post('/crear-admin', async function (req, res) {
  const { usuario, contrasena } = req.body;
  /* const saltRounds = 10;
  const passwordHash = await bcrypt.hash(contrasena, saltRounds); */
  const administrador = new Admin({ usuario, contrasena });
  await administrador.save();
  res.send('Guardados satisfactoriamente');
});
/* Rutas Brandon  */
// Inicio de sesion administrador
app.post('/login-admin', async function (req, res) {
  const { usuario, contrasena } = req.body;

  let existe_admin = await Admin.findOne({
    $and: [{ usuario }, { contrasena }],
  });
  console.log(existe_admin);
  if (existe_admin != null) {
    res.send(existe_admin);
  } else {
    res.send(false);
  }
});

// Inicio de sesion empleado
app.post('/login-empleado', async function (req, res) {
  const { usuario, contrasena } = req.body;

  let existe_empleado = await Empleados.findOne({
    $and: [{ dni: usuario }, { contrasena: contrasena }],
  });
  console.log(existe_empleado);
  if (existe_empleado != null) {
    res.send(existe_empleado);
  } else {
    res.send(false);
  }
});

// listado de rutas sebastian
//Rutas deducibles
app.get('/tabla-deducibles', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/tabla-deducibles.html'),
  );
});

// Ruta formulario deducibles
app.get('/form-deducibles', function (req, res) {
  res.sendFile(path.resolve('../cliente/administrador/html/deducibles.html'));
});

// Se Guardan deducibles en la Base de datos
app.post('/add-deducibles', async function (req, res) {
  let datos_Deducible = req.body;
  let nuevo_Deducible = new Deducible(datos_Deducible);
  await nuevo_Deducible.save();
  res.send('Nuevo Deducible');
  console.log(nuevo_Deducible);
});

///ruta pedir deducibles de la base de datos
app.get('/obtener-deducibles', async function (req, res) {
  let deduciblesdocuments = await Deducible.find();
  console.log(deduciblesdocuments);
  res.send(deduciblesdocuments);
});

//RUTS CARGOS
// Ruta formulario CARGOS
// Ruta Agregar cargos
app.get('/agregar-cargos', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/agregar-cargos.html'),
  );
});

// Ruta Tabla cargos
app.get('/tabla-cargos', function (req, res) {
  res.sendFile(path.resolve('../cliente/administrador/html/tabla-cargos.html'));
});

// Se Guardan LOS CARGOS en la Base de datos
app.post('/add-cargos', async function (req, res) {
  let datos_Cargos = req.body;
  let nuevo_Cargos = new Cargos(datos_Cargos);
  await nuevo_Cargos.save();
  res.send('Nuevo Cargos');
  console.log(nuevo_Cargos);
});

///ruta pedir CARGOS de la base de datos
app.get('/obtener-cargos', async function (req, res) {
  let cargosdocuments = await Cargos.find();
  console.log(cargosdocuments);
  res.send(cargosdocuments);
});

//boton eliminar deducible.
app.delete('/eliminar-deducible/:id', async function (req, res) {
  let iddeducible = req.params.id;

  await Deducible.findByIdAndRemove(iddeducible);
  res.send('Borrado exitoso');
});

//boton eliminar cargo.
app.delete('/eliminar-cargo/:id', async function (req, res) {
  let idcargos = req.params.id;

  await Cargos.findByIdAndRemove(idcargos);
  res.send('Borrado exitoso');
});

/*Rutas Nataly*/
// Empleados
app.get('/listado-empleados', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/listado-empleados.html'),
  );
});

app.get('/form-empleados', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/agregar-empleado.html'),
  );
});

app.post('/agregar-empleados', async function (req, res) {
  let datos_empleado = req.body;
  console.log(datos_empleado);
  let nuevo_registro_empleado = new Empleados(datos_empleado);
  await nuevo_registro_empleado.save();
  res.send('Se registro el empleado');
});

app.get('/obtenerListadoEmpleados', async function (req, res) {
  let empleado = await Empleados.find();
  res.send(empleado);
});

app.delete('/empleado_delete/:id', async function (req, res) {
  let empleadoid = req.params.id;
  await Empleados.findByIdAndRemove(empleadoid);
  res.send('Borrado exitoso');
});

//obtener Cargos dentro de listado-empleados*******************
app.get('/obtenerListadoCargos', async function (req, res) {
  let cargo = await Cargos.find();
  res.send(cargo);
});

// Horas extra
app.get('/listado-horas-extra', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/listado-horas-extras.html'),
  );
});

app.get('/obtenerListadoHorasExtra', async function (req, res) {
  let horaExtra = await Horas_extra.find();
  res.send(horaExtra);
});

app.post('/agregar-horas-extra', async function (req, res) {
  let datos_hora_extra = req.body;
  let nuevo_registro_hora_extra = new Horas_extra(datos_hora_extra);
  await nuevo_registro_hora_extra.save();
  res.send('Se registro la hora extra');
});

app.get('/form-horas-extras', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/agregar-horas-extras.html'),
  );
});

app.delete('/horas_extra_delete/:id', async function (req, res) {
  let horaExtraid = req.params.id;

  await Horas_extra.findByIdAndRemove(horaExtraid);
  res.send('Borrado exitoso');
});

// listado de rutas sebastian
//Rutas deducibles
app.get('/tabla-deducibles', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/tabla-deducibles.html'),
  );
});

// Ruta formulario deducibles
app.get('/form-deducibles', function (req, res) {
  res.sendFile(path.resolve('../cliente/administrador/html/deducibles.html'));
});

// Se Guardan deducibles en la Base de datos
app.post('/add-deducibles', async function (req, res) {
  let datos_Deducible = req.body;
  let nuevo_Deducible = new Deducible(datos_Deducible);
  await nuevo_Deducible.save();
  res.send('Nuevo Deducible');
  console.log(nuevo_Deducible);
});

///ruta pedir deducibles de la base de datos
app.get('/obtener-deducibles', async function (req, res) {
  let deduciblesdocuments = await Deducible.find();
  console.log(deduciblesdocuments);
  res.send(deduciblesdocuments);
});

//RUTS CARGOS
// Ruta formulario CARGOS
// Ruta Agregar cargos
app.get('/agregar-cargos', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/agregar-cargos.html'),
  );
});

// Ruta Tabla cargos
app.get('/tabla-cargos', function (req, res) {
  res.sendFile(path.resolve('../cliente/administrador/html/tabla-cargos.html'));
});

// Se Guardan LOS CARGOS en la Base de datos
app.post('/add-cargos', async function (req, res) {
  let datos_Cargos = req.body;
  let nuevo_Cargos = new Cargos(datos_Cargos);
  await nuevo_Cargos.save();
  res.send('Nuevo Cargos');
  console.log(nuevo_Cargos);
});

///ruta pedir CARGOS de la base de datos
app.get('/obtener-cargos', async function (req, res) {
  let cargosdocuments = await Cargos.find();
  console.log(cargosdocuments);
  res.send(cargosdocuments);
});

//boton eliminar deducible.
app.delete('/eliminar-deducible/:id', async function (req, res) {
  let iddeducible = req.params.id;

  await Deducible.findByIdAndRemove(iddeducible);
  res.send('Borrado exitoso');
});

//boton eliminar cargo.
app.delete('/eliminar-cargo/:id', async function (req, res) {
  let idcargos = req.params.id;

  await Cargos.findByIdAndRemove(idcargos);
  res.send('Borrado exitoso');
});

/*Rutas Nataly*/
// Empleados
app.get('/listado-empleados', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/listado-empleados.html'),
  );
});

app.get('/form-empleados', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/agregar-empleado.html'),
  );
});

app.post('/agregar-empleados', async function (req, res) {
  let datos_empleado = req.body;
  console.log(datos_empleado);
  let nuevo_registro_empleado = new Empleados(datos_empleado);
  await nuevo_registro_empleado.save();
  res.send('Se registro el empleado');
});

app.get('/obtenerListadoEmpleados', async function (req, res) {
  let empleado = await Empleados.find();
  res.send(empleado);
});

app.delete('/empleado_delete/:id', async function (req, res) {
  let empleadoid = req.params.id;
  await Empleados.findByIdAndRemove(empleadoid);
  res.send('Borrado exitoso');
});

//obtener Cargos dentro de listado-empleados*******************
app.get('/obtenerListadoCargos', async function (req, res) {
  let cargo = await Cargos.find();
  res.send(cargo);
});

// Horas extra
app.get('/listado-horas-extra', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/listado-horas-extras.html'),
  );
});

app.get('/obtenerListadoHorasExtra', async function (req, res) {
  let horaExtra = await Horas_extra.find();
  res.send(horaExtra);
});

app.post('/agregar-horas-extra', async function (req, res) {
  let datos_hora_extra = req.body;
  let nuevo_registro_hora_extra = new Horas_extra(datos_hora_extra);
  await nuevo_registro_hora_extra.save();
  res.send('Se registro la hora extra');
});

app.get('/form-horas-extras', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/administrador/html/agregar-horas-extras.html'),
  );
});

app.delete('/horas_extra_delete/:id', async function (req, res) {
  let horaExtraid = req.params.id;

  await Horas_extra.findByIdAndRemove(horaExtraid);
  res.send('Borrado exitoso');
});

//ruta principal empleado
app.get('/principal-empleado', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/empleado/html/principal-empleado.html'),
  );
});

//ruta pedir datos del empleado
app.get('/pedir-datos-empleado', async function (req, res) {
  const { dni } = req.body;
  let datos_usuario = await Empleados.findOne({ dni: dni });
  console.log('datos usuariio' + datos_usuario);
  res.send(datos_usuario);
});

//ruta editar datos empleado
app.get('/editar-empleado', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/empleado/html/editar-datos-empleado.html'),
  );
});

//Ruta guardar cambios de empleado
app.put('/guardar-editar-empleado', async function (req, res) {
  const { dni, telefono, email, direccion } = req.body;

  let editar_empleado = await Empleados.findOneAndUpdate(
    { dni: dni },
    {
      $set: { email: email, telefono: telefono, direccion: direccion },
    },
  );
  res.send(editar_empleado);
});

//ruta marcar entrada y salida
app.get('/marcar-entrada-salida', function (req, res) {
  res.sendFile(
    path.resolve('../cliente/empleado/html/marcar-entrada-salida.html'),
  );
});

//Guardar horas entrada y salida
app.post('/guardar-tarjeta', async function (req, res) {
  let { dni, fecha, hora_entrada, hora_salida, cant_horas, horas_extra } =
    req.body;
  console.log(dni, fecha, hora_entrada, hora_salida, cant_horas, horas_extra);
  const nueva_entrada = new Tarjeta({
    dni,
    fecha,
    hora_entrada,
    hora_salida,
    cant_horas,
    horas_extra,
  });
  await nueva_entrada.save();
  res.send('Guardados satisfactoriamente');
});

app.get('/listado-nomina', function (req, res) {
  res.sendFile(path.resolve('../cliente/empleado/html/listado-nomina.html'));
});

app.listen(3000, function () {
  console.log('Servidor listo y preparado en el puerto 3000');
});
