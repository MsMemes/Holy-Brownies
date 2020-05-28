
let API_TOKEN = 'TokenAdmi'
function verPedidos() {

	let url = '/pedidos';
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
                <h1 class="title">_________________________________________________________________</h1> 
                <div class="inventario">
                        <div>
                        ${responseJSON[i].name}
                        </div>					
						<div>
						${responseJSON[i].email}
						</div>
						<div>
                        ${responseJSON[i].direccion.dir}
                        ${responseJSON[i].direccion.ciudad}
                        ${responseJSON[i].direccion.estado}
                        ${responseJSON[i].direccion.codigo}
                        </div></div>`
                            results.innerHTML += `
                             <div>
                        ${responseJSON[i].productos[0].name}
                        ${responseJSON[i].productos[0].tag}
                        ${responseJSON[i].productos[0].precioInd}
                        ${responseJSON[i].productos[0].cantidad}
                        ${responseJSON[i].productos[0].precioTotal}
                        </div>
                        <div>
                        ${responseJSON[i].productos[1].name}
                        ${responseJSON[i].productos[1].tag}
                        ${responseJSON[i].productos[1].precioInd}
                        ${responseJSON[i].productos[1].cantidad}
                        ${responseJSON[i].productos[1].precioTotal}
                        </div>
                        <div>
                        ${responseJSON[i].productos[2].name}
                        ${responseJSON[i].productos[2].tag}
                        ${responseJSON[i].productos[2].precioInd}
                        ${responseJSON[i].productos[2].cantidad}
                        ${responseJSON[i].productos[2].precioTotal}
                        </div>
                            `

			}
		})
		.catch( err => {
			results.innerHTML = err.message;
		});
}

function watchDeleteUserForm(){
	
	let btnVerPedidos = document.getElementById('btnVer');
	btnVerPedidos.addEventListener('click',(event)=>{
		event.preventDefault();
		verPedidos();
	});
}



function init(){
watchDeleteUserForm();

}

init();