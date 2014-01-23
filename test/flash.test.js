var should = require('should'),
    assert = require('assert'),
    flash = require('..');

var req, res, next;

beforeEach(function() {
  req = { session: {} };
  res = { locals: {} };
  next = function () {};

  flash(req, res, next);
});

describe('flash', function() {
  describe('#()', function() {
    it('should append one method named "flash" onto req', function() {
      assert.equal('function', typeof req.flash);
    });

    it('should append two methods named "has_flashed_messages" and "get_flashed_messages" onto res.locals', function() {
      assert.equal('function', typeof res.locals.has_flashed_messages);
      assert.equal('function', typeof res.locals.get_flashed_messages);
    });
  });
});

describe('req', function() {
  describe('#flash()', function() {
    it('should write one object {message, category} into req.session.flashed_messages', function() {
      req.flash('test message');
      assert.equal(1, req.session.flashed_messages.length);
      assert.equal('test message', req.session.flashed_messages[0].message);
      assert.equal(undefined, req.session.flashed_messages[0].category);

      req.flash('yet another test message', 'info');
      assert.equal(2, req.session.flashed_messages.length);
      assert.equal('yet another test message', req.session.flashed_messages[1].message);
      assert.equal('info', req.session.flashed_messages[1].category);
    });
  });
});

describe('res.locals', function() {
  describe('#has_flashed_messages()', function() {
    it('should return false when there are no flashed messages and otherwise return true', function() {
      assert(!res.locals.has_flashed_messages());
      req.flash('test message');
      assert(res.locals.has_flashed_messages());
    });
  });

  describe('#get_flashed_messages()', function() {
    it('should return an array of messages', function() {
      req.flash('long long ago');
      req.flash('and far far away', 'info');
      req.flash('it is a great day', 'info');
      req.flash('login failed', 'error');

      var messages = res.locals.get_flashed_messages();
      assert.equal(4, messages.length);
      assert.equal('it is a great day', messages[2]);
    });

    it('has an optional "category_filter" argument', function() {
      req.flash('long long ago');
      req.flash('and far far away', 'info');
      req.flash('it is a great day', 'info');
      req.flash('login failed', 'error');

      var messages = res.locals.get_flashed_messages('info');
      assert.equal(2, messages.length);
      assert.equal('it is a great day', messages[1]);
    });

    it('also allow the "category_filter" argument to be an array', function() {
      req.flash('long long ago');
      req.flash('and far far away', 'info');
      req.flash('it is a great day', 'info');
      req.flash('login failed', 'error');

      var messages = res.locals.get_flashed_messages(['info', 'error']);
      assert.equal(3, messages.length);
      assert.equal('it is a great day', messages[1]);
      assert.equal('login failed', messages[2]);
    });
  });
});
