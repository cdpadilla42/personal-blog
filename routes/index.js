var express = require('express');
var router = express.Router();
const showdown = require('showdown');
const fs = require('fs');

/* GET home page. */
router.get('/:post', function (req, res) {
  var postName = req.params.post;

  const path = `_posts/${postName}`;
  try {
    const files = fs.readdirSync(path);
    const fileName = files.find((file) => {
      return file.includes('.md');
    });

    console.log(fileName);

    fs.readFile(
      `_posts/${postName}/${fileName}`,
      'utf8',
      function (err, markdown) {
        if (err) {
          console.error(err);
          console.log(e);
          res.sendStatus(404);
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
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

module.exports = router;
