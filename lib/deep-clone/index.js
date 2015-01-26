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

module.exports = deepClone;
