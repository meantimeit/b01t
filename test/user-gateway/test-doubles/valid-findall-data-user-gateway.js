module.exports = {
  findAll: function (done) {
    done(null, [{
      id: 1,
      name: 'connrs',
      email: 'connrs@example.com'
    }]);
  }
};
