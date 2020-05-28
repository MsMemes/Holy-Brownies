const mongoose = require( 'mongoose' );
// const { Brownies } = require('./browniesModel');
// const { Pasteles } = require('./pastelModel');
// const { Paquetes } = require('./paqueteModel');

const direccionSchema = mongoose.Schema({
    dir : {
        type : String,
        requiered : true
    },
    ciudad : {
        type : String,
        requiered : true
    },
    estado : {
        type : String,
        requiered : true
    },
    codigo : {
        type : String,
        requiered : true
    }
});

const pedidoSchema = mongoose.Schema({
    name : {
        type : String,
        requiered : true
    },
    email : {
        type : String,
        requiered : true
    },
    direccion : {
        type : direccionSchema,
        requiered : true
    },
    precioTotal : {
        type : Number,
        requiered : true
    }
});

mongoose.pluralize(null);

const pedidosCollection = mongoose.model( 'Pedidos', paqueteSchema );

const Pedidos = {
    addNuevoPedido : function( newPedido ){
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