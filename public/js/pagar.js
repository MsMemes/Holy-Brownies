$(document).ready(function(){
    $('#datePicker').kendoDatePicker({
    disableDates: [new Date(2018, 11, 24), new Date(2018, 11, 25)]
    });
  });
  $(document).ready(function(){
    
$('#timePicker').kendoTimePicker();
new Date(year, month, day, hours, minutes, seconds, milliseconds)
});

let btnFinalizarCompra = document.querySelector('.btnFinalizarCompra')

btnFinalizarCompra.addEventListener('click',(event)=>{
    event.preventDefault();
    alert("PEDIDO EXITOSO");
    window.location = "usuarioPerfil.html";
});