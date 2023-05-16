const cerrarsesion = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
};
$(document).ready(function () {
  $('#alert').hide();
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
  let tiempo_entrada, fecha_entrada, tiempo_salida, fecha_salida;

  const intervalo = setInterval(() => {
    const local = new Date();
    let dia = local.getDate(),
      mes = local.getMonth(),
      year = local.getFullYear();
    $('#tiempo').text(local.toLocaleTimeString());
    $('#fecha').text(`${dia} de ${nombre_meses[mes]} del ${year}`);
  }, 1000);

  let click = localStorage.getItem('clickEntrada');
  if (click == 'true') {
    $('#entrada').prop('disabled', true);
    $('#salida').prop('disabled', false);
  }
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

  $('#salida').click(function () {
    $(this).prop('disabled', true);

    console.log(tiempo_salida /* fecha_salida */);
    $('#alert').text('Salida marcada satisfactoriamente');
    $('#alert').show();
    $('#alert').fadeOut(5500);
    localStorage.setItem('clickEntrada', false);
    tiempo_salida = new Date();
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

    $('#crearadmin').submit((e) => {
      e.preventDefault();
      let admin_datos = $('#crearadmin').serialize();
      $.ajax({
        url: 'http://localhost:3000/crear-admin',
        method: 'post',
        data: admin_datos,
        success: function (resp) {
          console.log(resp);
        },
      });
    });
  });
});
