var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
var db = require("monk")("localhost/nodeblog");

router.get('/show/:id', function(req, res, next) {
	var posts = db.get('posts');
  // use monk func and "id" from params:
	posts.findOne({ _id: req.params.id }, function(err, post) {
    res.render('show',{
      "post": post
    });
	});
});

router.get("/add", function (req, res, next) {
  // use collection categories after insertOne() values
  var categories = db.get('categories');
  categories.find({}, {}, function(err, categories) {
    res.render("addpost", {
      "title": "Add post",
      "categories": categories
    });
  });
  
});

router.post("/add", function (req, res, next) {
  // Get Form values:
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();

  if (req.files.mainimage) {
    var mainImageOriginalName = req.files.mainimage.originalname;
    var mainImageName = req.files.mainimage.name;
    var mainImageMime = req.files.mainimage.mimetype;
    var mainImagePath = req.files.mainimage.path;
    var mainImageExt = req.files.mainimage.extension;
    var mainImageSize = req.files.mainimage.size;
  } else {
    var mainImageName = "noimage.png";
  }

  // Form Validation
  req.checkBody("title", "Title field is required").notEmpty();
  req.checkBody("body", "Body field is required");

  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    // render form once again
    res.render("addpost", {
      "errors": errors,
      "title": title,
      "body": body,
    });
  } else {
    var posts = db.get("posts");

    // Submit to DB
    posts.insert(
      {
        "title": title,
        "body": body,
        "category": category,
        "date": date,
        "author": author,
        "mainimage": mainImageName,
      },
      function (err, post) {
        if (err) {
          res.send("There was an issue submitting the post", post);
        } else {
          req.flash("success", "Post Submitted");
          res.location("/");
          res.redirect("/");
        }
      }
    );
  }
});

router.post("/addcomment", function (req, res, next) {
  // Get Form values:
  var name = req.body.name;
  var email = req.body.email;
  var body = req.body.body;
  var postid = req.body.postid;
  var commentdate = new Date();

  // Form Validation
  req.checkBody("name", "Name field is required").notEmpty();
  req.checkBody("email", "Email field is required").notEmpty();
  req.checkBody("email", "Email field is not formatted correctly").isEmail();
  req.checkBody("body", "Body field is required").notEmpty();

  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    var posts = db.get('posts');
    posts.findById(postid, function (err, post) {
      // render form once again
      res.render("show", {
        "errors": errors,
        "post": post,
      });
    });
  } else {
    var comment = {
      "name": name,
      "email": email,
      "body": body,
      "commentdate": commentdate
    }

    var posts = db.get("posts");

    // Submit to DB
    posts.update(
      {
        "_id": postid,
      },
      {
        $push:{
          "comment": comment
        }
      },
      function(err, doc) {
        if(err) {
          throw err;
        } else {
          req.flash("success", "Comment added");
          res.location("/posts/show/" +postid);
          res.redirect("/posts/show/" +postid);
        }

      }
    );
  }
});

module.exports = router;
