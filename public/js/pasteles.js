console.log("running");
let API_TOKEN = 'TokenAdmi'

let carts = document.querySelectorAll('.add-cart'); //Target botón para agregar al carrito
let products = [
    {name: 'Red Velvet', tag: 'redvelvetCake', precioInd: 249,cantidad: 0, precioTotal: 0},
    {name: 'Chocolate', tag: 'chocolateCake', precioInd: 249,cantidad: 0, precioTotal: 0},
    {name: 'Tres Leches', tag: 'treslechesCake', precioInd: 249,cantidad: 0, precioTotal: 0},
    {name: 'Zanahoria', tag: 'zanahoriaCake', precioInd: 249,cantidad: 0, precioTotal: 0},
    {name: 'Cheesecake', tag: 'cheesecake', precioInd: 279,cantidad: 0, precioTotal: 0},
]
//Ciclo para reaccionar a cualquier botón agregar carrito de la página
for(let i = 0; i<carts.length;i++){
    carts[i].addEventListener('click', (event)=>{
        event.preventDefault();
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
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
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    let totalPorProducto = product.cantidad * product.precioInd;
    cartItems =  JSON.parse(cartItems);
    console.log("My cart items are", cartItems);
    if(cartItems != null){
        if(cartItems[product.tag]== undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].cantidad +=1;
        cartItems[product.tag].precioTotal += product.precioInd;
 
    }else{
        product.cantidad = 1;
        product.precioTotal = product.precioInd;
        cartItems = {
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.precioInd);
    }else{
        localStorage.setItem("totalCost", product.precioInd);
    }
    
    displayCart(cartCost);
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    let pagarContainer =  document.querySelector('.totalPagar');
    cartItems = JSON.parse(cartItems);
    let total = 0;
    let cantidad2 = 0;
    let productContainer = document.querySelector(".productos");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        //pagarContainer.innerHTML = '';
        Object.values(cartItems).map(item=>{
            total = 0;
            if(Array.isArray(item)){
               for(let i = 0; i < item.length; i++){
                    total = total + (item[i].cantidad * item[i].precioInd);//Total del pedido del brownie
                    cantidad2 = cantidad2 + item[i].cantidad;
                } 
                 productContainer.innerHTML +=
                `<div class="item">
                    <div class="producto">
                    <img src="../assets/browniePedido.jpg">
                    <p class="pedidoNombre">Brownies</p>
                    </div>
                    <div class="cantidadItem">${cantidad2}</div>
                    <div class="precioItem">$${total},00</div>
                </div>`
            }else{
                 productContainer.innerHTML +=
                `<div class="item">
                    <div class="producto">
                        <img src="../assets/${item.tag}.jpg">
                        <span class="pedidoNombre">${item.name}</span>
                    </div>
                    <div class="cantidadItem">${item.cantidad}</div>
                    <div class="precioItem">$${item.cantidad * item.precioInd},00</div>
                </div>`
            }  
        })
        let cartCost = localStorage.getItem('totalCost');

    cartCost = parseInt(cartCost);
        productContainer.innerHTML +=`
            <div class="totalCost">
                <h4 class="totalTitle> TOTAL </h4>
                <h4 class="totalTitle> TOTAL </h4>
                <h4 class="total">$${cartCost},00</h4>
                </div>
        `
        pagarContainer.innerHTML +=
        `
        <div class="totalCost">
        <h1 class="totalTitle> TOTAL </h1>
        <h4 class="total">$${cartCost},00</h4>
        </div>
        `
    }
}


function agregarPedido (name, email, direccion, productos, precioT){
    let urlCreate = '/addNewPedido';
    let pedido = {
        name:name,
        email:email,
         direccion:direccion,
         productos:productos,
         precioT:precioT
    }
    let settings = {
        method:'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
			'Content-Type' : 'application/json'
        },
        body : JSON.stringify( pedido )
    }
    fetch(urlCreate, settings)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        return response.statusText;
    })
    .catch(err=>{
        throw new Error (response.statusText);
    })
}


//Función para realizar pedido
function watchForm(){
let btnFinalizarCompra = document.querySelector('.btnFinalizarCompra')

btnFinalizarCompra.addEventListener('click',(event)=>{
    event.preventDefault();
    let name = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let dir = document.getElementById('direccion').value;
    let estado = document.getElementById('estado').value;
    let ciudad = document.getElementById('ciudad').value;
    let codigo = document.getElementById('zip').value;
    let arrProd = [];
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let precioT = localStorage.getItem("totalCost");
    precioT = JSON.parse(precioT);
    Object.values(cartItems).map(item=>{
        arrProd.push(item);
    })
    let dire = {dir:dir,ciudad:ciudad, estado:estado,codigo:codigo};
    alert("PEDIDO EXITOSO");
    agregarPedido(name, email, dire, arrProd, precioT );
    name.value ="";
    email.value ="";
    dire.value ="";
    estado.value ="";
    ciudad.value ="";
    zip.value ="";
});
}
function init(){
    watchForm();
}
init();
displayCart();
onLoadCartNumbers();