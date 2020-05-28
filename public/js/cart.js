
let btnVaciarCarrito = document.querySelector('.vaciarCarrito');

btnVaciarCarrito.addEventListener("click", (event)=>{
    $('.productos').remove();
    localStorage.clear(); //Borramos el historial del localstorage
    window.location = "cart.html"; //Refresh página para actualizar el 0 en el carrito
});
function onLoadCartNumbers(productosAgregados){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.itemNumberCart p').textContent = productNumbers;
    }
}

onLoadCartNumbers();