var deepClone = require('../deep-clone');

function idNotEq(a) {
  return function (b) {
    return b.id !== a;
  };
}

function hasId(a) {
  return function (b) {
    return b.id === a;
  };
}

function InMemoryGateway() {
  this._saved = [];
  this._ids = [];
}

InMemoryGateway.prototype.findAll = function (done) {
  done(null, this._saved);
};

InMemoryGateway.prototype.findById = function (id, done) {
  done(null, this._saved.filter(hasId)[0] || null);
};

InMemoryGateway.prototype.save = function (messageData, done) {
  var data = this._attachIDToData(messageData);
  this._saveData(data);
  done(null, data);
};

InMemoryGateway.prototype.update = function (messageData, done) {
  var i = this._indexFromId(messageData.id);
  this._saved[i] = deepClone(messageData);
  done(null, messageData);
};

InMemoryGateway.prototype.remove = function (id, done) {
  this._saved = this._saved.filter(idNotEq(id));
  done();
};

InMemoryGateway.prototype._attachIDToData = function (data) {
  var copy = deepClone(data);

  copy.id = this._nextId();
  this._ids.push(copy.id);

  return copy;
};

InMemoryGateway.prototype._nextId = function () {
  return Math.max(this._ids) + 1;
};

InMemoryGateway.prototype._saveData = function (data) {
  this._saved.push(data);
};

InMemoryGateway.prototype._indexFromId = function (id) {
  var i;

  for (i in this._saved) {
    if (this._saved.hasOwnProperty(i) && this._saved[i].id === id) {
      return i;
    }
  }
};

module.exports = InMemoryGateway;