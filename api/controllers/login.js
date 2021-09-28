module.exports = {


  friendlyName: 'Login',


  description: 'Login something.',


  inputs: {
    username:{
      type: 'string'
    },
    password:{
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function ({username,password}) {
    var passport = require('passport');
    sails.log('logging in');
    await passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: 'did not login with correct credentials!!!!',
      },function (err, user, info){
      if(err) return res.send({message: info.message, user: user});
      this.req.login(user, function(err){
        if(err) return res.send(err);
        sails.log('logged in susccessfully using actions');
        return this.res.redirect('/');
      });

    });

  }

};
