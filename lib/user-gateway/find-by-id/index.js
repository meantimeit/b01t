var noFinderErrorMessage = 'No user gateway provided';
var noBuilderErrorMessage = 'No user builder provided';
var noIdErrorMessage = 'No ID provided';

function notSet(value) {
  return value === null || value === undefined;
}

function findById(finder, userBuilder, id, done) {
  if (notSet(finder)) {
    return done(new Error(noFinderErrorMessage));
  }

  if (notSet(userBuilder)) {
    return done(new Error(noBuilderErrorMessage));
  }

  if (notSet(id)) {
    return done(new Error(noIdErrorMessage));
  }

  finder.findById(id, function (err, data) {
    if (err) {
      return done(err);
    }

    done(null, userBuilder(data));
  });
}

module.exports = findById;