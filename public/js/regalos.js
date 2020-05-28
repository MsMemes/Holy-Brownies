console.log("running");

let carts = document.querySelectorAll('.add-cart');
let regalos = [
   {name: 'Caja 12 brownies Surtidos', tag: 'caja12surtidos', precioInd: 180,cantidad: 0, precioTotal: 0},
    {name: 'Pizza Brownie', tag: 'pizzabrownie', precioInd: 200,cantidad: 0, precioTotal: 0},
    {name: 'Caja 6 brownies surtidos', tag: 'caja6surtidos', precioInd: 80,cantidad: 0, precioTotal: 0},
    {name: 'Para ti', tag: 'parati', precioInd: 110,cantidad: 0, precioTotal: 0},
    {name: 'I love Dad', tag: 'ilovedad', precioInd: 110,cantidad: 0, precioTotal: 0}
]
for(let i = 0; i<carts.length;i++){
    carts[i].addEventListener('click', (event)=>{
        event.preventDefault();
        cartNumbers(regalos[i]);
        totalCost(regalos[i]);
    })
}
function onLoadCartNumbers(productosAgregados){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.itemNumberCart p').textContent = productNumbers;
    }
}
function cartNumbers(regalos){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.itemNumberCart p').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',  1);
        document.querySelector('.itemNumberCart p').textContent = 1;
    }
    setItems(regalos);
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
        cartItems[product.tag].cantidad +=1;
    }else{
        product.cantidad = 1;
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
    
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
  
    let productContainer = document.querySelector(".productos");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item=>{
            productContainer.innerHTML +=
            `<div class="producto">
                <img src="./assets/${item.tag}.jpg">
                <span>${item.productoNombre}</span>
            </div>
            <div class="precio">$${item.precio},00Mariana</div>
            <div class="cantidad">
                <span>${item.inCart}</span>
            </div>
            <div>
                $${item.inCart * item.precio},00
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