const Comment = require('../models/comment');
const { check, validationResult } = require('express-validator');

exports.listComments = (req, res, next) => {
  Comment.find().exec((err, comments) => {
    if (err) return next(err);
    res.json({
      comments,
    });
  });
};

exports.getComment = (req, res, next) => {
  Comment.findById(req.params.commentId).exec((err, comment) => {
    if (err) return next(err);
    if (comment == null) {
      const error = new Error('Comment not found');
      error.status = 404;
      return next(error);
    }
    res.json({
      comment,
    });
  });
};

exports.updateComment = [
  // validate & Sanitize
  check('text').isLength({ min: 1 }),
  check('author').isLength({ min: 1 }),
  // Process
  (req, res, next) => {
    // create comment
    const comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      date: Date.now(),
      _id: req.params.commentId,
      post: req.params.postId,
    });
    // handle errs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        comment,
      });
    } else {
      // save
      Comment.findByIdAndUpdate(req.params.commentId, comment, {}, (err) => {
        res.json({
          comment,
        });
      });
    }
  },
];

exports.createComment = [
  // validate & Sanitize
  check('author').isLength({ min: 1 }),
  check('text').isLength({ min: 1 }),
  // process
  (req, res, next) => {
    // Create new comment
    const comment = new Comment({
      author: req.body.author,
      text: req.body.text,
      date: Date.now(),
      post: req.params.postId,
    });
    // handle errs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors,
        comment,
      });
      // TODO Redirect to form
    } else {
      // TODO save comment
      comment.save((err, savedComment) => {
        if (err) return next(err);
        res.json({
          comment: savedComment,
        });
      });
    }
  },
];

exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.commentId).exec((err, comment) => {
    if (err) return next(err);
    if (comment == null) {
      const error = new Error('Comment Not Found');
      error.status = 404;
      return next(error);
    }
    res.send(`Deleted ${comment.author}'s comment`);
  });
};
