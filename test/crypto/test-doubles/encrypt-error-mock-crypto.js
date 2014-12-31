var mockCrypto = {
  encrypt: function encryptable(key, message, done) {
    done(new Error('Some error'));
  }
};

module.exports = mockCrypto;