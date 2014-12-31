var mockCrypto = {
  decrypt: function (key, passphrase, message, done) {
    var re = new RegExp(key, 'g');
    done(null, message.replace(re, ''));
  }
};

module.exports = mockCrypto;