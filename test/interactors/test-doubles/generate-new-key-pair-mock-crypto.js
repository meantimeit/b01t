module.exports = {
  createPair: function (userId, passphrase, done) {
    done(null, {
      public: 'POOBLEEK',
      private: 'PRYVETTE'
    });
  }
};