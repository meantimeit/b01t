var noFinderErrorMessage = 'No key gateway provided';
var noBuilderErrorMessage = 'No key builder provided';
var noIdErrorMessage = 'No ID provided';

function notSet(value) {
  return value === null || value === undefined;
}

function findById(finder, messageBuilder, id, done) {
  if (notSet(finder)) {
    return done(new Error(noFinderErrorMessage));
  }

  if (notSet(messageBuilder)) {
    return done(new Error(noBuilderErrorMessage));
  }

  if (notSet(id)) {
    return done(new Error(noIdErrorMessage));
  }

  finder.findById(id, function (err, data) {
    if (err) {
      return done(err);
    }

    done(null, messageBuilder(data));
  });
}

module.exports = findById;