var express = require('express'),
    flash = require('..');

var app = express();

// Set up Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'My Secret Key'}));
  
  app.use(flash);
  app.use(app.router);
});

/**
 * Will redirect to the index page, and
 * display two flashed messages on page:
 *
 * -------------------------------------
 *    You have signed in successfully!
 *    Welcome to the index page!
 * -------------------------------------
 */
app.get('/signin', function(req, res) {
  req.flash('You have signed in successfully!');
  res.redirect('/');
});

/**
 * Will display one flashed message:
 *
 * -------------------------------------
 *    Welcome to the index page!
 * -------------------------------------
 */
app.get('/', function(req, res) {
  req.flash('Welcome to the index page!');
  res.render('index');
});

app.listen(3000);
