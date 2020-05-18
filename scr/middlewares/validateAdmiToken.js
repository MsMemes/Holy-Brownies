const {TOKEN_ADMI} = require('../config');

function validate( req, res, next ){
    
    let tokenB = req.headers.authorization;
    let bearer = false;

    if(tokenB === `Bearer ${TOKEN_ADMI}`){
        bearer = true;
    }
    else {
        res.statusMessage = "The 'authorization' TOKEN is invalid.";
        return res.status( 401 ).end();
    }

    next();
}

module.exports = validate;