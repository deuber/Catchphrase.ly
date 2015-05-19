var express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path")
  db = require("./models");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));


var views = path.join(process.cwd(), "views");
app.get("/", function (req, res) {
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});


app.post("/todos", function (req, res) {
  db.Todo.create(req.body.todo,
    function (err, todo) {
      res.send(201, todo);
    });
});

app.get("/todos", function (req, res) {
  db.Todo.find({},
    function (err, todos) {
      res.send(200, todos);
    });
});

app.delete("/todos/:id", function (req, res) {
  db.Todo.findAndRemoveOne({
    _id: req.params.id
  }, function (err, todo) {
    res.send(204); // NO CONTENT but OK!
  });
});

app.listen(3000, function () {
  console.log("WORKING");
});