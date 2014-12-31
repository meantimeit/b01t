var KeyEntity = require('../key-entity');

function PrivateKeyEntity() {}

PrivateKeyEntity.prototype = Object.create(KeyEntity.prototype, {
  constructor: { value: PrivateKeyEntity }
});

module.exports = KeyEntity;
