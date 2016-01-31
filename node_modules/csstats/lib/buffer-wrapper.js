

var BufferWrapper = module.exports = function (buffer) {
  this._offset = 0;
  this.buffer = buffer;
};

BufferWrapper.prototype.setOffset = function (num) {
  this._offset = num;
  return this._offset;
};

BufferWrapper.prototype.getOffset = function () {
  return this._offset;
};

BufferWrapper.prototype.readInt16LE = function () {
  var ret = this.buffer.readInt16LE(this._offset);
  this._offset += 2;
  return ret;
};

BufferWrapper.prototype.readUInt16LE = function () {
  var ret = this.buffer.readUInt16LE(this._offset);
  this._offset += 2;
  return ret;
};

BufferWrapper.prototype.readUInt32LE = function () {
  var ret = this.buffer.readUInt32LE(this._offset);
  this._offset += 4;
  return ret;
};

BufferWrapper.prototype.readInt32LE = function () {
  var ret = this.buffer.readInt32LE(this._offset);
  this._offset += 4;
  return ret;
};

BufferWrapper.prototype.readBytes = function (bufferLength) {
  var ret = this.buffer.toString('utf-8', this._offset, bufferLength + this._offset).trim();
  this._offset += bufferLength;
  return ret;
};