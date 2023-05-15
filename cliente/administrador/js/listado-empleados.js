$(document).ready(function () {
   $.ajax({
        url: "http://localhost:3000/obtenerListadoEmpleados",
        method: "get",
        success: function (respuesta) {
          console.log(respuesta);
          setTable(respuesta);
        },
      });
  
    const setTable = (respuesta) => {
      $("#tabla-listado-empleados").empty();
  
      for (let i = 0; i < respuesta.length; i++) {
        console.log(respuesta[i]);
  $('#tabla-listado-empleados').append(
      `<tr>
      <td>${respuesta[i].dni}</td>
      <td>${respuesta[i].nombre}</td>
      <td>${respuesta[i].apellido}</td>
      <td>${respuesta[i].fecha_nacimiento}</td>
      <td>${respuesta[i].telefono}</td>
      <td>${respuesta[i].email}</td>
      <td>${respuesta[i].direccion}</td>
      <td>${respuesta[i].nombre_cargo}</td>
      <td >
      <button 
      class="btn btn-danger"
      onclick="eliminar_empleado('${respuesta[i]._id}')">Eliminar</button>
      </td>
      </tr>`
    )
  }     
}
})
function eliminar_empleado (id) {
  console.log(id);
  $.ajax({
    url: 'http://localhost:3000/empleado_delete/' + id,
    method: 'delete',
    success: function (respuesta) {
      alert('Borrado exitoso');
      window.location.reload();
    },
  });
};