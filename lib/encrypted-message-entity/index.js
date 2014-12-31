var MessageEntity = require('../message-entity');

function EncryptedMessageEntity() {
  MessageEntity.apply(this, arguments);
}

EncryptedMessageEntity.prototype = Object.create(MessageEntity.prototype, {
  constructor: { value: EncryptedMessageEntity }
});

module.exports = EncryptedMessageEntity;
