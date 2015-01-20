var KeyEntity = require('../key-entity');

function PrivateKeyEntity() {
  this._type = 'private';
}

PrivateKeyEntity.prototype = Object.create(KeyEntity.prototype, {
  constructor: { value: PrivateKeyEntity }
});

module.exports = PrivateKeyEntity;
