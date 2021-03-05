var Friends = {

  $username: $('#chats .username'),


  toggleStatus: function(username) {
    let divs = $('#chats')[0].children;
    for (let i = 0; i < divs.length; i++) {
      let div = divs[i].children[0];
      let thisUser = div.innerText;
      if (thisUser === username) {
        div.className = 'username friend';
      }
    }
  },

  listener: function() {
    $('#chats').on('click', '.username', (event) => {
      let username = event.target.innerText;
      Friends.toggleStatus(username);
    });
  }

};