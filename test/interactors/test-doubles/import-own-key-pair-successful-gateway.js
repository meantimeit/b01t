module.exports = {
  key: {
    save: function (data, done) {
      done(null, {
        id: 1,
        key: 'POOBLEEK',
        userId: 1
      });
    }
  }
};
