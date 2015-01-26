module.exports = {
  findById: function (id, done) {
    done(null, {
      id: 1,
      name: 'connrs',
      email: 'connrs@example.com'
    });
  }
};
