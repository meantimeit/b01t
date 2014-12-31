var MessageEntity = require('../message-entity/index');

function DecryptedMessageEntity() {
  MessageEntity.apply(this, arguments);
}

DecryptedMessageEntity.prototype = Object.create(MessageEntity.prototype, {
  constructor: { value: DecryptedMessageEntity }
});

module.exports = DecryptedMessageEntity;
