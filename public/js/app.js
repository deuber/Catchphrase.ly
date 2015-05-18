// wait for the window to load
$(function () {
  var $newPhrase = $("#phrase-ul");
  var $phrasesCon = $('#phrase-form');
  var phrases = [];
  var phraseTemp = _.template($("#phrase-template").html()) 
 


   $.get("/phrases").
      done(function (phrases) {
          
        _(phrases).each(function (phrase) {
            var $phrase = $(phraseTemp(phrase))
            $phrase.data("_id", phrase._id);
            console.log($phrase.data())
            $phrasesCon.
              append($phrase);
          });
      });

  // wait for #newPhrase submit
  $newPhrase.on("submit", function (e) {
    // prevent the page from reloading
    e.preventDefault();

    // turn form data into a string we can use
    var phraseData = $newPhrase.serialize();

    // POST form data
    $.post("/phrases", phraseData).
      done(function (data) {
        console.log(data);
        // reset the form
        $newPhrase[0].reset();
        var $phrase = $(phraseTemp(data));

        // add id to $phrase
        $phrase.data("_id", data._id);
        $phrasesCon.append($phrase);
        phrases.push(data);
      });

  });

  $phrasesCon.on("click", ".phraseCon .delete", function (e) {
    var $phrase = $(this).closest(".phraseCon");
    var _id = $phrase.data("_id");
    console.log("DELETE", _id);
    $.ajax({
      url: "/phrases/" +_id,
      type: "DELETE"
    }).done(function () {
      $phrase.remove();
    });
  });
});