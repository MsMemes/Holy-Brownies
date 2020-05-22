const mongoose = require('mongoose');

const browniesSchema = mongoose.Schema({
    ingrediente : {
        type : String,
        require : true
    },
    precio : {
        type : Number,
        require : true
    }
});

mongoose.pluralize(null);

const browniesCollection = mongoose.model( 'Brownies', browniesSchema );

const Brownies = {
    getBrownieByIngrediente : function( ingrediente ){
        return browniesCollection
        .find({ $text: { $search: ingrediente } })
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        });
    },
    addNewBrownie : function( newBrownie ){
        return browniesCollection
        .create( newBrownie )
        .then( createdBrownie => {
            return createdBrownie;
        })
        .catch( err => {
            return err;
        });
    },
    deleteBrownie : function( ingrediente ){
        return browniesCollection
        .deleteOne( {ingrediente : ingrediente} )
        .then( results =>{
            return results;
        })
        .catch( err => {
            console.log('here');
            return err;
        });
    },
    modificarBrownie : function(ingrediente, newPrecio){
        return browniesCollection
        .updateOne({ingrediente : ingrediente}, {$set : {precio : newPrecio}})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        });
    }
};

module.exports = { Brownies };
