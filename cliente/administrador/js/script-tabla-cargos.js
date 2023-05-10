$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/obtener-cargos',
    method: 'get',
    success: function (resp) {
      showcargos(resp);
    },
  });
  
  const showcargos = (resp) => {
    $('#tabla-cargos').empty();
    for (let i = 0; i < resp.length; i++) {
      console.log(resp[i]);
      $('#tabla-cargos').append(
        `<tr><td>${resp[i].nombre_cargo}</td><td>${resp[i].monto_hora}</td>
        <td>
          <button class="btn btn-danger" onclick="eliminarCargo('${resp[i]._id}')">Eliminar</button>
        </td></tr>`
      );
    }
  };
});


const eliminarCargo = (id) => {

    $.ajax({
      url: `http://localhost:3000/eliminar-cargo/${id}`,
      method: 'delete',
      success: function (resp) {
        // Elimina la fila correspondiente de la tabla
        alert('Borrado exitoso');
      window.location.reload();
      },
      error: function (err) {
        console.error(err);
      },
    });
  }


