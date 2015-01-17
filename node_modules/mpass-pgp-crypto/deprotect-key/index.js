var openpgp = require('openpgp');

function encryptWithNoPassphrase(packet) {
  packet.encrypt('');
}

function deprotectKey(key, password) {
  var oKey = openpgp.key.readArmored(key).keys[0];
  oKey.decrypt(password);
  oKey.getAllKeyPackets().forEach(encryptWithNoPassphrase);
  return oKey.armor();
}

module.exports = deprotectKey;
