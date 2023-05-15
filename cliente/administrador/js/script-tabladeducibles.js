$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/obtener-deducibles',
    method: 'get',
    success: function (resp) {
      showdeducibles(resp);
    },
  });
  const showdeducibles = (resp) => {
    $('#tbody').empty();
    for (let i = 0; i < resp.length; i++) {
      //console.log(resp[i]);
      $('#tbody').append(
        `<tr><td>${resp[i].descripcion}</td><td>${resp[i].descuento}
        <td>
          <button class="btn btn-danger" onclick="eliminarDeducible('${resp[i]._id}')">Eliminar</button>
        </td></tr>`
      );
    }
  };
});


const eliminarDeducible = (id) => {

    $.ajax({
      url: `http://localhost:3000/eliminar-deducible/${id}`,
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
