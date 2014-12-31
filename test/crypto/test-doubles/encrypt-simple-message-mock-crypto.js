var mockCrypto = {
  encrypt: function encryptable(key, message, done) {
    done(null, key + message);
  }
};

module.exports = mockCrypto;