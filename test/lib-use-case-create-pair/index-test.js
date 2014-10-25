var test = require('tape');
var createPair = require('lib/use-case/create-pair');

test('createPair error', function (t) {
  t.plan(1);

  var opts = {};

  function pairCreator(userId, passphrase, done) {
    done(new Error('FAIL'));
  }

  createPair(pairCreator, opts, function (err) {
    t.equal('FAIL', err.message);
    t.end();
  })
});

test('createPair success', function (t) {
  t.plan(1);

  var opts = {
    userId: 'jane <jane@example.org>',
    passphrase: 'p455w0rd'
  };

  function pairCreator(userId, passphrase, done) {
    done(null, {
      public: 'PUBKEY',
      private: 'PRIVKEY'
    });
  }

  createPair(pairCreator, opts, function (err, key) {
    t.deepEqual(key, {
      public: 'PUBKEY',
      private: 'PRIVKEY'
    });
  });
});
