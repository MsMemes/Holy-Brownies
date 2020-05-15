const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const localPass = require('../passport/local-auth');
const jsonParser = bodyParser.json();



router.post('/singup', jsonParser, passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.post('/login', jsonParser, (req, res, next) => {
    
});

module.exports = router;
