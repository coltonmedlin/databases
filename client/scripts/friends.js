var Friends = {

  $username: $('#username'),


  initialize: function() {
    $("body").click(function(event) {
      Friends.toggleStatus(event);
    });
  },

  toggleStatus: (event) => {
    let user = event.target.id;
    console.log(user);
    App.friendsList[user] = 'placeholder';
    Messages.refresh();
  }
};