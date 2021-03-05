var db = require('../db');
var mysql = require('mysql');

var server = '';

var dbConnection;

dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});
dbConnection.connect();

module.exports = {
  messages: {
    get: function (callback) {
      console.log('models.messages.get');

      dbConnection.query('SELECT messages.id, messages.text, rooms.name as ?, users.name as ? FROM messages INNER JOIN rooms ON messages.room = rooms.id INNER JOIN users ON messages.user = users.id', ['room', 'username'], (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          console.log('message:', results);
          callback(null, results);
        }
      });
      //structure messages


    }, // a function which produces all the messages
    post: function (body, callback) {
      //check the room
      dbConnection.query('INSERT INTO rooms (name) VALUES (?)', [body.roomname], function(err) {
        if (err) { console.log(err); }
      });

      //check the user
      dbConnection.query('INSERT INTO users (name) VALUES (?)', [body.username], function(err) {
        if (err) { console.log(err); }
      });

      dbConnection.query('INSERT INTO messages (user, text, room) VALUES ((SELECT id from users where name = ?), ?, (SELECT id from rooms where name = ?))', [body.username, body.message, body.roomname], (err, results) => {
        if (err) {
          console.log('failed here:', err);
          callback(err);
        } else {
          callback(null);
        }
      });

      dbConnection.query('select * from messages', function(err) {
        if (err) { throw err; }
      });


    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function (username, callback) {
      // console.log('models.users.post');
      // query db to add username to users table
      dbConnection.query(`INSERT INTO users (name) VALUES (\'${username}\')`, (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });

    }
  }
};

