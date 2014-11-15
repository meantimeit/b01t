var test = require('tape');
var fs = require('fs');
var encrypt = require('lib/pgp-crypto').encrypt;
var decrypt = require('lib/pgp-crypto').decrypt;

test('Encrypt HELLO', function (t) {
  t.plan(1);
  var expected = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var publicKey = fs.readFileSync(__dirname + '/../test-data/keys/public_1.key').toString();
  var privateKey = fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString();
  encrypt(publicKey, 'HELLO', function (err, message) {
    decrypt(privateKey, 'p4ss', message, function (err, decryptedText) {
      t.equal('HELLO', decryptedText);
    });
  });
});
