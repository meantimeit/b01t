var mockCrypto = {
  createPair: function (userId, passphrase, done) {
    done(new Error('FAIL'));
  }
};

module.exports = mockCrypto;