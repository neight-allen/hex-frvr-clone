const hexHelper = require('./hex-helper');

var defaultImage = new Image();
defaultImage.src = "images/slot_hex.svg"

var image_width = (hexHelper.size * 2) - 2;

function Slot(hex, context){
  this.hex = hex;
  this._context = context;
}

Slot.prototype.draw = function(){
  var pixels = this.hex.toPixels();
  img = this.tile == undefined ? defaultImage : this.tile.image;
  pixels = hexHelper.addVector2(pixels, hexHelper.boardOffset);
  pixels = hexHelper.subVector2(pixels, {x: hexHelper.size, y: hexHelper.size});
  this._context.drawImage(img, pixels.x, pixels.y, image_width, image_width);
}

module.exports = Slot;
