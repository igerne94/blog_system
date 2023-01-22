//Handle Express Sessions
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave:true
}));

// Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

//connect flash
app.use(flash());
app.use(function (req, res, next) {
  //create a global variable by ".locals"
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});