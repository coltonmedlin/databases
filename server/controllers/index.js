var models = require('../models/index.js');
var mysql = require('mysql');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('CONTROLLER');
      // models.messages.get();
    }, // a function which handles a get request for all messages
    post: function (req, res) {

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('controllers.users.get');
    },
    post: function (req, res) {
      console.log('controllers.users.post');
      // grab the user name
      let username = req.body.username;

      console.log('username:', username);
      // connect to the database
      // post the response
      // close request (201)

    }
  }
};

