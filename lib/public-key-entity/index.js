var KeyEntity = require('../key-entity');

function PublicKeyEntity() {
  this._type = 'public';
}

PublicKeyEntity.prototype = Object.create(KeyEntity.prototype, {
  constructor: { value: PublicKeyEntity }
});

module.exports = PublicKeyEntity;
