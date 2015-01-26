var InMemoryGateway = require('../in-memory-gateway');

function hasUserId(a) {
  return function (b) {
    return b.userId === a;
  }
}

function InMemoryKeyGateway() {
  InMemoryGateway.apply(this, arguments);
}

InMemoryKeyGateway.prototype = Object.create(InMemoryGateway.prototype, {
  constructor: { value: InMemoryKeyGateway }
});

InMemoryKeyGateway.prototype.findByUserId = function (userId, done) {
  done(null, this._saved.filter(hasUserId(userId))[0] || null);
};

module.exports = InMemoryKeyGateway;

