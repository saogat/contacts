const router = require("express").Router();
const contactsRoutes = require("./contacts.js");

router.use("/contacts", contactsRoutes);

module.exports = router;
