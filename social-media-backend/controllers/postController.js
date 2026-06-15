const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const newPost = await Post.create({
            author: req.user.id,
            content,
            image
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profilePicture')
            .sort({ createdAt: -1 });
            res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const hasLiked = post.likes.includes(req.user.id);
        if (hasLiked) {
            post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
        } else {
            post.likes.push(req.user.id);
        }
        await post.save();
        res.json({ message: hasLiked ? 'Post unliked' : 'Post liked', likesCount: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        
        const comment = await Comment.create({
            post: req.params.id,
            author: req.user.id,
            content
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};