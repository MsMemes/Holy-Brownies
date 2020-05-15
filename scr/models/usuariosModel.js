const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const usuarioSchema = mongoose.Schema({
    fistName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
});

usuarioSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usuarioSchema.methods.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('user', usuarioSchema);