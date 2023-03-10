var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

// Home page blog post
router.get('/', function(req, res, next) {
  var db = req.db;
  // get elem from posts collection:
  var posts = db.get('posts');
  posts.find({},{},function(err, posts) {
    res.render('index', {
      "posts": posts
    });
  });
  
});

module.exports = router;
