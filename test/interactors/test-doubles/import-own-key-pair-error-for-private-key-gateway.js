module.exports = function () {
  var count = 0;

  return {
    key: {
      save: function (data, done) {
        if (count++) {
          done(new Error('SOMEGENERICGATEWAYERROR'));
        }
        else {
          done(null, {
            id: 1,
            key: 'POOBLEEK',
            userId: 1
          });
        }
      }
    }
  };
};
