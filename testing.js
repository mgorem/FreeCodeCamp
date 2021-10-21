//Testing
//jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");

// Creating App Using Express
const app = express();

let items = [];
let workItems = [];
// Setting up to use EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* Simple get route that sends the browser
   Hello when user tries to access home route */
app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", (req, res) => {
 let item = req.body.newItem;

 if (req.body.newItem === "Work") {
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

app.post("/work", (req, res) => {
 let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});


//Listening on our local server port 3000 and sending output
app.listen(3000, () => {
  console.log("Server is Running Perfectly on port 3000");
});
