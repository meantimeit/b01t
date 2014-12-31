var mockCrypto = {
  decrypt: function decrypter(key, passphrase, message, done) {
    done(new Error('Some error'));
  }
};

module.exports = mockCrypto;