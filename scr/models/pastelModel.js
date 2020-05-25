const mongoose = require('mongoose');

const pastelSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    precio : {
        type : Number,
        required : true
    },
    url : {
        type : Number,
        required : false
    }
});

mongoose.pluralize(null);

const pastelesCollection = mongoose.model( 'Pasteles', pastelSchema );

const Pasteles = {
    addNewPastel : function( newPastel ){
        return pastelesCollection
        .create( newPastel )
        .then( createdPastel => {
            return createdPastel;
        })
        .catch( err => {
            return err;
        });
    },
    deletePastel : function( name ){
        return pastelesCollection
        .deleteOne( {name : name} )
        .then( results =>{
            return results;
        })
        .catch( err => {
            return err;
        });
    },
    modificarPastel : function(name, newPrecio){
        return pastelesCollection
        .updateOne({name : name}, {$set : {precio : newPrecio}})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        });
    }
}

module.exports = { Pasteles };
