var client = {
  builder: {},
  entity: {},
  gateway: {},
  utils: {}
};

client.entity.KeyEntity = require('./key-entity');
client.entity.PublicKeyEntity = require('./public-key-entity');
client.entity.PrivateKeyEntity = require('./private-key-entity');
client.entity.UserEntity = require('./user-entity');
client.entity.MessageEntity = require('./message-entity');
client.entity.EncryptedMessageEntity = require('./encrypted-message-entity');
client.entity.DecryptedMessageEntity = require('./decrypted-message-entity');

client.gateway.message = require('./message-gateway');
client.gateway.key = require('./key-gateway');
client.gateway.user = require('./user-gateway');

client.crypto = require('./crypto');

client.builder.key = require('./key-builder');
client.builder.user = require('./user-builder');

client.createMessage = require('./create-message');
client.keyBuilder = require('./key-builder');

module.exports = client;
