const _ = require('underscore');
const Tile = require('./tile');
const hexHelper = require('./hex-helper');

var image_width = (hexHelper.size * 2) - 2;

const possibleShapes = [
  {
    image: "images/tile_hex_2.svg",
    coords: [ [0,0,0] ],
  },
  {
    image: "images/tile_hex_3.svg",
    coords: [
      [-1,0,1],
      [0,0,0],
      [1,0,-1],
      [2,0,-2],
    ],
  },
  {
    image: "images/tile_hex_3.svg",
    coords: [
      [-1,1,0],
      [0,0,0],
      [1,-1,0],
      [2,-2,0],
    ],
  },
  {
    image: "images/tile_hex_3.svg",
    coords: [
      [0,-1,1],
      [0,0,0],
      [0,1,-1],
      [0,2,-2],
    ],
  },
  {
    image: "images/tile_hex_4.svg",
    coords: [
      [0,-1,1],
      [0,0,0],
      [0,1,-1],
      [1,-1,0],
    ],
  },
  {
    image: "images/tile_hex_4.svg",
    coords: [
      [0,-1,1],
      [0,0,0],
      [0,1,-1],
      [-1,1,0],
    ],
  },
  {
    image: "images/tile_hex_4.svg",
    coords: [
      [-1,1,0],
      [0,0,0],
      [1,-1,0],
      [0,1,-1],
    ],
  },
  {
    image: "images/tile_hex_4.svg",
    coords: [
      [-1,1,0],
      [0,0,0],
      [1,-1,0],
      [0,-1,1],
    ],
  },
  {
    image: "images/tile_hex_4.svg",
    coords: [
      [-1,0,1],
      [0,0,0],
      [1,0,-1],
      [-1,1,0],
    ],
  },
  {
    image: "images/tile_hex_4.svg",
    coords: [
      [-1,0,1],
      [0,0,0],
      [1,0,-1],
      [1,-1,0],
    ],
  },
  {
    image: "images/tile_hex_1.svg",
    coords: [
      [0,0,0],
      [-1,1,0],
      [-1,0,1],
      [0,-1,1],
    ],
  },
  {
    image: "images/tile_hex_1.svg",
    coords: [
      [0,0,0],
      [1,-1,0],
      [1,0,-1],
      [0,1,-1],
    ],
  },
]

function Shape(context){
  this._context = context;
  this.tiles = this.makeTilesFromCoords(_.sample(possibleShapes))

}

Shape.prototype.makeTilesFromCoords = function(shapeOpts) {
  var shape = this;
  this.image = shapeOpts.image;
  return shapeOpts.coords.map(function(coords) {
    var [x,y,z] = coords;
    return {
      x: x, y: y, z: z,
      tile: new Tile(shapeOpts.image)
    };
  });
}

Shape.prototype.draw = function(xOffset, yOffset, scale = 1) {
  var ctx = this._context
  this.tiles.forEach(function(tileOpts){
    var [x,y] = hexHelper.hexToPixels(tileOpts.x, tileOpts.y, tileOpts.z).map(n => n * scale);

    img = tileOpts.tile.image;
    var x = x + xOffset - hexHelper.size;
    var y = y + yOffset - hexHelper.size;
    ctx.drawImage(img, x, y, image_width * scale, image_width * scale);
  })
}

module.exports = Shape;
