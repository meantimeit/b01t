var test = require('tape');
var fs = require('fs');
var encryptable = require('lib/crypto-pgp/encryptable');
var decryptable = require('lib/crypto-pgp/decryptable');

test('Encrypt HELLO', function (t) {
  t.plan(1);
  var expected = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var publicKey = fs.readFileSync(__dirname + '/../test-data/keys/public_1.key').toString();
  var privateKey = fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString();
  encryptable(publicKey, 'HELLO', function (err, message) {
    decryptable(privateKey, 'p4ss', message, function (err, decryptedText) {
      t.equal('HELLO', decryptedText);
    });
  });
});
