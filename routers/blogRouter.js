const express = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
const router = express.Router();

// middleware for verification
const verifyLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

// Go to the blog page
router.get("/allBlogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.render("blogs", { blogs });
  });
});

// Go to the blog page
router.get("/blogs", verifyLogin, (req, res) => {
  User.findOne({ username: req.user.username })
    .populate("blogs")
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      //console.log(req.user.blogs);
      res.render("blogs", { blogs: user.blogs });
    });
  //         , (err, blogs) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(err);
  //     }
  //     res.render("blogs", { blogs });
  //   });
});

// Go to add new blog page to write a new blog
router.get("/addNewBlog", verifyLogin, (req, res) => {
  res.render("addNewBlog");
});

router.post("/addNewBlog", verifyLogin, (req, res) => {
  const title = req.body.blog.blogTitle;
  const content = req.body.blog.blogContent;

  const newBlog = {
    title,
    content,
    owner: req.user._id
  };

  //console.log(newBlog.owner);
  Blog.create(newBlog)
    .then(newlyCreatedBlog => {
      User.findOne({ username: req.user.username }, (err, blogCreator) => {
        if (err) {
          console.log(err);
        }
        blogCreator.blogs.push(newlyCreatedBlog);
        blogCreator.save();
      });
      //res.status(201).json(newlyCreatedBlog);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

// Click into a specific blog
router.get("/allBlogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .populate("comments")
    .exec((err, targetBlog) => {
      if (err) {
        //console.log(err);
        res.send(err);
      } else {
        res.render("blog", { targetBlog });
      }
    });

  //     .then(targetBlog => {
  //       targetBlog.populate("comments").execPopulate();
  //       res.render("blog", { targetBlog });

  //       //console.log(targetBlog);
  //     })
  //     .catch(e => {
  //       if (e) {
  //         res.status(404).send(e);
  //       }
  //     });
});

// Delete a blog
router.delete("/blogs/:id", verifyLogin, (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.status(404).send(err);
      res.redirect("/");
    }
    res.redirect("/");
  });
});

// Edit a blog
router.get("/blogs/:id/edit", verifyLogin, (req, res) => {
  Blog.findById(req.params.id, (err, targetBlog) => {
    if (err) {
      throw new Error();
    }
    res.render("editBlog", { targetBlog });
  });
});

// Update the blog
router.put("/blogs/:id", verifyLogin, (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, (err, blog) => {
    if (err) {
      throw new Error();
    }
  });
});

// Get to a comment page to add a comment to a specific blog
router.get("/allBlogs/:id/comments/addNewComment", (req, res) => {
  Blog.findById(req.params.id, (err, targetBlog) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.render("addNewComment", { targetBlog });
  });
});

router.post("/allBlogs/:id/comments", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      //console.log(req.body.comment);
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          blog.comments.push(comment);
          blog.save();
          res.redirect(`/allBlogs/${blog._id}`);
        }
      });
    }
  });
});

module.exports = router;
