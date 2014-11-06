module.exports = {
  findAll: function (done) {
    done(null, [{
      id: 1,
      type: 'Url',
      name: 'Example message',
      url: 'http://example.com',
      data: 'HERE BE DRAGONS'
    }]);
  }
};
