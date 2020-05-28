
let API_TOKEN = 'TokenAdmi'
function eliminarUsuario(correo) {
	let urlDelete = '/deleteUsuario/:correo';

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
	/*.then( responseJSON => {
		
		getAllBookmarks();
	})*/
	/*.catch( err => {
		results.innerHTML = err.message;
	});*/
}


function watchDeleteUserForm(){
let btnEliminarUsuario = document.querySelector('.btnDeleteUser');
btnEliminarUsuario.addEventListener('click', (event)=>{
    /*let inputMailUser = document.querySelector('.adminUserMail');
    event.preventDefault();
    eliminarUsuario(inputMailUser.value);
    alert("Se eliminó exitosamente el registro");*/
    console.log("clikc");
});
}

function init(){
watchDeleteUserForm();
}

init();