const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  comments: [commentSchema],
  date: { type: Date, default: Date.now },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
