const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, toggleLike, addComment } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);

module.exports = router;