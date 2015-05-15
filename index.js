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

// pre-seeded Phrase data
var phrases =[
  {id: 0, word: "Sushiritto", definition: "quite"},
  {id: 1, word: "Green Eggs & Ham", definition: "sure"},
  {id: 2, word: "Crayfish", definition: "depending"},
  {id: 3, word: "Foie Gras", definition: "omg"},
  {id: 4, word: "Kale", definition: "meh"}
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
  // find new phrase in the req.body (thanks body parser)
  var newphrase = req.body;
  // grab the highest id, increment by 1 and set as the new phrase's id
  newphrase.id = phrases[phrases.length - 1].id + 1;
  // add to our phrase array
  phrases.push(newphrase);
  // render the created object as json
  res.send(JSON.stringify(newphrase));
});

app.delete("/phrases/:id", function (req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id, 10);
  // find item in the array matching the id
  var targetItem = _.findWhere(phrases, {id: targetId});
  // get the index of the found item
  var index = phrases.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  phrases.splice(index, 1);
  // render deleted object
  res.send(JSON.stringify(targetItem));
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function (){
  console.log("listening on port 3000");
});