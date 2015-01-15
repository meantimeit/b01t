var test = require('tape');
var fs = require('fs');
var decrypt = require('../../..').extras.pgp.crypto.decrypt;
var deprotectKey = require('../../..').extras.pgp.crypto.deprotectKey;

test('Decrypt HELLO', function (t) {
  t.plan(1);
  var message = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var key = deprotectKey(fs.readFileSync(__dirname + '/../test-data/keys/private_1.key').toString(), 'p4ss');

  decrypt(key, message, function (err, text) {
    t.equal(text, 'HELLO');
  });
});

test('Invalid private key throws decrypt error', function (t) {
  t.plan(1);
  var encryptedMessage = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
  var key = fs.readFileSync(__dirname + '/../test-data/keys/invalid_private.key').toString();
  decrypt(key, encryptedMessage, function (err, message) {
    t.ok(err instanceof Error);
  });
});
