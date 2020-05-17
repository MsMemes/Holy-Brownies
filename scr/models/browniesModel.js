const mongoose = require('mongoose');

const browniesSchema = mongoose.Schema({
    ingrediente : {
        type : String,
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
            console.log('here');
            return err;
        });
    }
};

module.exports = { Brownies };