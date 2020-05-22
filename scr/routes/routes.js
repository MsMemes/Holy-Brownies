const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const localPass = require('../passport/local-auth');
const { Brownies } = require('../models/browniesModel');
const { Pasteles } = require('../models/pastelModel');
const { Users } = require( '../models/userModel' );
const cors = require('../middlewares/cors');
const validate = require('../middlewares/validateAdmiToken');
const jsonParser = bodyParser.json();


// Ruta del registro
/*router.post('/singup', jsonParser, passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));*/
router.post('/singup', jsonParser, (req, res ) => {
    let {firstName, lastName, email, password} = req.body;

    if( !firstName || !lastName || !email || !password ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }
    
    let newUser = { firstName, lastName, password, email };

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

// Ruta del login
router.post('/login', jsonParser, (req, res, next) => {
    
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
            return res.status( 202 ).json(results);
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

module.exports = router;
