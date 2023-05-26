const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;






passport.use(new JWTStrategy({
    secretOrKey: '1',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, (jwtPayload, cb) => {
    // Find the user in the database
    User.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}));
