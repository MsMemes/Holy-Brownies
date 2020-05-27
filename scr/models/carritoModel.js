const mongoose = require( 'mongoose' );
const { Brownies } = require('./browniesModel');
const { Pasteles } = require('./pastelModel');
const { Paquetes } = require('./paqueteModel');

const carritoSchema = mongoose.Schema({
    productos : [{
        name : {
            type : String,
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
    status : {
        type : String,
        requiered : true
    },
    email : {
        type : String,
        requiered : true
    }
});

mongoose.pluralize(null);

const carritosCollection = mongoose.model( 'Carrito', carritoSchema );

const Carrito = {
    addNuevoProducto : function( newPedido ){
        return pedidosCollection
        .create( newPedido )
        .then( pedidoCreated => {
            return pedidoCreated;
        })
        .catch( err => {
            return err;
        })
    }
};

module.exports = { Pedidos }