module.exports = {
  findById: function (id, done) {
    done(null, {
      id: 1,
      type: 'public',
      key: 'HEREBEDRAGONS',
      userId: 1
    });
  },
  findByUserId: function (id, done) {
    done(null, {
      id: 1,
      type: 'public',
      key: 'HEREBEDRAGONS',
      userId: 1
    });
  }
};
