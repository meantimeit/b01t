module.exports = {
  key: {
    save: function (data, done) {
      done(new Error('SOMEKEYGATEWAYIMPLEMENTATIONERROR'));
    }
  }
};