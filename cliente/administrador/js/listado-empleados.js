function eliminar_empleado (id) {
  console.log(id);
  $.ajax({
    url: 'http://localhost:3000/horas_extra_delete/' + id,
    method: 'delete',
    success: function (respu) {
      alert('Borrado exitoso');
      window.location.reload();
    },
  });
};

$(document).ready(function () {
   $.ajax({
        url: "http://localhost:3000/obtenerListadoEmpleados",
        method: "get",
        success: function (respu) {
          console.log(respu);
          setTable(respu);
        },
      });
  
    function setTable(respu) {
      $("#tabla-listado-empleados").empty();
  
      for (let i = 0; i < respu.length; i++) {
        console.log(respu[i]);
  $('#tabla-listado-empleados').append(
      `<tr><td>${respu[i].dni}</td><td>${respu[i].nombre} ${respu[i].apellido}</td><td>${respu[i].fecha_nacimiento}</td><td>${respu[i].telefono}</td><td>${respu[i].email}</td><td>${respu[i].direccion}</td><td>${respu[i].cargo}</td><td>${respu[i].contrasena}</td><td><button onclick="eliminar_empleado('${respu[i]._id}')">Eliminar</button><td></tr>`
    )
  }
      
}
})
