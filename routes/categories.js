var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/show/:category', function(req, res, next){
	var db = req.db;
  //...get from the collection ".."
	var posts = db.get('posts');
	posts.find({ category: req.params.category }, {}, function(err, posts) {
		res.render('index',{
			"title": req.params.category,
			"posts": posts
		});
	});
});

router.get('/add', function(req, res, next) {
  res.render('addcategory', {
    "title": "Add category"
  })
});

router.post("/add", function (req, res, next) {
  // Get Form values:
  var title = req.body.title; // grab data from a submitted form:

  // Form Validation to check values submitted by a form
  req.checkBody("title", "Title field is required").notEmpty();

  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    // render form once again
    res.render("addcategory", {
      "errors": errors,
      "title": title,
    });
  } else {
    var categories = db.get("categories");

    // Submit to DB
    categories.insert(
      {
        "title": title,
      },
      function (err, category) {
        if (err) {
          res.send("There was an issue submitting the category");
        } else {
          req.flash("success", "Category Submitted");
          res.location("/");
          res.redirect("/");
        }
      }
    );
  }
});

module.exports = router;