// Article model with relationship to Notes

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: false
  },
  pic: {
    type: String,
    required: false
  },

  notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
