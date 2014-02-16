# node-twinkle

A message flashing module. Inspired by [Flask](http://flask.pocoo.org/docs/patterns/flashing/).

### Install:

    $ npm install node-twinkle

### Initialize your application:

```javascript
var express = require('express'),
    flash = require('node-twinkle');

var app = express();

app.configure(function(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'My Secret Key' });
  app.use(flash);       // make sure to put this before your routes dispatchers.
  app.use(app.router);
});
```

### Usage

```javascript
// in your view functions:
app.post('/signin', function(req, res) {
  // actual logic for user signing in.
  req.flash('You have successfully signed in.');
  res.redirect('/');
});

// in your templates: (we use ejs as an example, however you can use any template as you like)
<body>
  <% if (has_flashed_messages()) { %>
    <% get_flashed_messages().forEach(function(message) { %>
    <p><%= message %></p>
    <% }) %>
  <% } %>
</body>
```

### Examples and tests

Examples are under the 'example' directory.

To test node-twinkle, make sure you have [mocha](http://visionmedia.github.io/mocha/) installed, then run the following command:

    $ mocha test/flash.test.js
