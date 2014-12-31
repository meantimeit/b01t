function assertParamIsFunction(t, done) {
  t.equal(typeof done, 'function');
}

function assertParamEqual(t, param, expected) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var index = param - 1;
    t.deepEqual(args[index], expected);
  };
}

function assertParamInstanceOf(t, param, expectedInstance) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var index = param - 1;
    t.ok(args[index] instanceof expectedInstance);
  };
}

function assertCallbackData(t, expectedData) {
  return function (error, data) {
    t.deepEqual(data, expectedData);
  };
}

function assertErrorMessage(t, expectedMessage) {
  return function (err) {
    t.equal(err.message, expectedMessage);
  };
}

function assertCallbackError(t, expectedMessage) {
  return function (error) {
    t.equal(error.message, expectedMessage);
  };
}

function noop() {}

function assertThrowsWithMessage(t, func, message) {
  try {
    func();
    t.fail();
  }
  catch (error) {
    t.equal(error.message, message);
  }
}

module.exports = {
  noop: noop,
  assertErrorMessage: assertErrorMessage,
  assertCallbackError: assertCallbackError,
  assertCallbackData: assertCallbackData,
  assertParamIsFunction: assertParamIsFunction,
  assertParamEqual: assertParamEqual,
  assertParamInstanceOf: assertParamInstanceOf,
  assertThrowsWithMessage: assertThrowsWithMessage
};
