var express = require('express');
var router = express.Router();
const postsRouter = require('./posts');
const usersRouter = require('./users');
const showdown = require('showdown');
const fs = require('fs');

/* GET home page. */
router.get('/:post', function (req, res, next) {
  var postName = req.params.post;
  // TODO: Garden. Pull weeds

  // http://localhost:3000/TheSecretOfMonkeyIsland
  fs.readFile(
    `_posts/${postName}/TheSecretofMonkeyIsland.md`,
    'utf8',
    function (err, markdown) {
      if (err) {
        console.error(err);
        // return 404
        return;
      }
      const converter = new showdown.Converter();
      const html = converter.makeHtml(markdown);
      res.render('index', {
        title: 'HOMEPAGE BABY',
        body: html,
      });
    }
  );
});

// router.use('/posts', postsRouter);
// router.use('/users', usersRouter);

module.exports = router;
