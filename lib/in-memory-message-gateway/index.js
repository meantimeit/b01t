var InMemoryGateway = require('../in-memory-gateway');

function InMemoryMessageGateway() {
  InMemoryGateway.apply(this, arguments);
}

InMemoryMessageGateway.prototype = Object.create(InMemoryGateway.prototype, {
  constructor: { value: InMemoryMessageGateway }
});

module.exports = InMemoryMessageGateway;
