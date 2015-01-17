var openpgp = require('openpgp');

function encrypt(key, text, done) {
  try {
    var publicKey = readPublicKey(key);
    done(null, encryptText(publicKey, text));
  }
  catch (e) {
    done(e);
  }
}

function readPublicKey(key) {
  return openpgp.key.readArmored(key);
}

function encryptText(key, text) {
  var msg = openpgp.message.fromText(text);
  var encrypted = msg.encrypt(key.keys);
  var encryptedText = openpgp.armor.encode(openpgp.enums.armor.message, encrypted.packets.write());

  return encryptedText;
}

module.exports = encrypt;
