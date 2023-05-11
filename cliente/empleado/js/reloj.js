$(document).ready(function () {
  $('#alert').hide();

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

  const intervalo = setInterval(() => {
    const local = new Date();
    let dia = local.getDate(),
      mes = local.getMonth(),
      year = local.getFullYear();

    $('#tiempo').text(local.toLocaleTimeString());
    $('#fecha').text(`${dia} de ${nombre_meses[mes]} del ${year}`);
  }, 1000);

  $('#entrada').click(function () {
    let tiempo_entrada = $('#tiempo').text();
    let fecha_entrada = $('#fecha').text();
    console.log(tiempo_entrada, fecha_entrada);
    $('#alert').text('Entrada marcada satisfactoriamente');
    $('#alert').show();
    $('#alert').fadeOut(5500);
    $('#entrada').disabled();
  });

  $('#salida').click(function () {
    let tiempo_salida = $('#tiempo').text();
    let fecha_salida = $('#fecha').text();
    console.log(tiempo_salida, fecha_salida);
    $('#alert').text('Salida marcada satisfactoriamente');
    $('#alert').show();
    $('#alert').fadeOut(5500);
  });
});
