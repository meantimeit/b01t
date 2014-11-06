var test = require('tape');
var encryptMessage = require('lib/crypto').encryptMessage;

test('Encrypt simple message', function (t) {
  t.plan(1);

  function encryptable(key, message, done) {
    done(null, key + message);
  }

  encryptMessage(encryptable, 'SECRETCIPHER',  'MYSECRETMESSAGE', function (err, data) {
    t.equal('SECRETCIPHERMYSECRETMESSAGE', data);
  });
})

test('Encrypt error', function (t) {
  t.plan(1);

  function encryptable(key, message, done) {
    done(new Error('Some error'));
  }

  encryptMessage(encryptable, 'HULK', 'SMASH', function (err) {
    t.equal('Some error', err.message);
  });
});
