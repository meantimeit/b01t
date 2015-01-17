var public = {
  builder: {},
  extras: {},
  gateway: {}
};

public.builder.keyBuilder = require('./lib/key-builder');

public.gateway.message = {
  InMemoryMessageGateway: require('./lib/in-memory-message-gateway')
};

public.extras.pgp = { crypto: require('mpass-pgp-crypto') };

module.exports = public;
