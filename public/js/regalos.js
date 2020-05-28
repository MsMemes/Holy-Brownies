console.log("running");

let carts = document.querySelectorAll('.add-cart');
let regalos = [
   {productoNombre: 'Caja 12 brownies Surtidos', tag: 'caja12surtidos', precio: 180,inCart: 0},
    {productoNombre: 'Pizza Brownie', tag: 'pizzabrownie', precio: 200,inCart: 0},
    {productoNombre: 'Caja 6 brownies surtidos', tag: 'caja6surtidos', precio: 80,inCart: 0},
    {productoNombre: 'Para ti', tag: 'parati', precio: 110,inCart: 0},
    {productoNombre: 'I love Dad', tag: 'ilovedad', precio: 110,inCart: 0}
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