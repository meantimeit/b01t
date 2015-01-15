var test = require('tape');
var fs = require('fs');
var encrypt = require('../../..').extras.pgp.crypto.encrypt;
var decrypt = require('../../..').extras.pgp.crypto.decrypt;
var deprotectKey = require('../../..').extras.pgp.crypto.deprotectKey;

test('Encrypt HELLO', function (t) {
  t.plan(1);
  var publicKey = fs.readFileSync(__dirname + '/../test-data/keys/public_1.key').toString();
  var privateKey = deprotectKey(fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString(), 'p4ss');
  encrypt(publicKey, 'HELLO', function (err, message) {
    decrypt(privateKey, message, function (err, decryptedText) {
      t.equal('HELLO', decryptedText);
    });
  });
});
