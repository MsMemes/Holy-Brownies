# Holy Brownies

The vision of this project is to become a full working, attractive and
functional ecommerce, where customers can feel part of the
business by having a more interactive and personalized experience.


## Endpoints


```
'/register' (POST)
Registra a los usuarios en la base de datos
Ejemplos de datos requeridos:
{
	"firstName" : "Maggie",
	"lastName" : "Herrera",
	"email" : "mags@gmail.com",
	"password" : "pas123",
	"phone" : 1234567890
}
In the DB the password would be encrypted
```

```
'/login' (POST)
Permite a los usuarios hacer login en la pagina, siempre y cuando esten registrados
Ejemplos de datos requeridos:
{
	"email" : "mags@gmail.com",
	"password" : "pas123",
}
```

```
'/search/:producto' (GET)
Permite a los usuarios hacer una busqueda de un producto
Ejemplos de datos requeridos:
URL : /search/Oreo
Ejemplo de lo que regresaria:
[
    {
        "_id": "5ececd930cb0a92be201bbd1",
        "name": "Oreo",
        "precio": 20,
        "tipo": "Brownie",
        "__v": 0
    }
]
```
```
'/addNewProducto' (POST)
Permite al administrador agregar un nuevo producto
Se necesita mandar el Bearer Token del administrador
Ejemplos de datos requeridos:
{
	"name" : "Oreo",
	"precio" : 15,
	"tipo" : "Brownie"
}
```
```
'/borrarProducto/:name' (DELETE)
Permite al administrador borrar un producto
Se necesita mandar el Bearer Token del administrador
Ejemplos de datos requeridos:
URL : /borrarProducto/Oreo
```
```
'/modificarProducto/:name' (PATCH)
Permite al administrador modificar un producto
Se necesita mandar el Bearer Token del administrador
Ejemplos de datos requeridos:
URL : /modificarProducto/Oreo
{
	"precio" : 20
}
```
```
'/perfil/:correo' (GET)
Regresa los datos de un usuario segun el correo dado
Ejemplos de datos requeridos:
URL : /perfil/mags@gmail.com
```
```
'/agregarCarrito' (POST)
Permite agregar productos al carrito de compras
Ejemplos de datos requeridos:
{
	"productos" : 
		[{
			"name" : "Zanahoria",
			"cantidad" : 1,
			"precioInd" : 200,
			"precioTotal" : 200
		},
		{
			"name" : "M&M",
			"cantidad" : 3,
			"precioInd" : 15,
			"precioTotal" : 45
		}],
	"email" : "ana@gmail.com"
}
```
```
'/carrito/:email' (GET)
Regresa el carrito de un usuario
Ejemplos de datos requeridos:
URL : /carrito/mags@gmail.com
```

```
'/pedidosUsuario/:email' (GET)
Regresa todos los pedidos del usuario
Ejemplos de datos requeridos:
URL : /pedidosUsuario/mags@gmail.com
```
```
'/deleteUsuario/:correo' (DELETE)
Permite al administrador borrar un usuario de la BD
Se necesita mandar el Bearer Token del administrador
Ejemplos de datos requeridos:
URL : /deleteUsuario/mags@gmail.com
```
```
'/clientes' (GET)
Regresa todos los usuarios en la BD al administrador
Se necesita mandar el Bearer Token del administrador
Ejemplos de datos requeridos:
URL : /clientes
```
```
'/productos' (GET)
Regresa todos los productos en la BD
Ejemplos de datos requeridos:
URL : /productos
```
```
'/pedidos' (GET)
Regresa todos los pedidos en la BD
Ejemplos de datos requeridos:
URL : /pedidos
```
```
'/addNewPedido'
Registra un pedido hecho por un usuario en la base de datos
Ejemplos de datos requeridos:
{
	"name" : "Ana Lopez",
	"email" : "ana@gmail.com",
	"direccion" : {
		"dir" : "Calle 9, 2212, Tolteca",
		"cuidad" : "Guadalupe",
		"estado" : "Nuevo Leon",
		"codigo" : 67175
	},
	"productos" : [
		{
			"name" : "Zanahoria",
			"cantidad" : 1,
			"precioInd" : 180,
			"precioTotal" : 180
		}],
	"precioT" : 180
}

```
