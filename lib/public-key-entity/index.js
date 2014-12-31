var KeyEntity = require('../key-entity');

function PublicKeyEntity() {}

PublicKeyEntity.prototype = Object.create(KeyEntity.prototype, {
  constructor: { value: PublicKeyEntity }
});

module.exports = PublicKeyEntity;
