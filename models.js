var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/phrases_app");


var phraseSchema = new mongoose.Schema({
  // drop the id since mongoose will 
  // add a _id field for you when you create each item
  // title: {
  //   id: Number,
  //   default: 0
  // },
  // 
  word: {
    type: String,
    default: ""
  },
  definition: {
    type: String,
    default: ""
  }
});

//creates the model
var Phrases = mongoose.model("Phrases", phraseSchema);

module.exports.Phrases = Phrases;


// var phrase = new Phrase ({word:"foo", definition:"meaningless word"})
// phrase.save()
// Phrase.find({}, function(err, phrases){ console.log(phrases);});






