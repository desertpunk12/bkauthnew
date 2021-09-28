module.exports = {


  friendlyName: 'Signup',


  description: 'Signup something.',


  inputs: {
    username: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    fullName: {
      type: 'string',
      required: true,
    },
  },


  exits: {

  },


  fn: async function ({username,password,fullName}) {
    var newUser = await User.create({
      username: username,
      password: password,
      fullName: fullName,
      }).fetch();
    return this.req.login(newUser, function(err){
      if(err) return this.next(err);
    });

  }


};
