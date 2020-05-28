const mongoose = require( 'mongoose' );

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
            type : Number,
            requiered : true
        }
    },
    productos : [{
        name : {
            type : String,
            requiered : true
        },
        tag : {
            type: String,
            requiered :true
        },
        precioInd : {
            type : Number,
            requiered : true
        },
        cantidad : {
            type : Number,
            requiered : true
        }, 
        precioTotal : {
            type : Number,
            requiered : true
        }
    }],
    precioT : {
        type : Number,
        requiered : true
    }
});

mongoose.pluralize(null);

const pedidosCollection = mongoose.model( 'Pedidos', pedidoSchema );

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
    },
    getPedidosByEmail : function( email ){
        return pedidosCollection
        .find( {email : email})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        })
    },
    verPedidos : function(){
        return pedidosCollection
        .find()
        .then( todosLosPedidos => {
            return todosLosPedidos;
        })
        .catch( err => {
            return err;
        });
    }
};

module.exports = { Pedidos }