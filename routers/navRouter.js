const express = require("express");
const router = express.Router();

// Go to the home page
router.get("/", (req, res) => {
  res.render("home");
});

// Go to the contact page
router.get("/contactMe", (req, res) => {
  res.render("contact");
});

module.exports = router;
