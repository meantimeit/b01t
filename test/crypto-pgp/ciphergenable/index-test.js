var test = require('tape');
var ciphergenable = require('lib/crypto-pgp/ciphergenable');

test('Valid public key block', function (t) {
  t.plan(2);
  ciphergenable('jane <jane@example.org>', 'p455w0rd', function (err, key) {
    t.ok(/-----BEGIN PGP PUBLIC KEY BLOCK-----/.test(key.public));
    t.ok(/-----END PGP PUBLIC KEY BLOCK-----/.test(key.public));
    t.end();
  });
})

test('Valid private key block', function (t) {
  t.plan(2);
  ciphergenable('jane <jane@example.org>', 'p455w0rd', function (err, key) {
    t.ok(/-----BEGIN PGP PRIVATE KEY BLOCK-----/.test(key.private));
    t.ok(/-----END PGP PRIVATE KEY BLOCK-----/.test(key.private));
    t.end();
  });
})
