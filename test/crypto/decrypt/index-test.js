var test = require('tape');
var decrypt = require('lib/crypto').decrypt;

test('Decrypt simple message', function (t) {
  t.plan(1);

  var mockCrypto = {
    decrypt: function (key, passphrase, message, done) {
      var re = new RegExp(key, 'g');
      done(null, message.replace(re, ''));
    }
  };

  decrypt(mockCrypto, 'SECRET', 'PASSWORD', 'ISECRETLSECRETISECRETKSECRETESECRETOSECRETWSECRETLSECRETSSECRET', function (err, data) {
    t.equal('ILIKEOWLS', data);
  });
})

test('decrypt error', function (t) {
  t.plan(1);

  var mockCrypto = {
    decrypt: function decrypter(key, passphrase, message, done) {
      done(new Error('Some error'));
    }
  };

  decrypt(mockCrypto, 'PUNYHUMAN', 'HULK', 'SMASH', function (err) {
    t.equal('Some error', err.message);
  });
});
