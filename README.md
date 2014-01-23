# node-twinkle

A message flashing module. Inspired by [Flask](http://flask.pocoo.org/docs/patterns/flashing/).

## Quick Start

#### Install:

  $ npm install node-twinkle

#### Init the app:

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

#### Usage

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

See? it's simple, and easy to use.
