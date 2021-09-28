/**
 * AuthControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
module.exports = {
  logins: async function(req,res){
    sails.log('logging in');
    passport.authenticate('local',function (err, user, info){
      if(err || !user) return res.send({ message: info.message, user });
      req.login(user, function(err){
        if (err) return res.send(err);
        sails.log("User " + user.id + " has logged in");
        res.redirect("/");
      });
    })(req,res);
  },
  logouts: function(req,res){
    req.logout();
    // res.send('logout success');
    res.redirect('/');
  },
  signups: async function(req,res){
    var newUser = await User.create({
      username: req.username,
      password: req.password,
      fullName: req.fullName,
    }).fetch();

    req.login(newUser, function(err){
      if(err) return res.send(err);
      return res.redirect('/');
    });

  }


};

