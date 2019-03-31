const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
// const nodemailer = require("nodemailer");
require("./database/mongoose");
const User = require("./models/user");
const userRouter = require("./routers/userRouter");
const blogRouter = require("./routers/blogRouter");
const navRouter = require("./routers/navRouter");

const app = express();

// Create view engine of ejs
app.set("view engine", "ejs");

const publicDirectoryPath = path.join(__dirname, "./public");
// Use static files for styling
app.use(express.static(publicDirectoryPath));

// Set up body parser to get front-end data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up method override
app.use(methodOverride("_method"));

// Set up passport to authenticate user
app.use(
  expressSession({
    secret: "thisisasecretfortheblogapp",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Notify other routes if there is a current user
app.use((req, res, next) => {
  res.locals.activeUser = req.user;
  next();
});

// Use all routers
app.use(userRouter);
app.use(blogRouter);
app.use(navRouter);

// Create the server for the project
const port = 3000;

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is up on port ${port}.`);
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "wangyi.benben@gmail.com",
//     pass: "MQpe2012!"
//   }
// });

// const mailOptions = {
//   from: "wangyi.benben@gmail.com",
//   to: "wangyi17@seas.upenn.edu",
//   subject: "Sending My First Email",
//   text: "That was easy!"
// };

// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Email sent: ${info.response}`);
//   }
// });
