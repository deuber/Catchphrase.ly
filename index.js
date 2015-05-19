// REQUIREMENTS //
var express = require("express"),
app = express(),
path = require("path"),
_ = require("underscore"),
bodyParser = require("body-parser");
//added for db
db = require('./models');

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//add for db
//app.use(express.static(__dirname + '/node_modules'));

// body parser config
//used for forms, grabs data
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //

// pre-seeded Phrase data
// var phrases =[
//   {id: 0, word: "GUI", definition: "graphical user interface"},
//   {id: 1, word: "DOM", definition: "programming interface for HTML"},
//   {id: 2, word: "Recursion", definition: "process of repeating items"},
//   {id: 3, word: "Unix", definition: " multitasking, multiuser computer operating systems"},
//   {id: 4, word: "SymbolicLink", definition: "a file that contains a reference to another file"}
// ];

// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

//orig without DB
// // phrases index path
// app.get("/phrases", function (req, res){
//   // render phrases index as JSON
//   res.send(JSON.stringify(phrases));
// });

//with DB
app.get('/phrases', function (req, res) {
  console.log("test")
  db.Phrases.find({},
    function (err, phrases) {
      res.send(phrases);
    });
});


//Without DB
// app.post("/phrases", function (req, res){
//   // find new phrase in the req.body (thanks body parser)
//   var newphrase = req.body;
//   // grab the highest id, increment by 1 and set as the new phrase's id
//   newphrase.id = phrases[phrases.length - 1].id + 1;
//   // add to our phrase array
//   phrases.push(newphrase);
//   // render the created object as json
//   res.send(JSON.stringify(newphrase));
// });

// With DB
app.post('/phrases', function (req, res) {
  console.log("POST")
  db.Phrases.create(req.body.phrases,
    function (err, phrase) {
      res.send(201, phrase);
    });
});



//Without DB
// app.delete("/phrases/:id", function (req, res){
//   // set the value of the id
//   var targetId = parseInt(req.params.id, 10);
//   // find item in the array matching the id
//   var targetItem = _.findWhere(phrases, {id: targetId});
//   // get the index of the found item
//   var index = phrases.indexOf(targetItem);
//   // remove the item at that index, only remove 1 item
//   phrases.splice(index, 1);
//   // render deleted object
//   res.send(JSON.stringify(targetItem));
// });
// With DB

app.delete("/phrases/:_id", function (req, res) {
 db.Phrases.findOneAndRemove({ _id: req.params._id },
   function(err, todo) {
     res.send(204);
   });
}); 

// listen on port 3000
app.listen(process.env.PORT || 3000, function (){
  console.log("listening on port 3000");
});