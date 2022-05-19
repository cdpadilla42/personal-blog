const fs = require('fs');
const parseMarkdownPost = require('../utils/parseMarkdownPost');

exports.getPost = (req, res) => {
  var postName = req.params.post;
  const path = `_posts/${postName}`;

  const files = fs.readdirSync(path);
  const fileName = files.find((file) => {
    return file.includes('.md');
  });

  if (!fileName) {
    console.error('No file found');
    return res.sendStatus(404);
  }

  const markdown = fs.readFileSync(`_posts/${postName}/${fileName}`, 'utf8');

  // Pull out tags
  const [metaDataObj, postHtml] = parseMarkdownPost(markdown);

  // Render page
  res.render('index', {
    ...metaDataObj,
    body: postHtml,
  });
};
