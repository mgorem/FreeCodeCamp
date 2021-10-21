//jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// Creating App Using Express
const app = express();

const items = [];
const workItems = [];
// Setting up to use EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* Simple get route that sends the browser
   Hello when user tries to access home route */
app.get("/", (req, res) => {
  const day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", (req, res) => {
 const item = req.body.newItem;
 if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
 } else {
   items.push(item);
   res.redirect("/");
 }
});

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", (req, res) => {
  res.render("about");
});


//Listening on our local server port 3000 and sending output
app.listen(3000, () => {
  console.log("Server is Running Perfectly on port 3000");
});
