var PublicKeyEntity = require('../public-key-entity');
var PrivateKeyEntity = require('../private-key-entity');

function keyBuilder(data) {
  var keyEntity;

  if (data.type === 'public') {
    keyEntity = new PublicKeyEntity();
  }
  else if (data.type === 'private') {
    keyEntity = new PrivateKeyEntity();
  }

  keyEntity.setCipher(data.key);
  keyEntity.setUserId(data.userId);

  return keyEntity;
}

module.exports = keyBuilder;
