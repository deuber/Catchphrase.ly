// on page load
$(function(){
  // get and render the phrase
  phrase.all();
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.render = function(items, parentId, templateId) {
  // render a template
  var compile = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(compile({collection: items}));
};

// phrase OBJECT
function phrase() {};
phrase.all = function() {
  $.get("/phrases", function(res){ 
    // parse the response
    var phrases = JSON.parse(res);
    // render the results
    View.render(phrases, "phrase-ul", "phrases-template");
  });
};