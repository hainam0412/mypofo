const express = require("express");
const Contact = require("../models/contact");

const Router = express.Router();

//Get request
Router.get("/", (req, res) => {
  Contact.find()
    .then((result) => {
      res.render("admin", { title: "info", infos: result });
    })
    .catch((err) => console.log(err));
});

//Post request
Router.post("/", (req, res) => {
  const info = new Contact(req.body);

  info
    .save()
    .then((result) => {
      res.redirect("/contact");
    })
    .catch((err) => console.log(err));
});

module.exports = Router;
