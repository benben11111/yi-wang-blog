const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://yi-wang-personal-blog:yiwangpersonalblog@cluster0-a6iyn.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// mongoose.connect("mongodb://localhost/personal-blog", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });
