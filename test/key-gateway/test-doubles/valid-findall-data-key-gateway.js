module.exports = {
  findAll: function (done) {
    done(null, [{
      id: 1,
      type: 'public',
      key: 'HEREBEDRAGONS',
      userId: 1
    }]);
  }
};
