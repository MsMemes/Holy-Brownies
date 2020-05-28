
let btnsDec = document.querySelectorAll('.btnDec');//Target botón -
let inputs = document.querySelectorAll('.cantidadInput');//Target input para ingresar cantidad de brownies de algún topping en específico
let btnsInc = document.querySelectorAll('.btnInc');//Target botón +
let arrayInput = [0,0,0,0,0,0,0,0,0];
let toppingsInfo = document.querySelectorAll('.toppingInfo');//Target Info del brownie, imagen, nombre, precio, input, botones + -
let pedidosAgregados = [];//Arreglo donde se irán agregando los pedidos de diferentes brownies 
let brownies = [
    {topping: 'Snicker', tag: 'snicker', precio: 15, inCart: 0},
    {topping: 'M&M', tag: 'm&m', precio: 15, inCart: 0},
    {topping: 'Oreo', tag: 'oreo', precio: 15, inCart: 0},
    {topping: 'Bubulubu', tag: 'bubulubu', precio: 15, inCart: 0},
    {topping: 'Hershey', tag: 'hershey', precio: 15, inCart: 0},
    {topping: 'Crunch', tag: 'crunch', precio: 15, inCart: 0},
    {topping: 'Milky Way', tag: 'milkyway', precio: 15, inCart: 0},
    {topping: 'Ferrero', tag: 'ferrero', precio: 20, inCart: 0},
    {topping: 'Kinder Bueno', tag: 'kinderbueno', precio: 20, inCart: 0},
]
//Ciclo que recorre los toppings para decrementar el valor en el input
for(let i = 0; i< btnsDec.length;i++){
    btnsDec[i].addEventListener("click",(event)=>{
        event.preventDefault();
        if (arrayInput[i] > 0){
            arrayInput[i] = arrayInput[i] -1;
            inputs[i].value = arrayInput[i];
        }
    });
}
 //Ciclo que recorre los toppings para incrementar el valor en el input
for(let i = 0; i<btnsInc.length;i++){
    btnsInc[i].addEventListener("click",(event)=>{
        event.preventDefault();
        console.log("click inc button")
        arrayInput[i] = arrayInput[i] + 1 ;
        inputs[i].value = arrayInput[i];
    });
} 

//AL HACER CLICK EN AGREGAR PEDIDO DETONAMOS ESTE EVENTO
let btnAgregarPedido = document.querySelector('.btnAgregarPedido');
let pedido = [];
var totalPorPedido = 0;
var total = 0;
let pedidoOrdenado = [];//poner dentro del boton????
    btnAgregarPedido.addEventListener('click', (event)=>{
        event.preventDefault();
        pedidoOrdenado = [];
        pedido = [];
        totalPorPedido =0;
        for(let i =0; i<toppingsInfo.length;i++){
           if(inputs[i].value > 0 ){
               for(let j = 0; j<inputs[i].value;j++){
                   pedido.push(brownies[i]);
                   totalPorPedido =  (totalPorPedido + brownies[i].precio);
               }
             //  totalPorPedido = (brownies[i].precio * inputs[i].value)
               } 
       }
    costoTotal(totalPorPedido);
     let cont = 1;
      let aux = 0;
      let k = 0;
     for(let i =0; i<pedido.length;i++){
         k = i + 1;
         if(k>=pedido.length ){
           pedidoOrdenado.push(pedido[i]);
           pedidoOrdenado[aux].inCart = cont;
         }else{
             if(pedido[i].tag === pedido[k].tag){
               cont = cont + 1;
           }else{
               pedidoOrdenado.push(pedido[i]);
               pedidoOrdenado[aux].inCart = cont;
               aux = aux + 1;
               cont = 1;
           }
         }   
        }     
        console.log("PEDIDO ORDENADO", pedidoOrdenado)
        cartNumbers(pedidoOrdenado);

        for(let i =0; i<inputs.length;i++){
            inputs[i].value = 0;
            arrayInput[i]=0;
        } 
    })


//Función que carga los productos del carrito en todas las páginas mediante el localStorage
function onLoadCartNumbers(productosAgregados){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.itemNumberCart p').textContent = productNumbers;
    }
}

//Función que recibe el producto que se agregó al carrito de acuerdo al array de PRODUCTS
//Lo agrega al localStorage para que los vaya guardando y cambie el número en icono carrito.
function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.itemNumberCart p').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',  1);
        document.querySelector('.itemNumberCart p').textContent = 1;
    }
    setItems(products);
}
let i = 0;
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems =JSON.parse(cartItems);
    i = i + 1;
    if(cartItems != null){//Verificamos si ya hay algo en el LocalStorage
        cartItems = {
            ...cartItems,["Pedido "+ i]:product
        }
    }else{//Sino lo agregamos
        cartItems = {
            ["Pedido " + i]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function costoTotal(costo){
    let cartCost = localStorage.getItem('totalCost');

    console.log("TIPO", typeof(cartCost));
    if(cartCost != null){
        cartCost =  parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + costo);
    }else{
        localStorage.setItem('totalCost', costo)
    }   
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
  
    let productContainer = document.querySelector(".productos");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item=>{
            console.log("INSIDE DISPLAY CART",item);
            productContainer.innerHTML +=
            `<div class="item">
            <div class="producto">
                <img src="../assets/oreo.jpg">
                <span>${item.productoNombre}</span>
            </div>
            <div class="precioItem">$${item.precio},</div>
            <div class="cantidadItem">${item.inCart}</div>
            <div>$${item.inCart * item.precio},00</div>
            </div>`
        })
        productContainer.innerHTML +=`
            <div class="totalCost">
                <h4 class="totalTitle> TOTAL </h4>
                <h4 class="total">$${cartCost},00</h4>
                </div>
        `
    }
}
displayCart();
onLoadCartNumbers();