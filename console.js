var REPL = require("repl");
var db = require("./models");

varrepl = REPL.start("Phrase > ");
repl.context.db = db;

repl.on("exit", function () {
  console.log("GOODBYE!!");
  process.exit();
});

