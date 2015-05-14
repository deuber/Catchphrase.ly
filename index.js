// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// body parser config
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //

// pre-seeded phrase data
// A phrase object should have the properties: id, word, & definition
var phrases =[
  {id: 0, word: "GUI", defintion: "graphical user interface"},
  {id: 1, word: "DOM", defintion: "programming interface for HTML"},
  {id: 2, word: "Recursion", defintion: "process of repeating items"},
  {id: 3, word: "Unix", defintion: " multitasking, multiuser computer operating systems"},
  {id: 4, word: "SymbolicLink", defintion: "a file that contains a reference to another file"}
];

// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// phrases index path
app.get("/phrases", function (req, res){
  // render phrases index as JSON
  res.send(JSON.stringify(phrases));
});

app.post("/phrases", function (req, res){
  // phrase#create
});

app.delete("/phrases/:id", function (req, res){
  // phrase#delete
});

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000");
});