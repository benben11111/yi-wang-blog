const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/personal-blog", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// mongoose.connect("mongodb://localhost/personal-blog", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });
