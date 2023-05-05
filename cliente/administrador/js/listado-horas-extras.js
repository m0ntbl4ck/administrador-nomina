function eliminar (id) {
  console.log(id);
  $.ajax({
    url: 'http://localhost:3000/horas_extra_delete/' + id,
    method: 'delete',
    success: function (resp) {
      alert('Borrado exitoso');
      window.location.reload();
    },
  });
};

$(document).ready(function () {
    $.ajax({
         url: "http://localhost:3000/obtenerListadoHorasExtra",
         method: "get",
         success: function (resp) {
           //console.log(resp);
           setTable(resp);
         },
       });
   
       function setTable(resp) {
        $("#tabla-horas-extra").empty();
    
        for (let i = 0; i < resp.length; i++) {
         console.log(resp[i]);
   $('#tabla-horas-extra').append(
       `<tr><td>${resp[i].id_empleado}</td><td>${resp[i].fecha}</td><td>${resp[i].numero_horas}</td><td>${resp[i].monto}</td><td><button onclick="eliminar('${resp[i]._id}')">Eliminar</button><td></tr>`
     )
   }
   
     } 
 })
 