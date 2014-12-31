function Entity() {
}

Entity.prototype.setId = function (id) {
  this._id = id;
};

Entity.prototype.getId = function () {
  return this._id;
};

module.exports = Entity;