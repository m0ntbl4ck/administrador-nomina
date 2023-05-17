const mostrardni = (resp) => {
  $('#nombre-empleado').append(
    `${resp.nombre} ${resp.apellido} <br> ${resp.dni} <br> ${resp.nombre_cargo}`,
  );
};

$(document).ready(function () {
  let usuario = JSON.parse(localStorage.getItem('empleado'));
  mostrardni(usuario);
  $('#tabla').hide();
  $('#year-desde').change(function () {
    let year = $(this).val();
    $('#year-hasta option').removeAttr('selected');
    $('#year-hasta option[value="' + year + '"]').attr('selected', true);
  });

  $('#month-desde').change(function () {
    let month = $(this).val();
    $('#month-hasta option').removeAttr('selected');
    $('#month-hasta option[value="' + month + '"]').attr('selected', true);

    const meses = {
      enero: 31,
      febrero: 28,
      marzo: 31,
      abril: 30,
      mayo: 31,
      junio: 30,
      julio: 31,
      agosto: 31,
      septiembre: 30,
      octubre: 31,
      noviembre: 30,
      diciembre: 31,
    };

    const day = meses[month];
    console.log(day);
    $('#day-hasta option').removeAttr('selected');
    $('#day-hasta option[value="' + day + '"]').attr('selected', true);
  });

  $('#filtro-nomina').submit((e) => {
    e.preventDefault();
    let filtro = $('#filtro-nomina').serialize();
    filtro = `dni=${usuario.dni}&${filtro}`;
    console.log(filtro);
    $.ajax({
      url: 'http://localhost:3000/nomina-empleado',
      method: 'post',
      data: filtro,
      success: function (resp) {
        console.log(resp);
        $('#tabla').show();
        $('#dni').text(`identificación: ${usuario.dni}`);
        $('#nombre').text(
          `Nombre del Empleado: ${usuario.nombre} ${usuario.apellido}`,
        );
        let fechainicio = new Date(resp.fechainicio);
        fechainicio = fechainicio.toLocaleDateString();
        let fechafin = new Date(resp.fechafin);
        let deducibles = resp.deducibles;
        fechafin = fechafin.toLocaleDateString();
        $('#fecha').text(`Fecha Nómina: ${fechainicio} - ${fechafin}`);
        $('#bodynomina').append(
          `<tr class=text-center>
            <td colspan="2">Horas laboradas</td>
            <td>${resp.horas}</td>
            <td>${resp.valorcargo}</td>
            <td colspan="2">${resp.valorhoras}</td>
            </tr>
            
            <tr class=text-center>
            <td colspan="2">Horas extras</td>
            <td>${resp.extras}</td>
            <td>${resp.valorcargo}</td>
            <td colspan="2">${resp.valorhorasextra}</td>
            </tr>
        
        `,
          /* for (let i =0; i< deducibles.length-1;i++){
        a= a+b;
          }; */
        );
        $('#total').text(resp.total);
      },
    });
  });
});
