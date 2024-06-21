const express = require('express');
const { getTopics, getTopicById, createTopic, addComment } = require('../controllers/forumController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/topics', getTopics);
router.get('/topics/:id', getTopicById);
router.post('/topics', protect, createTopic);
router.post('/topics/:id/comments', protect, addComment);

module.exports = router;
