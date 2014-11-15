var test = require('tape');
var createPair = require('lib/crypto').createPair;

test('createPair error', function (t) {
  t.plan(1);

  var opts = {};
  var mockCrypto = {
    createPair: function (userId, passphrase, done) {
      done(new Error('FAIL'));
    }
  };

  createPair(mockCrypto, opts, function (err) {
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

  var mockCrypto = {
    createPair: function (userId, passphrase, done) {
      done(null, {
        public: 'PUBKEY',
        private: 'PRIVKEY'
      });
    }
  };


  createPair(mockCrypto, opts, function (err, key) {
    t.deepEqual(key, {
      public: 'PUBKEY',
      private: 'PRIVKEY'
    });
  });
});
