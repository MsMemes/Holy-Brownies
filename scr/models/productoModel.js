const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    precio : {
        type : Number,
        required : true
    },
    tipo : {
        type : String,
        required : true
    }
});

mongoose.pluralize(null);

const ProductoCollection = mongoose.model( 'Productos', productoSchema );

const Productos = {
    getSearchBar : function( ingrediente ){
        return ProductoCollection
        .find({ $text: { $search: ingrediente } })
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        });
    },
    addNewProducto : function( newProducto ){
        return ProductoCollection
        .create( newProducto )
        .then( createdProducto => {
            return createdProducto;
        })
        .catch( err => {
            return err;
        });
    },
    deleteProducto : function( name ){
        return ProductoCollection
        .deleteOne( {name : name} )
        .then( results =>{
            return results;
        })
        .catch( err => {
            return err;
        });
    },
    modificarProducto : function(name, newPrecio){
        return ProductoCollection
        .updateOne({name : name}, {$set : {precio : newPrecio}})
        .then( results => {
            return results;
        })
        .catch( err => {
            return err;
        });
    },
    verProductos : function(){
        return ProductoCollection
        .find()
        .then( todosLosProductos => {
            return todosLosProductos;
        })
        .catch( err => {
            return err;
        });
    }
};

module.exports = { Productos };