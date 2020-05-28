let API_TOKEN = 'TokenAdmi'

//Función para buscar un producto
function buscarProducto(producto) {

	let url = `/search/${producto}`;
	let settings = {
		method : 'GET',
		headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
	}

	let results = document.querySelector('.results');

	fetch( url, settings )
		.then( response => {
			if( response.ok){
				return response.json();
			}
			else{
				throw new Error( response.statusText);
			}
		})
		.then (responseJSON => {
            console.log(responseJSON);
			results.innerHTML = "";
			//for(let i = 0; i < responseJSON.length; i++){
				results.innerHTML += `
                <h1 class="title">Producto</h1> 
                <div class="inventario">
                        <div>
                        ${responseJSON[i].name}
                        </div>					
						<div>
						${responseJSON[i].precio}
						</div>
						<div>
						${responseJSON[i].tipo}
						</div>
				</div>
				`
		//	}
		})
		.catch( err => {
			results.innerHTML = err.message;
		});
}


function onLoadCartNumbers(productosAgregados){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.itemNumberCart p').textContent = productNumbers;
    }
}
const menuSlide = ()=>{
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu li');
    
    burger.addEventListener('click', ()=>{
        //Toggle Menu
        menu.classList.toggle('menu-active');
        //Animación del Menu 
        menuLinks.forEach((link, index) =>{
            if (link.style.animation){
                link.style.animation='';
            }else{
                 link.style.animation = `menuLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
            }
          
        });
    });
    }

    function watchForm(){
        let btnBuscar = document.querySelector('.buscar');
        console.log(btnBuscar);
        btnBuscar.addEventListener('click',(event)=>{
        event.preventDefault();
        let producto = document.querySelector('.barraBuscadora');
        buscarProducto(producto.value);
        });
    }

  
function init(){
    watchForm();
    
    }
    
    init();
  menuSlide();
onLoadCartNumbers();