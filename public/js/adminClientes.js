
let API_TOKEN = 'TokenAdmi'
function eliminarUsuario(correo) {
	let urlDelete = `/deleteUsuario/${correo}`;

	let settings = {
		method : 'DELETE',
		headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
	}

	//let results = document.querySelector('.results');

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

function getAllCustomers() {

	let url = '/clientes';
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
                <h1 class="title">_______________________________________________________</h1> 
                <div class="cliente">
                        <div>
                        ${responseJSON[i].firstName}
                        </div>					
						<div>
						${responseJSON[i].lastName}
						</div>
						<div>
						${responseJSON[i].email}
						</div>
						<div>
						${responseJSON[i].phone}
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
let btnEliminarUsuario = document.querySelector('.btnDeleteUser');
btnEliminarUsuario.addEventListener('click', (event)=>{
    let inputMailUser = document.querySelector('.adminUserMail');
    event.preventDefault();
    eliminarUsuario(inputMailUser.value);
    alert("Se eliminó exitosamente el registro");
    event.preventDefault();
    console.log("clikc");
});

let btnVerClientes = document.querySelector('.btnGetCustomers');
btnVerClientes.addEventListener('click',(event)=>{
event.preventDefault();
getAllCustomers();
});
}

function init(){
watchDeleteUserForm();
}

init();