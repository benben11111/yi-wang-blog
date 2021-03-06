const express = require("express");
const passport = require("passport");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Subcriber = require("../models/subscriber");
const router = express.Router();

// middleware for verification
const verifyLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

// Go to the login page
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

// log out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Go to the sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, newlyCreatedUser) => {
    //console.log(newUser);
    if (err) {
      console.log(err);
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      //console.log(req.body);
      res.redirect("/");
    });
  });
});

router.get("/subscribe", (req, res) => {
  res.render("home");
});

// Create a new subscriber and save the new subscriber in the database
router.post("/subscribe", (req, res) => {
  name = req.body.name;
  email = req.body.email;
  subcriber = {
    name,
    email
  };
  Subcriber.create(subcriber, (err, newSubcriber) => {
    if (err) {
      console.log(err);
    } else {
      newSubcriber.save();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "finallyinnyc@gmail.com",
          pass: "luanqibazao!!!"
        }
      });

      const mailOptions = {
        from: '"Yi Wang" <finallyinnyc@gmail.com>',
        to: req.body.email,
        cc: "finallyinnyc@gmail.com",
        subject: `Hi ${req.body.name}! Thanks for your subscription!`,
        text: "I look forward to updating you with my latest blog!"
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Email sent: ${info.response}`);
        }

        res.redirect("/");
      });
    }
  });
});

module.exports = router;
