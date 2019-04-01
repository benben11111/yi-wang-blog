const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/contactMe", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "finallyinnyc@gmail.com",
      pass: "luanqibazao!!!"
    }
  });

  const mailOptions = {
    from: '"Yi Wang" <finallyinnyc@gmail.com>',
    to: req.body.userEmail,
    cc: "finallyinnyc@gmail.com",
    subject: `Hi ${req.body.username}! Your message is received!`,
    text: req.body.userMessage
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }

    res.redirect("/");
  });
});

module.exports = router;
