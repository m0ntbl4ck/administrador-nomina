function eliminar (id) {
  console.log(id);
  $.ajax({
    url: 'http://localhost:3000/deducible_delete/' + id,
    method: 'delete',
    success: function (resp) {
      alert('Borrado exitoso');
      window.location.reload();
    },
  });
};

$(document).ready(function () {
    $.ajax({
         url: "http://localhost:3000/obtenerListadoDeducibles",
         method: "get",
         success: function (respuesta) {
           console.log(respuesta);
           setTable(respuesta);
         },
       });
        
     function setTable(respuesta) {
       $("#tabla-listado-deducibles").empty();
   
       for (let i = 0; i < respuesta.length; i++) {
        console.log(respuesta[i]);
  $('#tabla-listado-deducibles').append(
      `<tr>
      <td>${respuesta[i].descripcion}</td>
      <td>${respuesta[i].descuento}</td>
      <td><button 
      class="btn btn-danger" 
      onclick="eliminar('${respuesta[i]._id}')">
      Eliminar
      </button>
      </td>
      </tr>`
    )
  }
     }
     
   
 })