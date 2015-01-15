var PublicKeyEntity = require('../../public-key-entity');
var PrivateKeyEntity = require('../../private-key-entity');

function deprotectKey(crypto, key, password) {
  if (crypto === null || crypto === undefined) { throw new Error('No crypto'); }
  if (key === null || key === undefined) { throw new Error('No private key'); }
  if (!(key instanceof PrivateKeyEntity)) { throw new Error('Private key must be an instance of PrivateKeyEntity'); }
  if (password === null || password === undefined) { throw new Error('No password'); }

  var deprotectedKey = new PublicKeyEntity();
  deprotectedKey.setUserId(key.getUserId());
  deprotectedKey.setCipher(crypto.deprotectKey(key.getCipher(), password));

  return deprotectedKey;
}

module.exports = deprotectKey;