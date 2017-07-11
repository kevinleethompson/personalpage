var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictdb');
var Schema = mongoose.Schema;

var cedictSchema = new Schema({
  simp: String,
  trad: String,
  pinyin: String,
  definition: String
});


var CEDict = mongoose.model('CEDict', cedictSchema, 'cedict');

module.exports = CEDict;
