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
  /* fecha = new Date(fecha); */
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

app.post('/nomina-empleado', async function (req, res) {
  const filtro = req.body;
  console.log(filtro);

  const meses = {
    enero: '01',
    febrero: '02',
    marzo: '03',
    abril: '04',
    mayo: '05',
    junio: '06',
    julio: '07',
    agosto: '08',
    septiembre: '09',
    octubre: '10',
    noviembre: '11',
    diciembre: '12',
  };

  const dias = {
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05',
    6: '06',
    7: '07',
    8: '08',
    9: '09',
    10: '10',
    11: '11',
    12: '12',
    13: '13',
    14: '14',
    15: '15',
    16: '16',
    17: '17',
    18: '18',
    19: '19',
    20: '20',
    21: '21',
    22: '22',
    23: '23',
    24: '24',
    25: '25',
    26: '26',
    27: '27',
    28: '28',
    29: '29',
    30: '30',
    31: '31',
  };
  const daydesde = dias[filtro.daydesde];
  const dayhasta = dias[filtro.dayhasta];
  const monthdesde = meses[filtro.monthdesde];
  const monthhasta = meses[filtro.monthhasta];
  let fechainicio = new Date(`${monthdesde}-${daydesde}-${filtro.yeardesde}`);
  let fechafin = new Date(`${monthhasta} ${dayhasta} ${filtro.yearhasta}`);

  let empleado = await Empleados.findOne({ dni: filtro.dni });
  let cargo = await Cargos.findOne({ nombre_cargo: empleado.nombre_cargo });
  let deducibles = await Deducible.find();
  let tarjetas = await Tarjeta.find({
    fecha: { $gte: fechainicio, $lte: fechafin },
  });
  console.log(tarjetas);

  const sumarHoras = tarjetas.reduce((horas, objeto) => {
    if (objeto.cant_horas) {
      horas = horas + objeto.cant_horas;
    }
    return horas;
  }, 0);
  const horasExtra = tarjetas.reduce((extras, objeto) => {
    if (objeto.horas_extra) {
      extras = extras + objeto.horas_extra;
    }
    return extras;
  }, 0);
  const totaldeducibles = deducibles.reduce((deducible, objeto) => {
    if (objeto.descuento) {
      deducible = deducible + objeto.descuento;
    }
    return deducible;
  }, 0);
  let valorhoras = sumarHoras * cargo.monto_hora;
  let valorhorasextra = horasExtra * cargo.monto_hora;
  let valortotal = valorhoras + valorhorasextra;
  valortotal = valortotal - totaldeducibles;
  let datosNomina = {
    fechainicio: fechainicio,
    fechafin: fechafin,
    horas: sumarHoras,
    extras: horasExtra,
    totaldeducibles: totaldeducibles,
    deducibles: deducibles,
    valorcargo: cargo.monto_hora,
    total: valortotal,
    valorhorasextra: valorhorasextra,
    valorhoras: valorhoras,
  };
  res.send(datosNomina);
});
app.listen(3000, function () {
  console.log('Servidor listo y preparado en el puerto 3000');
});
