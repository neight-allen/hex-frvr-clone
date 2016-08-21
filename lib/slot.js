const hexHelper = require('./hex-helper');

var defaultImage = new Image();
defaultImage.src = "../images/slot_hex.svg"

var image_width = (hexHelper.size * 2) - 2;

function Slot(x, y, z, context){
  this.x = x;
  this.y = y;
  this.z = z;
  this._context = context;
}

Slot.prototype.draw = function(){
  // var ctx = this._context;
  var [x,y] = hexHelper.hexToPixels(this.x, this.y, this.z);
  img = this.tile == undefined ? defaultImage : this.tile.image;
  x += hexHelper.boardOffset.x - hexHelper.size;
  y += hexHelper.boardOffset.y - hexHelper.size;
  this._context.drawImage(img, x, y, image_width, image_width);
  // this._context.fillRect(x + hexHelper.size - 1, y + hexHelper.size - 1, 2, 2);
}

module.exports = Slot;
