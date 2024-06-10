const passport = require('passport');
const { SECRET_KEY } = require('../secret');
const { userModel } = require('../model/UserSchema');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; 
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    await userModel.findById(jwt_payload.id)
          .then(user => {
              if (user) {
                  return done(null, user);
              }
              return done(null, false);
          })
          .catch(err => console.error(err));
  }));
  