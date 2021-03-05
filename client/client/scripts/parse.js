var Parse = {

  server: 'http://127.0.0.1:3000/classes',

  create: function(message, successCB, errorCB = null) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server + '/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server + '/messages',
      type: 'GET',
      header:
      'Access-Control-Allow-Origin: *',
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};