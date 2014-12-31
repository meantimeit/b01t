var test = require('tape');
var createPair = require('../../..').crypto.pgp.createPair;

test('Valid public and private key block', function (t) {
  t.plan(4);
  createPair('jane <jane@example.org>', 'p455w0rd', function (err, key) {
    t.ok(/-----BEGIN PGP PUBLIC KEY BLOCK-----/.test(key.public));
    t.ok(/-----END PGP PUBLIC KEY BLOCK-----/.test(key.public));
    t.ok(/-----BEGIN PGP PRIVATE KEY BLOCK-----/.test(key.private));
    t.ok(/-----END PGP PRIVATE KEY BLOCK-----/.test(key.private));
    t.end();
  });
});
