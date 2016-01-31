var fs = require('fs');
    BufferWrapper = require('./buffer-wrapper');

var RANKS_VERSION = 11;

var CSStats = function () {
  this._num = 0;
};

CSStats.prototype._generateStatEntity = function (data) {
  var name = data.readBytes(this._num);
  this._num = data.readUInt16LE();

  var entity = {
    name: name,
    unique: data.readBytes(this._num),
    tks: data.readUInt32LE(),
    dmg: data.readUInt32LE(),
    deaths: data.readUInt32LE(),
    kills: data.readInt32LE(),
    shots: data.readUInt32LE(),
    hits: data.readUInt32LE(),
    hs: data.readUInt32LE(),
    bDefusions: data.readUInt32LE(),
    bDefused: data.readUInt32LE(),
    bPlants: data.readUInt32LE(),
    bExplosions: data.readUInt32LE()
  };

  entity.bodyHits = new Array(9);

  for(var i = 0, len = entity.bodyHits.length; i < len; i++) {
    entity.bodyHits[i] = data.readUInt32LE();
  }

  return entity;
};

CSStats.prototype.parse = function(filename, cb) {
  var self = this;
  fs.readFile(filename, function (err, buffer) {
    if (err) throw err;

    var data = new BufferWrapper(buffer),
        entityList = [];

    // Check for correct input file data.
    if (data.readInt16LE() !== RANKS_VERSION) {
      throw "Bad stats version";
    }

    self._num = data.readUInt16LE();

    while (self._num !== 0) {
      entity = self._generateStatEntity(data);
      entityList.push(entity);
      self._num = data.readUInt16LE();
    }

    self._num = 0;
    cb(entityList);
  });
};


module.exports = new CSStats();