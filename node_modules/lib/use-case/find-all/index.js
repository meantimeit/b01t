function findAll(messageGateway, messageBuilder, done) {
  if (messageGateway === null || messageGateway === undefined) {
    return done(new Error('No message gateway provided'));
  }

  if (messageBuilder === null || messageBuilder === undefined) {
    return done(new Error('No message builder provided'));
  }

  messageGateway.findAll(function (err, data) {
    if (err) {
      return done(err);
    }

    done(null, (data || []).map(messageBuilder));
  });
}

module.exports = findAll;
