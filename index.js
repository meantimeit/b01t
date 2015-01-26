var b01t = {
  extras: {
    pgp: {
      crypto: require('mpass-pgp-crypto')
    },
    gateway: {
      InMemoryMessageGateway: require('./lib/in-memory-message-gateway'),
      InMemoryKeyGateway: require('./lib/in-memory-key-gateway')
    }
  }
};

module.exports = b01t;
