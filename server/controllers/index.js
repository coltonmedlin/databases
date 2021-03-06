var models = require('../models/index.js');
var mysql = require('mysql');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, messages) => {
        if (err) {
          res.status(404).end();
        } else {
          res.status(200);
          res.send(messages).end();
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST REQUEST:', req.body);
      models.messages.post(req.body, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
          res.end();
        } else {
          res.status(201).end();
        }
      });
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
      models.users.post(username, (err) => {
        if (err) {
          res.status(400).end();
        } else {
          res.status(201).end();
        }
      });

      console.log('username:', username);
    }
  }
};

