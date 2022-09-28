const passport = require('passport');

const LocalStrattegy = require('./strrategies/localStrategy');
const JwtStrategy = require('./strrategies/jwtStrategy');

passport.use(LocalStrattegy);
passport.use(JwtStrategy);
