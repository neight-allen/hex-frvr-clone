const _ = require('underscore');
const Tile = require('./tile');
const hexHelper = require('./hex-helper');

var image_width = (hexHelper.size * 2) - 2;

const possibleShapes = [
  [
    [-1,0,1],
    [0,0,0],
    [1,0,-1],
    [2,0,-2],
  ],
]

function Shape(context){
  this._context = context;
  this.image = "../images/tile_hex_1.svg"
  this.tiles = this.makeTilesFromCoords(_.sample(possibleShapes))

}

Shape.prototype.makeTilesFromCoords = function(coordsSet) {
  var shape = this;
  return coordsSet.map(function(coords) {
    var [x,y,z] = coords;
    return {
      x: x, y: y, z: z,
      tile: new Tile(shape.image)
    };
  });
}

Shape.prototype.draw = function(xOffset, yOffset) {
  var ctx = this._context
  this.tiles.forEach(function(tileOpts){
    var [x,y] = hexHelper.HexToPixels(tileOpts.x, tileOpts.y, tileOpts.z);
    img = tileOpts.tile.image;
    ctx.drawImage(img, x + xOffset, y + yOffset, image_width, image_width);
  })
}

module.exports = Shape;
