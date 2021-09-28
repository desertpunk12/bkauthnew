var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findOne({id}).exec(function (err, user) {
    cb(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  },function(username,password, done){
// passport.use(new LocalStrategy(
//   {username: username, password: password}
//   ), function (username, password, cb) {
  sails.log('local strat wingo');
  User.findOne({username: username}).exec(function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Username not found'});
    }

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) {
        return done(err);
      }
      if (!res) {
        sails.log('Invalid Password');
        return done(null, false, {message: 'Invalid Password'});
      }

      sails.log('Login Success');
      return done(null, user, {message: 'Login Successful'});
    });
  });
}));
