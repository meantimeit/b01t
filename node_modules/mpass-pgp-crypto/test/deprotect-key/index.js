var test = require('tape');
var fs = require('fs');
var deprotectKey = require('../../..').crypto.pgp.deprotectKey;

test('Decrypt key', function (t) {
  t.plan(1);
  var privateKey = fs.readFileSync('../test-data/keys/private_1.key').toString();
  var expected = fs.readFileSync('../test-data/keys/decrypted_private_1.key').toString();
  t.equal(deprotectKey(privateKey, 'p4ss'), expected);
});