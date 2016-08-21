const _ = require('underscore');

const Slot = require ('./slot');
const Tile = require ('./tile');
const hexHelper = require('./hex-helper');

function Board(context){
  const boardSize = 4;
  this.slots = [];

  for(var x = -boardSize; x <= boardSize; x++) {
    for(var y = -boardSize; y <= boardSize; y++) {
      for(var z = -boardSize; z <= boardSize; z++) {
        if(x+y+z == 0) {
          var slot = new Slot(x, y, z, context);
          this.slots.push(slot);
        }
      }
    }
  }
}

Board.prototype.addRandomTiles = function() {
  this.slots.forEach(function(slot){
    if(Math.random() > .8)
      slot.tile = new Tile("../images/tile_hex_1.svg");
  });
}

Board.prototype.drawPotentialSlots = function(mouseX, mouseY, shape) {
  if(!shape) return;
  if(!this.validDrop(mouseX, mouseY, shape)) return;
  mouseX += -hexHelper.boardOffset.x;
  mouseY += -hexHelper.boardOffset.y;
  var [cx, cy] = hexHelper.nearestHexCenterFromPixels(mouseX, mouseY);
  cx += hexHelper.boardOffset.x;
  cy += hexHelper.boardOffset.y;
  shape.draw(cx, cy);
}

Board.prototype.validDrop = function(mouseX, mouseY, shape) {
  if(!shape) return;
  mouseX += -hexHelper.boardOffset.x
  mouseY += -hexHelper.boardOffset.y

  var [x, y, z] = hexHelper.pixelsToHex(mouseX, mouseY)
  var coordsToCheck = shape.tiles.map(function(tile) {
    return [x + tile.x, y + tile.y, z + tile.z];
  })

  board = this;
  return _.every(coordsToCheck, function(coords){
    slot = board.coordsToSlot(coords[0], coords[1], coords[2])
    return slot && slot.tile == undefined;
  });
}

Board.prototype.coordsToSlot = function(x, y, z) {
  var matchCoords = [x, y, z];
  return this.slots.reduce(function(slot, slotToCheck) {
    currentCoords = [slotToCheck.x, slotToCheck.y, slotToCheck.z];
    return _.isEqual(matchCoords, currentCoords) ? slotToCheck : slot;
  }, false);
}

Board.prototype.addTilesFromShape = function(mouseX, mouseY, shape) {
  if(!shape) return;
  if(!this.validDrop(mouseX, mouseY, shape)) return;
  mouseX += -hexHelper.boardOffset.x;
  mouseY += -hexHelper.boardOffset.y;

  var [x, y, z] = hexHelper.pixelsToHex(mouseX, mouseY);
  var board = this;
  shape.tiles.forEach(function(tileOpts){
    var tile = new Tile(shape.image);
    board.coordsToSlot(x + tileOpts.x, y + tileOpts.y, z + tileOpts.z).tile = tile;
  })
}

Board.prototype.draw = function(){
  this.slots.forEach(function(slot){
    slot.draw();
  })
}

module.exports = Board;
