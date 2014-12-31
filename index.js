var client = {
  builder: {},
  entity: {},
  gateway: {}
};

client.builder.keyBuilder = require('./lib/key-builder');

client.entity.KeyEntity = require('./lib/key-entity');
client.entity.PublicKeyEntity = require('./lib/public-key-entity');
client.entity.PrivateKeyEntity = require('./lib/private-key-entity');
client.entity.UserEntity = require('./lib/user-entity');
client.entity.MessageEntity = require('./lib/message-entity');
client.entity.EncryptedMessageEntity = require('./lib/encrypted-message-entity');
client.entity.DecryptedMessageEntity = require('./lib/decrypted-message-entity');

client.gateway.message = require('./lib/message-gateway');
client.gateway.message.InMemoryMessageGateway = require('./lib/in-memory-message-gateway');

client.crypto = require('./lib/crypto');
client.crypto.pgp = require('./lib/pgp-crypto');

module.exports = client;