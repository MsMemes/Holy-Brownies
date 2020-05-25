const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require ( 'bcryptjs' );
const jsonwebtoken = require( 'jsonwebtoken' );
const { Brownies } = require('../models/browniesModel');
const { Pasteles } = require('../models/pastelModel');
const { Paquetes } = require('../models/paqueteModel');
const { Users } = require( '../models/userModel' );
const {SECRET_TOKEN} = require('../config'); 
const cors = require('../middlewares/cors');
const validate = require('../middlewares/validateAdmiToken');
const jsonParser = bodyParser.json();


// Ruta del registro
router.post( '/register', jsonParser, ( req, res ) => {
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
router.post('/login', jsonParser, (req, res ) => {
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

                            jsonwebtoken.sign( userData, SECRET_TOKEN, { expiresIn : '1m' }, ( err, token ) => {
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
    let producto = req.params.producto;
    console.log(producto);

    if(!producto){
        res.statusMessage = "Porfavor ingresa un ingrediente a buscar";
        return res.status( 406 ).end();
    }

    Brownies
    .getBrownieByIngrediente(producto)
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

});

// Ruta para guardar un nuevo brownie
router.post('/addNewBrownie', [jsonParser, validate], ( req, res ) => {
    let ingrediente = req.body.ingrediente;
    let precio = req.body.precio;

    if(!ingrediente || !precio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newBrownie = { ingrediente, precio }

    Brownies
    .addNewBrownie( newBrownie )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    });
})

// Ruta para borrar un brownie
router.delete('/borrarBrownie/:ingrediente', validate, ( req, res ) => {

    let ingrediente = req.params.ingrediente;

    if(!ingrediente){
        res.statusMessage = "Please send the brownie to delete";
        return res.status( 406 ).end()
    }
    Brownies.deleteBrownie(ingrediente)
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That brownie was not found in the db";
        return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
    })
})

// Ruta para modificar el precio de un brownie
router.patch('/modificarBrownie/:brownie', [validate, jsonParser], ( req, res ) => {
    let ingrediente = req.params.brownie;
    let newPrecio = req.body.precio;

    if(!ingrediente || !newPrecio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Brownies.modificarBrownie(ingrediente, newPrecio)
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

// Ruta para agregar un pastel
router.post('/addNewPastel', [jsonParser, validate], ( req, res ) =>{
    let name = req.body.name;
    let precio = req.body.precio;

    if(!name || !precio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newPastel = { name, precio };

    console.log(newPastel);

    Pasteles.addNewPastel( newPastel )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    });
})

// Ruta para borrar un pastel
router.delete('/borrarPastel/:name', validate, ( req, res ) =>{
    let name = req.params.name;

    if(!name){
        res.statusMessage = "Please send the name of the cake you want to delete";
        return res.status( 406 ).end();
    }

    Pasteles.deletePastel(name)
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That cake was not found in the db";
        return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
    });
});

// Ruta para modificar el precio de un pastel
router.patch('/modificarPastel/:pastel', [validate, jsonParser], ( req, res ) => {
    let name = req.params.pastel;
    let newPrecio = req.body.precio;

    if(!name || !newPrecio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Pasteles.modificarPastel(name, newPrecio)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no cake with the name passed";
        return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
    })
})

// Ruta para agregar un paquete
router.post('/addNewPaquete', [jsonParser, validate], ( req, res ) =>{
    let name = req.body.name;
    let precio = req.body.precio;

    if(!name || !precio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newPaquete = { name, precio };

    Paquetes.addNewPaquete( newPaquete )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    });
})

// Ruta para borrar un paquete
router.delete('/borrarPaquete/:name', validate, ( req, res ) =>{
    let name = req.params.name;

    if(!name){
        res.statusMessage = "Please send the name of the promo you want to delete";
        return res.status( 406 ).end();
    }

    Paquetes.deletePaquete(name)
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That promo was not found in the db";
        return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
    });
});

// Ruta para modificar el precio de un paquete
router.patch('/modificarPaquete/:name', [validate, jsonParser], ( req, res ) => {
    let name = req.params.name;
    let newPrecio = req.body.precio;

    if(!name || !newPrecio){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Paquetes.modificarPaquete(name, newPrecio)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no promo with the name passed";
        return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
            return res.status( 500 ).end();
    })
})

module.exports = router;
