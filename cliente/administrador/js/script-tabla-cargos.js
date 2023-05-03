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
          <button class="btn btn-primary" onclick="editar(${resp[i]._id})">Editar</button>
          <button class="btn btn-danger" onclick="eliminar('${resp[i]._id}')">Eliminar</button>
        </td></tr>`
      );
    }
  };
});

const editarCargo = (id, nombre, monto) => {
  // Abre un modal con un formulario para editar los datos del cargo prellenado con la información actual
  // Al enviar el formulario, ejecuta una petición AJAX con el método PUT a la ruta correspondiente para actualizar el cargo en la base de datos
};

const eliminarCargo = (id) => {
  if (confirm('¿Está seguro de que desea eliminar este cargo?')) {
    $.ajax({
      url: `http://localhost:3000/eliminar-cargo/${id}`,
      method: 'delete',
      success: function (resp) {
        // Elimina la fila correspondiente de la tabla
        $(`#${id}`).remove();
      },
      error: function (err) {
        console.error(err);
      },
    });
  }
};

