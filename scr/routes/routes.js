const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const localPass = require('../passport/local-auth');
const { Brownies } = require('../models/browniesModel');
const jsonParser = bodyParser.json();


// Ruta del registro
router.post('/singup', jsonParser, passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

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
        if(productos.length > 0){
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

module.exports = router;
