const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postsControllers');
const commentController = require('../controllers/commentsControllers');

router.get('/', postsControllers.listPosts);

router.post('/', postsControllers.createPost);

router.delete('/:postId', postsControllers.deletePost);

router.put('/:postId', postsControllers.updatePost);

router.get('/:postId', postsControllers.showPost);

// COMMENTS

router.get('/:postId/comments', commentController.listComments);

router.post('/:postId/comments', commentController.createComment);

router.get('/:postId/comments/:commentId', commentController.getComment);

router.put('/:postId/comments/:commentId', commentController.updateComment);

router.delete('/:postId/comments/:commentId', commentController.deleteComment);

module.exports = router;
