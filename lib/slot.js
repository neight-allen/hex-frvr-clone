var size = 35;

var defaultImage = new Image();
defaultImage.src = "../images/slot_hex.svg"

var image_width = (size * 2) - 2;

function Slot(x, y, z, context){
  this.x = x;
  this.y = y;
  this.z = z;
  this._context = context;
}

Slot.prototype.draw = function(){
  // var ctx = this._context;
  var [x,y] = HexToPixels(this.x, this.y, this.z);
  img = this.tile == undefined ? defaultImage : this.tile.image;
  this._context.drawImage(img, x, y, image_width, image_width);
}

// # convert cube to odd-r offset
// col = x + (z - (z&1)) / 2
// row = z
function HexToOffset(x,y,z){
  col = x + (z - (z&1)) / 2;
  row = z;
  return [row, col];
}

// # convert odd-r offset to cube
// x = col - (row - (row&1)) / 2
// z = row
// y = -x-z

function OffsetToPixels(row, col) {
  var height = size * 2;
  var x = height * Math.sqrt(3) * (col + 0.5 * (row&1)) / 2
  var y = size * 3/2 * row
  return [x + 400, y + 300]
}

function HexToPixels(x,y,z){
  [row,col] = HexToOffset(x,y,z);
  return OffsetToPixels(row,col);
}

module.exports = Slot;
