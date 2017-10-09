var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HistorySchema = new Schema({

  date: {
    type: String
  },
  title: {
    type: String
  },
  snippet: {
    type:String
  },
  url: {
    type:String
  }
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;
