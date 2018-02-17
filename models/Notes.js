//Notes model

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({

  name: String,

  body: String
});

var Notes = mongoose.model("Notes", NoteSchema);

module.exports = Notes;
