var test = require('tape');
var fs = require('fs');
var decryptable = require('lib/crypto-pgp').decryptable;

test('Decrypt HELLO', function (t) {
  t.plan(1);
  var encryptedMessage = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var key = fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString();
  decryptable(key, 'p4ss', encryptedMessage, function (err, message) {
    t.equal(message, 'HELLO');
  });
});

test('Invalid private key throws decrypt error', function (t) {
  t.plan(1);
  var encryptedMessage = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var key = fs.readFileSync(__dirname + '/../test-data/keys/invalid_private.key').toString();
  decryptable(key, 'p4ss', encryptedMessage, function (err, message) {
    t.ok(err instanceof Error);
  });
});
