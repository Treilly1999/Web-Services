const passport = require('passport');
const User = require('../models/users');
const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local');

//passport strategy auto created by mongoose plugin
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = router;