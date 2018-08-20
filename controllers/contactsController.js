var axios = require("axios");
var keys = require("../keys.js");

// Defining methods for the technologiesController
module.exports = {
  getContacts: function(req, res) {
    var contacts = [];
    axios({
      async: true,
      crossDomain: true,
      method:'get',
      url: "https://api.salesloft.com/v2/people.json",
      headers:{"Authorization": keys.salesloft.authorization,
                "Cache-Control": "no-cache"}
    })
      .then(function(response) {
        response.data.data.forEach(e => {
          var contact = {};
          contact.name = e.display_name;
          contact.email = e.email_address;
          contact.title = e.title;
          contacts.push(contact);
        });
        res.json(contacts);
    });
  }
}
