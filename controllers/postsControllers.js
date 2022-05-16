const Post = require('../models/post');
const { check, validationResult } = require('express-validator');

exports.listPosts = (req, res) => {
  Post.find().exec((err, postList) => {
    if (err) return next(err);
    res.json({ postList });
  });
};

exports.showPost = (req, res, next) => {
  Post.findById(req.params.postId).exec((err, post) => {
    if (err) return next(err);
    if (post == null) {
      const error = new Error('Post Not Found');
      error.status = 404;
      return next(error);
    }
    res.json({ post });
  });
};

exports.createPost = [
  // Validate & Sanitize
  check('title').trim(),
  check('published').toBoolean(),
  // Process
  (req, res, next) => {
    // New Post
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      date: Date.now(),
      published: req.body.published,
      user: req.body.user,
    });
    // Handle Errs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors,
        post,
      });
    } else {
      // Save
      post.save((err, savedPost) => {
        if (err) return next(err);
        res.json({
          savedPost,
        });
      });
    }
  },
];

exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.postId, (err, post) => {
    if (err) return next(err);
    if (post == null) {
      const error = new Error('Post Not Found');
      error.status = 404;
      return next(error);
    }
    res.send(`Deleted ${post.title}`);
  });
};

exports.updatePost = [
  // Validate & Sanitize
  check('title').trim(),
  check('published').toBoolean(),
  // Process
  (req, res, next) => {
    // New Post
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      date: Date.now(),
      published: req.body.published,
      user: req.body.user,
      _id: req.params.postId,
    });
    // Handle Errs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors,
        post,
      });
    } else {
      // Save
      Post.findByIdAndUpdate(req.params.postId, post, {}, (err) => {
        if (err) return err;
        res.json({
          post,
        });
      });
    }
  },
];
