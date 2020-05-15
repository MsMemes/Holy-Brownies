const express = require('express');
const { PORT } = require('./scr/config');
const rutas = require('./scr/routes/routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {DATABASE_URL} = require('./scr/config');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const jsonParser = bodyParser.json();

// Init
const app = express();
require('./scr/passport/local-auth');

// Middlewares
app.use(morgan('dev'));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', rutas );




// Starting server
app.listen( PORT, () => {
    console.log( 'Sever on port ', PORT);

    const settings = {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    };

    new Promise( (resolve, reject) => {
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if ( err ){
                reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err =>{
        mongoose.disconnect();
        console.log( err );
    });
})