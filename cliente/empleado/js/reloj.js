//funcion para cerrar sesion
const cerrarsesion = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
};

$(document).ready(function () {
  $('#alert').hide();
  //traer datos de inicio de sesion en el localstorage  y mostrar datos
  const usuario = JSON.parse(localStorage.getItem('empleado'));
  $('#nombre-empleado').append(
    `${usuario.nombre} ${usuario.apellido} <br> ${usuario.dni} <br> ${usuario.nombre_cargo}`,
  );
  const nombre_meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  let tiempo_entrada, tiempo_salida;

  //funcion para mostrar reloj en vivo
  const intervalo = setInterval(() => {
    const local = new Date();
    let dia = local.getDate(),
      mes = local.getMonth(),
      year = local.getFullYear();
    $('#tiempo').text(local.toLocaleTimeString());
    $('#fecha').text(`${dia} de ${nombre_meses[mes]} del ${year}`);
  }, 1000);

  let click = localStorage.getItem('clickEntrada');
  //comprobar si ya se marco un click en el boton de entrada
  if (click == 'true') {
    $('#entrada').prop('disabled', true);
    $('#salida').prop('disabled', false);
  }
  //capturar la fecha y hora del boton marcar entrada
  $('#entrada').click(function () {
    $(this).prop('disabled', true);
    $('#salida').prop('disabled', false);
    //$(this).prop('disabled', true);
    tiempo_entrada = new Date();

    console.log(tiempo_entrada);
    $('#alert').text('Entrada marcada satisfactoriamente');
    $('#alert').show();
    $('#alert').fadeOut(5500);
    localStorage.setItem('clickEntrada', true);
    localStorage.setItem('tiempo_entrada', tiempo_entrada);
  });

  //capturar la fecha y hora del boton marcar salida, calcular horas y enviar a la base de datos
  $('#salida').click(function () {
    $(this).prop('disabled', true);
    tiempo_salida = new Date();
    console.log(tiempo_salida /* fecha_salida */);
    $('#alert').text('Salida marcada satisfactoriamente');
    $('#alert').show();
    $('#alert').fadeOut(5500);
    localStorage.setItem('clickEntrada', false);

    tiempo_entrada = new Date(localStorage.getItem('tiempo_entrada'));
    console.log(
      'estas son las hopras de inicio y salida ' +
        tiempo_entrada +
        ' ' +
        tiempo_salida,
    );

    let diferencia = tiempo_salida - tiempo_entrada;
    let horas = diferencia / 1000 / 60 / 60;
    let horasFormateadas = horas.toFixed(2);
    console.log('horas ' + horasFormateadas);
    let horasExtra;
    if (horasFormateadas > 8) {
      horasExtra = horasFormateadas - 8;
    } else {
      horasExtra = 0;
    }
    let datos = `dni=${
      usuario.dni
    }&hora_entrada=${tiempo_entrada.toLocaleTimeString()}&fecha=${tiempo_entrada.toLocaleDateString()}&hora_salida=${tiempo_salida.toLocaleTimeString()}&cant_horas=${horasFormateadas}&horas_extra=${horasExtra}`;

    console.log('los datos ' + datos);
    $.ajax({
      url: 'http://localhost:3000/guardar-tarjeta',
      method: 'post',
      data: datos,
      success: function (resp) {
        console.log(resp);
      },
    });
  });
});
