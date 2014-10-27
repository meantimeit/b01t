var test = require('tape');
var decryptMessage = require('lib/use-case/decrypt-message');

test('Decrypt simple message', function (t) {
  t.plan(1);

  function decrypter(key, passphrase, message, done) {
    var re = new RegExp(key, 'g');
    done(null, message.replace(re, ''));
  }

  decryptMessage(decrypter, 'SECRET', 'PASSWORD', 'ISECRETLSECRETISECRETKSECRETESECRETOSECRETWSECRETLSECRETSSECRET', function (err, data) {
    t.equal('ILIKEOWLS', data);
  });
})

test('decrypt error', function (t) {
  t.plan(1);

  function decrypter(key, passphrase, message, done) {
    done(new Error('Some error'));
  }

  decryptMessage(decrypter, 'PUNYHUMAN', 'HULK', 'SMASH', function (err) {
    t.equal('Some error', err.message);
  });
});
