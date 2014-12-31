var test = require('tape');
var fs = require('fs');
var encrypt = require('../../..').crypto.pgp.encrypt;
var decrypt = require('../../..').crypto.pgp.decrypt;

test('Encrypt HELLO', function (t) {
  t.plan(1);
  var publicKey = fs.readFileSync(__dirname + '/../test-data/keys/public_1.key').toString();
  var privateKey = fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString();
  encrypt(publicKey, 'HELLO', function (err, message) {
    decrypt(privateKey, 'p4ss', message, function (err, decryptedText) {
      t.equal('HELLO', decryptedText);
    });
  });
});
