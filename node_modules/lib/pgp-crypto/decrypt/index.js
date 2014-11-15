var openpgp = require('openpgp');

function decrypt(key, passphrase, text, done) {
  try {
    var privateKey = unlockedPrivateKey(key, passphrase);
    var encryptedMessage = rawTextToEncryptedMessage(text);
    done(null, decryptMessage(privateKey, encryptedMessage));
  }
  catch (e) {
    done(e);
  }
}

function unlockedPrivateKey(key, passphrase) {
  var privateKey;

  privateKey = openpgp.key.readArmored(key).keys[0];
  privateKey.decrypt(passphrase);

  return privateKey;
}

function rawTextToEncryptedMessage(text) {
  return openpgp.message.readArmored(text);
}

function decryptMessage(privateKey, encryptedMessage) {
  var decryptedMessage = encryptedMessage.decrypt(privateKey);

  return decryptedMessage.getText();
}

module.exports = decrypt;
