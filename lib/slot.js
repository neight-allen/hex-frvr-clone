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
  x += hexHelper.boardOffset.x - image_width / 2;
  y += hexHelper.boardOffset.y - image_width / 2;
  this._context.drawImage(img, x, y, image_width, image_width);
}

module.exports = Slot;
