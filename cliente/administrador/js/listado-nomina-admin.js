const cerrarsesion = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000/';
};

$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/obtenerListadoEmpleados',
    method: 'get',
    success: function (resp) {
      //console.log(resp);

      resp.forEach((element) => {
        let empleado = `${element.nombre} ${element.apellido}`;
        $('#listado-empleado').append(
          `<option value="${element.dni}">${empleado}</option>`,
        );
      });
    },
    error: function (resp) {
      alert(resp.responseText);
    },
  });

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
    console.log(filtro);
    $.ajax({
      url: 'http://localhost:3000/nomina-administrador',
      method: 'post',
      data: filtro,
      success: function (resp) {
        console.log(resp);
        $('#tabla').show();
        let empleado = resp.empleado;
        $('#dni').text(`Identificación: ${empleado.dni}`);
        $('#nombre').text(
          `Nombre del Empleado: ${empleado.nombre} ${empleado.apellido}`,
        );
        let fechainicio = new Date(resp.fechainicio);
        fechainicio = fechainicio.toLocaleDateString();
        let fechafin = new Date(resp.fechafin);
        let deducibles = resp.deducibles;
        fechafin = fechafin.toLocaleDateString();
        $('#fecha').text(`Fecha Nómina: ${fechainicio} - ${fechafin}`);
        $('#bodynomina').empty();
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
        );
        for (let i = 0; i < deducibles.length; i++) {
          $('#bodynomina').append(
            `<tr class=text-center>
                <td colspan="2">${deducibles[i].descripcion}</td>
                <td>1</td>
                <td>-${deducibles[i].descuento}</td>
                <td colspan="2">-${deducibles[i].descuento}</td>
                </tr>`,
          );
        }
        $('#total').text(resp.total);
      },
    });
  });
});
