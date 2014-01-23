/**
 * Expose helper functions onto the req context.
 *
 * @api public
 */
module.exports = function (req, res, next) {
  if (req.flash) { return next(); }
  req.flash = _flash;

  res.locals.has_flashed_messages = function() { 
    return _has_flashed_messages.apply(req);
  };
  res.locals.get_flashed_messages = function(category_filter) { 
    return _get_flashed_messages.call(req, category_filter);
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
  this.session.flashed_messages = this.session.flashed_messages || [];
  this.session.flashed_messages.push({ category: category, message: message });
}

/**
 * Check if there is any flashed messages.
 *
 * @api private
 */
function _has_flashed_messages() {
  return (this.session.flashed_messages && this.session.flashed_messages.length > 0);
}

/**
 * Get and clear flashed messages (under the given cateogries).
 *
 * @param {Array} category_filter
 * @api private
 */
function _get_flashed_messages(category_filter) {
  var messages = this.session.flashed_messages.filter(function(o) {
    if ((typeof category_filter) === 'string') return category_filter === o.category;
    if (category_filter instanceof Array) return category_filter.indexOf(o.category) !== -1;
    return true;
  }).map(function(o) { return o.message; });
  this.session.flashed_messages = [];
  return messages;
}
