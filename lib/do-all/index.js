var curry = require('prelude-ls').curry;

function doAll(num, done) {
  var active = true;

  return function (err) {
    if (active && (err || --num === 0)) {
      active = false;
      done(err);
    }
  };
}

module.exports = curry(doAll);
