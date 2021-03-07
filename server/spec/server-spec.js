/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('set foreign_key_checks = 0');
    dbConnection.query('truncate ' + 'messages');
    dbConnection.query('truncate ' + 'rooms');
    dbConnection.query('truncate ' + 'users');
    dbConnection.query('set foreign_key_checks = 1', done);


  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, () => {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];
        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);
          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });

      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Valjean',
        message: 'Men like you can never change!',
        roomname: 'main'
      }
    }, () => {
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal('Men like you can never change!');
        expect(messageLog[0].room).to.equal('main');
        done();
      });
    });
  });

  it('Should handle duplicate users', function(done) {
    // Let's insert a user into the db
    dbConnection.query('INSERT INTO users (name) VALUES (\'Jean-Baptiste\')', function(err) {
      // if (err) { throw err; }
    });

    dbConnection.query('SELECT * FROM users', function(err, data) {
      expect(data.length).to.equal(1);
    });

    dbConnection.query('INSERT INTO users (name) VALUES (\'Jean-Baptiste\')', function(err) {
      // if (err) { throw err; }
    });

    dbConnection.query('SELECT * FROM users', function(err, data) {
      expect(data.length).to.equal(1);
    });

    done();
  });

  it('Should handle duplicate rooms', function(done) {
    // Let's insert a user into the db
    dbConnection.query('INSERT INTO rooms (name) VALUES (\'Hack_Lounge\')', function(err) {
      // if (err) { throw err; }
    });

    dbConnection.query('SELECT * FROM rooms', function(err, data) {
      expect(data.length).to.equal(1);
    });

    dbConnection.query('INSERT INTO rooms (name) VALUES (\'Hack_Lounge\')', function(err) {
      // if (err) { throw err; }
    });

    dbConnection.query('SELECT * FROM rooms', function(err, data) {
      expect(data.length).to.equal(1);
    });
    done();
  });

  it('Should allow duplicate messages', function(done) {
    // Let's insert a user into the db
    dbConnection.query('INSERT INTO messages (text) VALUES (\'Welcome to the Hack Lounge\')', function(err) {
      // if (err) { throw err; }
    });

    dbConnection.query('INSERT INTO messages (text) VALUES (\'Welcome to the Hack Lounge\')', function(err) {
      // if (err) { throw err; }
    });


    dbConnection.query('SELECT * FROM messages', function(err, data) {
      expect(data.length).to.equal(2);
    });

    done();
  });


  it('Should respond with an error to a bad request', function(done) {
    // Let's insert a user into the db
    dbConnection.query('INSERT INTO messages (badRow) VALUES (\'Welcome to the Hack Lounge\')', function(err) {
      // if (err) { throw err; }
      expect(err).to.be(true);
    });

    done();
  });


});

