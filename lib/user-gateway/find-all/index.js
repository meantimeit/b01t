function findAll(userGateway, userBuilder, done) {
  if (userGateway === null || userGateway === undefined) {
    return done(new Error('No user gateway provided'));
  }

  if (userBuilder === null || userBuilder === undefined) {
    return done(new Error('No user builder provided'));
  }

  userGateway.findAll(function (err, data) {
    if (err) {
      return done(err);
    }

    done(null, (data || []).map(userBuilder));
  });
}

module.exports = findAll;
