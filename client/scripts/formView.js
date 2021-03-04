var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    var room = RoomsView.$select.val();
    var roomname = '';

    room === 'ALL' ? roomname = 'lobby' : roomname = room;

    var message = {
      username: App.username,
      text: document.getElementById('message').value,
      roomname: roomname
    };

    // var cb = MessagesView.renderMessage.bind(message);
    if ( message.text.length > 0 ) {
      var post = Parse.create(message, MessagesView.renderMessageTop(message));
    }

    event.preventDefault();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};