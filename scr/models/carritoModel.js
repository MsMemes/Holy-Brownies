const mongoose = require( 'mongoose' );

const carritoSchema = mongoose.Schema({
    productos : [{
        name : {
            type : String,
            requiered : true
        },
        cantidad : {
            type : Number,
            requiered : true
        }, 
        precioInd : {
            type : Number,
            requiered : true
        },
        precioTotal : {
            type : Number,
            requiered : true
        }
    }],
    email : {
        type : String,
        requiered : true
    }
});

mongoose.pluralize(null);

const carritosCollection = mongoose.model( 'Carrito', carritoSchema );

const Carritos = {
    createNewCarrito : function( newCarrito ){
        return carritosCollection
        .create( newCarrito )
        .then( carritoCreated => {
            return carritoCreated;
        })
        .catch( err => {
            return err;
        })
    },
    deleteCarrito : function( email ){
        return carritosCollection
        .deleteOne({ email : email })
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        })
    },
    addProductToCarrito : function( email, newProducto ){
        return carritosCollection
        .updateOne({email : email}, { $push: {productos : newProducto}})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        })
    },
    getCarritoUser : function( email ){
        return carritosCollection
        .find({email : email})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        })
    }
};

module.exports = { Carritos }