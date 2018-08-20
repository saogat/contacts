const router = require("express").Router();
const contactsController = require("../../controllers/contactsController");


router.route("/").get(contactsController.getContacts);

module.exports = router;

