
$('.mensaje a').click(function(){
    $('form').animate({height:"toggle", opacity:"toggle"}, "slow");
});


let API_TOKEN = 'TokenAdmi'
function agregarUsuario (firstName, lastName, password,email, phone){
    let urlCreate = '/register';
    let usuario = {
        firstName:firstName,
        lastName:lastName,
         password:password,
        email:email,
        phone:phone
    }
    let settings = {
        method:'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
			'Content-Type' : 'application/json'
        },
        body : JSON.stringify( usuario )
    }
    console.log(usuario);
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


function watchUsersRegisterForm(){
let btnRegistrarUsuario = document.querySelector('.registrar');
btnRegistrarUsuario.addEventListener('click', (event)=>{
    let inputNombre = document.querySelector('.nombre');
    let inputApellido = document.querySelector('.apellido');
    let inputTelefono = document.querySelector('.telefono');
    let inputCorreo = document.querySelector('.correo');
    let inputContraseña = document.querySelector('.contraseña');
    event.preventDefault();
    agregarUsuario(inputNombre.value, inputApellido.value,inputContraseña.value,inputCorreo.value, inputTelefono.value);
    alert("REGISTRO EXITOSO");
});
}

function init(){
watchUsersRegisterForm();
}

init();