// on page load
$(function(){
  // get and render the phrase
  Phrase.all();
  // set the view's behaviors
  View.init();
});

// // // // // // //

// VIEW OBJECT
// LISTEN
function View() {};
View.init = function() {
  // phrase form submit event listener
  $("#phrase-form").on("submit", function(e){
    // stop page reload
    e.preventDefault();
    // format form data into a query string
    var phraseParams = $(this).serialize();
    Phrase.create(phraseParams);
  });
};

//RENDER
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

// PHRASE OBJECT
// READ
function Phrase() {};
Phrase.all = function() {
  $.get("/phrases", function(res){ 
    // parse the response
    var phrases = JSON.parse(res);
    // render the results
    View.render(phrases, "phrase-ul", "phrases-template");
  });
};

//CREATE
Phrase.create = function(phraseParams) {
  $.post("/phrases", phraseParams).done(function(res){
    // once done, re-render all phrases
    Phrase.all();
  }).done(function(res){
    // reset form
    $("#phrase-form")[0].reset();
  });
};

//REMOVE
Phrase.delete = function(phrase) {
  var phraseId = $(phrase).data().id;
  $.ajax({
    url: '/phrases/' + phraseId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all phrases
      Phrase.all();
    }
  })
};