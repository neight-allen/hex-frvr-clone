const _ = require('underscore');

function Shape(context){
  this._context = context;
  this.tiles = makeTilesFromCoords(_.sample(possibleShapes))
  this.image =
}

function makeTilesFromCoords(coordsSet) {
  return coordsSet.map(function(coords){
    var [x,y,z] = coords;
    return {
      x: x, y: y, z: z,
      tile: new Tile("../images/tile_hex_1.svg")
    }
  })
}

Shape.prototype.draw = function(x, y) {
  
}

module.exports = Shape;
