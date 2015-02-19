module.exports = {
  user: {
    findById: function (userId, done) {
      done(null, {
        id: 1,
        name: 'THOMAS TANK',
        email: 'thomas@tank.com'
      });
    }
  }
}