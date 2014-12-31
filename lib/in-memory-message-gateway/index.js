function deepClone(object) {
  if (object === null || !(object instanceof Object)) {
    return object;
  }

  var clone, ctor = object.constructor;
  switch (ctor) {
    case RegExp:
      clone = new ctor(object);
      break;
    case Date:
      clone = new ctor(object.getTime());
      break;
    default:
      clone = new ctor();
  }
  var prop;
  for (prop in object) {
    clone[prop] = deepClone(object[prop]);
  }
  return clone;
}

function InMemoryMessageGateway() {
  this._saved = [];
}

InMemoryMessageGateway.prototype.findAll = function (done) {
  done(null, this._saved);
};

InMemoryMessageGateway.prototype.findById = function (id, done) {
  function hasID(data) {
    return data.id === id;
  }

  done(null, this._saved.filter(hasID)[0] || null);
};

InMemoryMessageGateway.prototype.save = function (messageData, done) {
  var data = this._attachIDToData(messageData);
  this._saveData(data);
  done(null, data);
};

InMemoryMessageGateway.prototype.update = function (messageData, done) {
  this._saved[messageData.id-1] = deepClone(messageData);
  done(null, messageData);
};

InMemoryMessageGateway.prototype.remove = function (id, done) {
  delete this._saved[id-1];
  done();
};

InMemoryMessageGateway.prototype._attachIDToData = function (data) {
  var copy = deepClone(data);
  copy.id = this._nextID();
  return copy;
};

InMemoryMessageGateway.prototype._nextID = function () {
  return this._saved.length + 1;
};

InMemoryMessageGateway.prototype._saveData = function (data) {
  this._saved.push(data);
};

module.exports = InMemoryMessageGateway;