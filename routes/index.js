var express = require('express');
var router = express.Router();
const { getPost } = require('../controllers/indexController.js');

/* GET home page. */
router.get('/:post', getPost);

module.exports = router;
