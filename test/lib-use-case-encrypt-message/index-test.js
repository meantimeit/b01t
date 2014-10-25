var test = require('tape');
var encryptMessage = require('lib/use-case/encrypt-message');

test('Encrypt simple message', function (t) {
  t.plan(1);

  function encrypter(key, message, done) {
    done(null, key + message);
  }

  encryptMessage(encrypter, 'SECRETCIPHER',  'MYSECRETMESSAGE', function (err, data) {
    t.equal('SECRETCIPHERMYSECRETMESSAGE', data);
  });
})

test('Encrypt error', function (t) {
  t.plan(1);

  function encrypter(key, message, done) {
    done(new Error('Some error'));
  }

  encryptMessage(encrypter, 'HULK', 'SMASH', function (err) {
    t.equal('Some error', err.message);
  });
});
