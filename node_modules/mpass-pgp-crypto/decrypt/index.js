var openpgp = require('openpgp');

function stringToOpenPGPKey(key) {
  return openpgp.key.readArmored(key).keys[0];
}

function stringToEncryptedMessage(text) {
  return openpgp.message.readArmored(text);
}

function decryptEncryptedMessageWithOpenPGPKey(key, message) {
  return message.decrypt(key).getText();
}

function decrypt(key, text, done) {
  var pubKey;
  var message;

  try {
    pubKey = stringToOpenPGPKey(key);
    message = stringToEncryptedMessage(text);
    done(null, decryptEncryptedMessageWithOpenPGPKey(pubKey, message));
  }
  catch (e) {
    done(e);
  }
}

module.exports = decrypt;
