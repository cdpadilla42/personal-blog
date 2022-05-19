const showdown = require('showdown');

module.exports = (markdown) => {
  // Regex matches the bars, captures the meta data, and then goes on to capture the article.
  // The s (single line) option allows the dot to also capture new lines.
  const fileRegex = new RegExp('---(.*)---\n(.*)', 's');
  const splitMarkdown = markdown.match(fileRegex);
  if (!splitMarkdown || splitMarkdown.length < 3) {
    console.error('Misformatted document.');
    return res.sendStatus(404);
  }
  const [match, metaData, postBody] = splitMarkdown;
  const metaDataObj = {};

  console.log(postBody);

  metaData.split('\n').forEach((line) => {
    console.log(line);
    // Store into data object
    const [key, value] = line.split(':').map((item) => item.trim());
    // if tags, split into an array
    if (key === 'tags') {
      // Let's actually delineate tags by commas instead of -'s.
      const tags = value.split(',').map((item) => item.trim());
      metaDataObj[key] = tags;
    } else {
      metaDataObj[key] = value;
    }
  });

  // Convert to html
  const converter = new showdown.Converter();
  const postHtml = converter.makeHtml(postBody);

  return [metaDataObj, postHtml];
};
