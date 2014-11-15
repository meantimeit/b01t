var test = require('tape');
var encrypt = require('lib/crypto').encrypt;

test('Encrypt simple message', function (t) {
  t.plan(1);

  var mockCrypto = {
    encrypt: function encryptable(key, message, done) {
      done(null, key + message);
    }
  };

  encrypt(mockCrypto, 'SECRETCIPHER',  'MYSECRETMESSAGE', function (err, data) {
    t.equal('SECRETCIPHERMYSECRETMESSAGE', data);
  });
});

test('Encrypt error', function (t) {
  t.plan(1);

  var mockCrypto = {
    encrypt: function encryptable(key, message, done) {
      done(new Error('Some error'));
    }
  };

  encrypt(mockCrypto, 'HULK', 'SMASH', function (err) {
    t.equal('Some error', err.message);
  });
});
