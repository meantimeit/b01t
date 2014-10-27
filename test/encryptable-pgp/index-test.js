//var test = require('tape');
//var fs = require('fs');
//var pgpMessageEncrypter = require('lib/encryptable/pgp');

//test('Encrypt HELLO', function (t) {
//t.plan(1);
//var expected = fs.readFileSync(__dirname + '/../test-data/encrypted/hello').toString();
//var key = fs.readFileSync(__dirname + '/../test-data/keys/public_1.key').toString();
//pgpMessageEncrypter(key, 'HELLO', function (err, message) {
//fs.writeFileSync('/Users/connrs/Desktop/message', message);
//t.equal(message, expected);
//});
//});
