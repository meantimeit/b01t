var mockCrypto = {
  createPair: function (userId, passphrase, done) {
    done(null, {
      public: 'PUBKEY',
      private: 'PRIVKEY'
    });
  }
};

module.exports = mockCrypto;