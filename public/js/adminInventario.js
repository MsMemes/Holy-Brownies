
let API_TOKEN = 'TokenAdmi'

function agregarProducto (name, precio, tipo){
    let urlCreate = '/addNewProducto';
    let producto = {
        name:name,
        precio:precio,
         tipo:tipo
    }
    let settings = {
        method:'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
			'Content-Type' : 'application/json'
        },
        body : JSON.stringify( producto )
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


function eliminarProducto(name) {
	let urlDelete = `/borrarProducto/${name}`;

	let settings = {
		method : 'DELETE',
		headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
	}
	fetch(urlDelete, settings )
	.then( response => {
		if( response.ok){
			return response;
		}
		else{
			throw new Error( response.statusText);
		}
	})
}

function verProductos() {

	let url = '/productos';
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
			results.innerHTML = "";
			for(let i = 0; i < responseJSON.length; i++){
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
			}
		})
		.catch( err => {
			results.innerHTML = err.message;
		});
}

function watchDeleteUserForm(){
let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', (event)=>{
    let inputNombreProd = document.querySelector('.nombreProducto');
    let inputPrecioProd = document.querySelector('.precioProducto');
    let inputTipoProd = document.querySelector('.tipoProducto');
    event.preventDefault();
    agregarProducto(inputNombreProd.value, inputPrecioProd.value,inputTipoProd.value);
    alert("Se agregó éxitosamente el producto");
    console.log("clikc");
    inputNombreProd ="";
    inputPrecioProd="";
    inputTipoProd="";
});
let btnEliminar = document.getElementById('btnEliminar');
btnEliminar.addEventListener('click',(event)=>{
    event.preventDefault();
    let name = document.querySelector('.nombreProducto');
    eliminarProducto(name.value);
    alert("Se eliminó exitosamente el producto");

});

let btnVerProductos = document.getElementById('btnVer');
btnVerProductos.addEventListener('click',(event)=>{
event.preventDefault();
verProductos();
});
}

function init(){
watchDeleteUserForm();
}

init();