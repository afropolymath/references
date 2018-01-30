const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const config = require('./index');
const User = require('../models/user');

passport.serializeUser = (user, done) => {
  done(null, user);
};

passport.deserializeUser = (user, done) => {
  done(null, user);
};

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.find({ email }).then((users) => {
    if (!users.length) {
      return done(null, false, { message: 'User was not found' });
    }
    const user = users[0];
    return User.validatePassword(user, password).then((match) => {
      if (!match) {
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, user);
    }).catch(done);
  }).catch(done);
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.APP_SECRET,
}, (payload, done) => {
  User.findById(payload.id).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(done);
}));

module.exports = passport;