const passport = require('passport');

const LocalStrattegy = require('./strrategies/localStrategy');

passport.use(LocalStrattegy);
