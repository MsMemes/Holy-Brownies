const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require ( 'bcryptjs' );
const jsonwebtoken = require( 'jsonwebtoken' );
const { Carritos } = require('../models/carritoModel');
const { Productos } = require('../models/productoModel');
const { Users } = require( '../models/userModel' );
const { Pedidos } = require('../models/pedidoModel');
const { SECRET_TOKEN } = require('../config'); 
const cors = require('../middlewares/cors');
const validate = require('../middlewares/validateAdmiToken');
const jsonParser = bodyParser.json();

router.use( jsonParser );

// Ruta del registro
router.post( '/register', ( req, res ) => {
    let {firstName, lastName, email, password, phone} = req.body;

    if( !firstName || !lastName || !email || !password, !phone ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }
    
    bcrypt.hash( password, 10 )
        .then( hashedPassword => {
            let newUser = { 
                firstName, 
                lastName, 
                password : hashedPassword, 
                email,
                phone
            };

            Users
                .createUser( newUser )
                .then( result => {
                    return res.status( 201 ).json( result ); 
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

// Ruta del login
router.post('/login', (req, res ) => {
    let { email, password } = req.body;

    if( !email || !password ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Users
        .getUserByEmail( email )
        .then( user => {

            if( user ){
                bcrypt.compare( password, user.password )
                    .then( result => {
                        if( result ){
                            let userData = {
                                firstName : user.firstName,
                                lastName : user.lastName,
                                email : user.email
                            };

                            jsonwebtoken.sign( userData, SECRET_TOKEN, { expiresIn : '10m' }, ( err, token ) => {
                                if( err ){
                                    res.statusMessage = "Something went wrong with generating the token.";
                                    return res.status( 400 ).end();
                                }
                              
                                return res.status( 200 ).json( { token } );

                            });
                        }
                        else{
                            throw new Error( "Invalid credentials" );
                        }
                    })
                    .catch( err => {
                        res.statusMessage = err.message;
                        return res.status( 400 ).end();
                    });
            }
            else{
                throw new Error( "User doesn't exists!" );
            }
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});


// Ruta del search bar
router.get('/search/:producto', ( req, res ) => {
    // const { sessiontoken } = req.headers;
    // jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
    //     if( err ){
    //         res.statusMessage = "Session expired!";
    //         return res.status( 400 ).end();
    //     }

        let producto = req.params.producto;
        console.log(producto);
    
        if(!producto){
            res.statusMessage = "Porfavor ingresa un ingrediente a buscar";
            return res.status( 406 ).end();
        }
    
        Productos
        .getSearchBar(producto)
        .then(productos => {
            console.log(productos);
            if(productos){
                return res.status( 200 ).json(productos);
            }
            else{
                res.statusMessage = "No hay resultados para ", producto;
                return res.status( 404 ).end();
            }
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status( 500 ).end();
        })
    // });
});

// Ruta para guardar un nuevo producto
router.post('/addNewProducto', validate, ( req, res ) => {
    let name = req.body.name;
    let precio = req.body.precio;
    let tipo = req.body.tipo;

    if(!name || !precio || !tipo){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newProducto = { name, precio, tipo }

    Productos
    .addNewProducto( newProducto )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    });
})

// Ruta para borrar un producto
router.delete('/borrarProducto/:name', validate, ( req, res ) => {

    let name = req.params.name;

    if(!name){
        res.statusMessage = "Please send the product to delete";
        return res.status( 406 ).end()
    }
    Productos.deleteProducto(name)
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That product was not found in the db";
            return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
})

// Ruta para modificar el precio de un producto
router.patch('/modificarProducto/:name', validate, ( req, res ) => {
    let name = req.params.name;
    let newPrecio = req.body.precio;

    if(!name || !newPrecio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Productos.modificarProducto(name, newPrecio)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no brownie with the name passed";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
})

// Ruta para regresar un usario por correo
router.get('/perfil/:correo', ( req, res ) => {
    const { sessiontoken } = req.headers;
    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        let correo = req.params.correo;
        console.log(correo);
    
        if(!correo){
            res.statusMessage = "Please send the email";
            return res.status( 406 ).end();
        }
    
        Users.getUserByEmail(correo)
        .then(results => {
            console.log(results);
            if(!results){
                res.statusMessage = "No user was found with that email";
                return res.status( 404 ).end();
            }
            else{
                return res.status( 202 ).json(results);
            }
        })
        .catch( err => {
            res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
        })
    });
    
});

// Ruta para crear un carrito
router.post('/agregarCarrito', ( req, res ) =>{
    const { sessiontoken } = req.headers;
    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        let productos = req.body.productos;
        let email = req.body.email;
    
        let newCarrito = { productos, email };
        let newProductos = productos;
    
        Carritos
        .getCarritoUser( email )
        .then( results => {
            if( results.length > 0){
                Carritos
                .addProductToCarrito( email, newProductos )
                .then( carritoMod => {
                    return res.status( 201 ).json(carritoMod);
                })
                .catch( err => {
                    res.statusMessage =  "Somethong went wrong with the DB";
                    return res.status( 500 ).end();
                })
            }
            else{
                Carritos
                .createNewCarrito( newCarrito )
                .then( createdCarrito => {
                    return res.status( 201 ).json(createdCarrito);
                })
                .catch( err => {
                    res.statusMessage =  "Somethong went wrong with the DB";
                    return res.status( 500 ).end();
                })
            }
        })
        .catch( err => {
            res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
        })
    });
    
});

// Ruta que regresa el carrito de un usuario
router.get('/carrito/:email', (req, res) => {
    const { sessiontoken } = req.headers;
    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

<<<<<<< HEAD
    Carritos
    .getCarritoUser( email )
    .then( results => {
        return res.status( 200 ).json(results);
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
=======
        let email = req.params.email;

        Carritos
        .getCarritoUser( email )
        .then( results => {
            return res.status( 200 ).json(results);
        })
        .catch( err => {
            res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
        })
    });
>>>>>>> c87e2b1b910e99a54f05be39819c31e5c6ef5369
})

// Ruta para agregar un nuevo pedido 
router.post('/addNewPedido', ( req, res ) => {
    const { sessiontoken } = req.headers;
    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        let name = req.body.name;
        let email = req.body.email;
        let direccion = req.body.direccion;
        let productos = req.body.productos;
        
        const newPedido = {
            name,
            email,
            direccion,
            productos
        }
        Pedidos.addNuevoPedido( newPedido )
        .then( results => {
            return res.status( 201 ).json(results);
        })
        .catch( err => {
            res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
        })
    });
    
});

// Ruta que regresa los pedidos de un usuario
router.get('/pedidosUsuario/:email', ( req, res ) => {
    const { sessiontoken } = req.headers;
    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        let email = req.params.email;

        Pedidos
        .getPedidosByEmail( email )
        .then( results =>{
            return res.status( 200 ).json(results);
        })
        .catch( err => {
            res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
        })
    });
    
})

// Ruta para eliminar un usuario
router.delete('/deleteUsuario/:correo', validate, ( req, res ) => {
    let correo = req.params.correo;

    if(!correo){
        res.statusMessage = "Send the email of the user you want to delete";
        return res.status( 406 ).end();
    }

    Users.borrarUsuario(correo)
    .then( results => {
        if(results.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "There was no user with that email";
            return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    });
})

//Ruta para ver todos los usuarios
router.get( '/clientes', ( req, res ) => {
    Users
    .verClientes()
    .then( result => {
        return res.status( 200).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

//Ruta para ver todos los productos
router.get( '/productos', ( req, res ) => {
    Productos
    .verProductos()
    .then( result => {
        return res.status( 200).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

<<<<<<< HEAD
//Ruta para ver todos los pedidos

router.get( '/pedidos', ( req, res ) => {
    Pedidos
    .verPedidos()
    .then( result => {
        return res.status( 200).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});
=======
>>>>>>> c87e2b1b910e99a54f05be39819c31e5c6ef5369
module.exports = router;
