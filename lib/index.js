/**
 * Expose helper functions onto the req context.
 *
 * @api public
 */
module.exports = function flash(req, res, next) {
  if (req.flash) { return next(); }
  req.flash = _flash;
  req.get_flashed_messages = _get_flashed_messages;

  res.locals.has_flashed_messages = function() { 
    _has_flashed_messages.apply(req);
  };
  res.locals.get_flashed_messages = function(category_filter) { 
    _get_flashed_messages.apply(req, category_filter);
  };

  next();
};

/**
 * Push a message (under the given cateogry)
 * into the flashed messages array.
 *
 * @param {String} message
 * @param {String} category
 * @api public
 */
function _flash(message, category) {
  if (this.session === undefined) throw Error('the twinkle module needs session support.');
  this.session.flash = this.session.flash || [];
  this.session.flash.push({ category: category, message: message });
}

/**
 * Check if there is any flashed messages.
 *
 * @api private
 */
function _has_flashed_messages() {
  return (this.session.flash && this.session.flash.length > 0);
}

/**
 * Get and clear flashed messages (under the given cateogries).
 *
 * @param {Array} category_filter
 * @api private
 */
function _get_flashed_messages(category_filter) {
  if (!(category_filter instanceof Array)) category_filter = [ category_filter ];

  var messages = this.session.flash;
  this.session.flash = {};
  return messages.filter(function(i) { return (category_filter.indexOf(i) !== -1) });
}
