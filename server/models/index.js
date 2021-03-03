var db = require('../db');
var mysql = require('mysql');

var server = ''

var dbConnection;

dbConnection = mysql.createConnection({
  user: 'root',
  password: 'my_password',
  database: 'chat'
});

module.exports = {
  messages: {
    get: function () {
      console.log('models.messages.get');

      // connect to the db
    dbConnection.connect();
      // fetch the messages

    var messages;
   dbConnection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.log('ERROR:', err)
    } else {
      messages = results;
      console.log('result:', results);
    }
    });
      //structure messages

      //set response head
      //return messages

    }, // a function which produces all the messages
    post: function () {
      console.log('models.messages.post');

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function () {

    }
  }
};

