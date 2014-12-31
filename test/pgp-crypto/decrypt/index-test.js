var test = require('tape');
var fs = require('fs');
var decrypt = require('../../../').crypto.pgp.decrypt;

test('Decrypt HELLO', function (t) {
  t.plan(1);
  var encryptedMessage = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var key = fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString();
  decrypt(key, 'p4ss', encryptedMessage, function (err, message) {
    t.equal(message, 'HELLO');
  });
});

test('Invalid private key throws decrypt error', function (t) {
  t.plan(1);
  var encryptedMessage = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var key = fs.readFileSync(__dirname + '/../test-data/keys/invalid_private.key').toString();
  decrypt(key, 'p4ss', encryptedMessage, function (err, message) {
    t.ok(err instanceof Error);
  });
});
