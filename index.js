var b01t = {
  generateNewKeyPair: require('./lib/generate-new-key-pair'),
  extras: {
    pgp: {
      crypto: require('b01t-pgp-crypto')
    },
    gateway: {
      InMemoryMessageGateway: require('./lib/in-memory-message-gateway'),
      InMemoryKeyGateway: require('./lib/in-memory-key-gateway')
    }
  }
};

module.exports = b01t;
