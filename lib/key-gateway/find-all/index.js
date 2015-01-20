function findAll(keyGateway, keyBuilder, done) {
  if (keyGateway === null || keyGateway === undefined) {
    return done(new Error('No key gateway provided'));
  }

  if (keyBuilder === null || keyBuilder === undefined) {
    return done(new Error('No key builder provided'));
  }

  keyGateway.findAll(function (err, data) {
    if (err) { return done(err); }

    done(null, (data || []).map(keyBuilder));
  });
}

module.exports = findAll;
