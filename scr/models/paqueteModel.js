const mongoose = require('mongoose');

const paqueteSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    precio : {
        type : Number,
        require : true
    }
});

mongoose.pluralize(null);

const paquetesCollection = mongoose.model( 'paquetes', paqueteSchema );

const Paquetes = {
    addNewPaquete : function( newPaquete ){
        return paquetesCollection
        .create( newPaquete )
        .then( createdPaquete => {
            return createdPaquete;
        })
        .catch( err => {
            return err;
        });
    },
    deletePaquete : function( name ){
        return paquetesCollection
        .deleteOne( {name : name} )
        .then( results =>{
            return results;
        })
        .catch( err => {
            return err;
        });
    },
    modificarPaquete : function(name, newPrecio){
        return paquetesCollection
        .updateOne({name : name}, {$set : {precio : newPrecio}})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        });
    }
}

module.exports = { Paquetes };