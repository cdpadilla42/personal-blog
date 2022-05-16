const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: String, required: true, max: 100 },
  text: { type: String, required: true, max: 1000 },
  date: { type: Date, default: Date.now() },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
