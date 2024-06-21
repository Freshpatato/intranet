const express = require('express');
const { register, login, createUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create', protect, admin, createUser);

module.exports = router;
