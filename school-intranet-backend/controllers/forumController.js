const Topic = require('../models/Topic');

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTopic = async (req, res) => {
  const { title, content } = req.body;
  const author = req.user.username;

  try {
    const topic = await Topic.create({ title, content, author });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { content } = req.body;
  const author = req.user.username;

  try {
    const topic = await Topic.findById(req.params.id);
    topic.comments.push({ content, author });
    await topic.save();
    res.status(201).json(topic.comments[topic.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
