
$('.miPerfil').click(function(){
   $(".direccionesForm").css("display","none");
   $(".resultadosPedidos").css("display","none");
   $(".pagosForm").css("display","none");
   $(".formPerfil").css("display","none").animate({height:"toggle", opacity:"toggle"}, "slow");
});

$('.direcciones').click(function(){
    $(".formPerfil").css("display","none")
    $(".resultadosPedidos").css("display","none");
    $(".pagosForm").css("display","none");
    $(".direccionesForm").css("display","none").animate({height:"toggle", opacity:"toggle"}, "slow");
  });

  $('.pedidos').click(function(){
    $(".formPerfil").css("display","none");
    $(".direccionesForm").css("display","none");
    $(".pagosForm").css("display","none");
    $(".resultadosPedidos").css("display","none").animate({height:"toggle", opacity:"toggle"}, "slow");
  });
  $('.pagos').click(function(){
    $(".pagosForm").css("display","none").animate({height:"toggle", opacity:"toggle"}, "slow");
    $(".formPerfil").css("display","none");
    $(".direccionesForm").css("display","none");
    $(".resultadosPedidos").css("display","none");
  });
  
  function onLoad(){
    $(".formPerfil").css("display","none").animate({height:"toggle", opacity:"toggle"}, "slow");
    $(".direccionesForm").css("display","none");
    $(".resultadosPedidos").css("display","none");
    $(".pagosForm").css("display","none");
}
let btnPagar = document.querySelector('.pagar');
btnPagar.addEventListener('click',(event)=>{
    event.preventDefault();
    let cantidad = document.querySelector('.cantidadPagar');
    cantidad.value = 200;
});

function onLoadCartNumbers(productosAgregados){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
      document.querySelector('.itemNumberCart p').textContent = productNumbers;
  }
}

onLoadCartNumbers();

onLoad();


/*
btnDirecciones.addEventListener('click', (event)=>{
    event.preventDefault();
    console.log("Click");
})
*/