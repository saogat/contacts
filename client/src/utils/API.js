import axios from "axios";

export default {

  //===================================================
  // Contacts

  //GET
  getContacts: function(query) {
    return axios.get("/api/contacts/");
  }
};
