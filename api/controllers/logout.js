module.exports = {


  friendlyName: 'Logout',


  description: 'Logout something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    this.req.logout();
    this.res.send('logout success');
    this.res.redirect('/');
    return;

  }


};
