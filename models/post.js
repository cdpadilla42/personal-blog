const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, default: 'Untitled' },
  text: { type: String },
  date: { type: Date, default: Date.now() },
  published: { type: Boolean, required: true, default: false },
  user: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
