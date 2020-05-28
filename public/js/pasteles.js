console.log("running");

let carts = document.querySelectorAll('.add-cart'); //Target botón para agregar al carrito
let products = [
    {productoNombre: 'Red Velvet', tag: 'redvelvetCake', precio: 249,inCart: 0},
    {productoNombre: 'Chocolate', tag: 'chocolateCake', precio: 249,inCart: 0},
    {productoNombre: 'Tres Leches', tag: 'treslechesCake', precio: 249,inCart: 0},
    {productoNombre: 'Zanahoria', tag: 'zanahoriaCake', precio: 249,inCart: 0},
    {productoNombre: 'Cheesecake', tag: 'cheesecake', precio: 279,inCart: 0},
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
    cartItems =  JSON.parse(cartItems);
    console.log("My cart items are", cartItems);
    if(cartItems != null){
        if(cartItems[product.tag]== undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1;
    }else{
        product.inCart = 1;
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
        localStorage.setItem("totalCost", cartCost + product.precio);
    }else{
        localStorage.setItem("totalCost", product.precio);
    }
    
    displayCart(cartCost);
}
function displayCart(cartCost){
    let cartItems = localStorage.getItem("productsInCart");
    let pagarContainer =  document.querySelector('.totalPagar');
    cartItems = JSON.parse(cartItems);
    let total = 0;
    let cantidad = 0;
    let productContainer = document.querySelector(".productos");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        //pagarContainer.innerHTML = '';
        Object.values(cartItems).map(item=>{
            total = 0;
            if(Array.isArray(item)){
               for(let i = 0; i < item.length; i++){
                    total = total + (item[i].inCart * item[i].precio);//Total del pedido del brownie
                    cantidad = cantidad + item[i].inCart;
                } 
                 productContainer.innerHTML +=
                `<div class="item">
                    <div class="producto">
                    <img src="../assets/browniePedido.jpg">
                    <p class="pedidoNombre">Brownies</p>
                    </div>
                    <div class="cantidadItem">${cantidad}</div>
                    <div class="precioItem">$${total},00</div>
                </div>`
            }else{
                 productContainer.innerHTML +=
                `<div class="item">
                    <div class="producto">
                        <img src="../assets/${item.tag}.jpg">
                        <span class="pedidoNombre">${item.productoNombre}</span>
                    </div>
                    <div class="cantidadItem">${item.inCart}</div>
                    <div class="precioItem">$${item.inCart * item.precio},00</div>
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
displayCart();
onLoadCartNumbers();