var KeyEntity = require('../../key-entity');

function validateArguments(crypto, key) {
  if (crypto === null || crypto === undefined) {
    return new Error('No crypto passed to decrypt');
  }

  if (key === null || key === undefined) {
    return new Error('No key passed to decrypt');
  }

  if (!(key instanceof KeyEntity)) {
    return new Error('Key passed to decrypt must be instance of KeyEntity');
  }
}

function decrypt(crypto, key, decryptionPassphrase, encryptedMessage, done) {
  var error = validateArguments(crypto, key);
  if (error instanceof Error) { return done(error); }
  crypto.decrypt(key, decryptionPassphrase, encryptedMessage, done);
}

module.exports = decrypt;
