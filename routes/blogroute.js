const express = require("express");
const Blog = require("../models/blog.js");
const { mongo } = require("mongoose");
const router = express.Router();


//GET REQUEST
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //Sort the newest blog
    .then((result) => {
      res.render("blogs", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST REQUEST
router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Add new blog" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("singleblog", { title: "Single Blog", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE REQUEST
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
