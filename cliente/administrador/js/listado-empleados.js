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
      <td class="text-center">${respuesta[i].dni}</td>
      <td class="text-center">${respuesta[i].nombre}</td>
      <td class="text-center">${respuesta[i].apellido}</td>
      <td class="text-center">${respuesta[i].fecha_nacimiento}</td>
      <td class="text-center">${respuesta[i].telefono}</td>
      <td class="text-center">${respuesta[i].email}</td>
      <td class="text-center">${respuesta[i].direccion}</td>
      <td class="text-center">${respuesta[i].cargo}</td>
      <td  class="text-center">
      <button 
      class="btn btn-danger mx-3"
      onclick="eliminar_empleado('${respuesta[i]._id}')">Eliminar</button><td>
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