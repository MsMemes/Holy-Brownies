const express = require('express');
const { PORT } = require('./scr/config');
const rutas = require('./scr/routes/routes');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));


// Routes
app.use('/', rutas );




// Starting server
app.listen( PORT, () => {
    console.log( 'Sever on port ', PORT);
})