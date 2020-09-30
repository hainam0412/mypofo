const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoute = require("./routes/blogroute");
const contactRoute = require("./routes/contactroute");
const { response } = require("express");

//express app
const app = express();

//Set connect to MongoDB
const dbUrl =
  "mongodb+srv://meap:test1234@cluster0.wu86i.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000)) // listen after connect to database
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
app.set("views", "dist/myviews");

//middleware & static files;
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: true })); // form validation from blogs create page
app.use(morgan("dev"));

//mongoose and mongo sandbox routes

//router

//GET REQUEST
app.get("/", (req, res) => {
  res.render("index", { title: "N-Design" });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/info", (req, res) => {
  res.render("info");
});

//Blog route
app.use("/blogs", blogRoute);

//Contact route
app.use("/admin", contactRoute);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

