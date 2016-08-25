const _ = require('underscore');

const Slot = require('./slot');
const Tile = require('./tile');
const Hex = require('./hex');
const hexHelper = require('./hex-helper');

function Board(context){
  this.boardSize = 4;
  this.slots = [];

  for(var x = -this.boardSize; x <= this.boardSize; x++) {
    for(var y = -this.boardSize; y <= this.boardSize; y++) {
      for(var z = -this.boardSize; z <= this.boardSize; z++) {
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

Board.prototype.drawPotentialSlots = function(mouseCoords, shape) {
  if(!shape) return;
  pixels = hexHelper.subVector2(mouseCoords, hexHelper.boardOffset);
  if(!this.validDrop(pixels, shape)) return;

  var center = hexHelper.nearestHexCenterFromPixels(pixels);
  center.x += hexHelper.boardOffset.x;
  center.y += hexHelper.boardOffset.y;
  shape.draw(center.x, center.y);
}

Board.prototype.validDrop = function(pixels, shape) {
  if(!shape) return;

  var hex = (new Hex()).fromPixels(pixels);
  return this.validShapeAtCoords(hex, shape);
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
  mouseX += -hexHelper.boardOffset.x;
  mouseY += -hexHelper.boardOffset.y;

  if(!this.validDrop({x: mouseX, y: mouseY}, shape)) return;

  var [x, y, z] = hexHelper.pixelsToHex(mouseX, mouseY);
  var board = this;
  shape.tiles.forEach(function(tileOpts){
    var tile = new Tile(shape.image);
    board.coordsToSlot(x + tileOpts.x, y + tileOpts.y, z + tileOpts.z).tile = tile;
  })
}

Board.prototype.removeFullLines = function() {
  //get full rows
  var board = this;
  var fullRows = ["x", "y", "z"].reduce(function(allRows, axis) {
    for(var n = -board.boardSize; n <= board.boardSize; n++) {
      allRows.push(board.getRow(axis, n));
    }
    return allRows;
  }, []).filter(function(row){
    return _.every(row, function(slot) {
      return slot.tile != undefined;
    });
  });

  var multiplier = 1;
  var score = 0;
  fullRows.forEach(function(fullRow){
    fullRow.forEach(function(slot) {
      slot.tile = undefined;
    });
    score += fullRow.length * 500 * multiplier;
    multiplier++;
  })

  return score;
}

Board.prototype.validShapeAtCoords = function(hex, shape) {
  if(!shape) return;
  var hexesToCheck = shape.tiles.map(function(tile) {
    return new Hex(hex.x + tile.x, hex.y + tile.y, hex.z + tile.z);
  })

  board = this;
  return _.every(hexesToCheck, function(hex) {
    slot = board.coordsToSlot(hex.x, hex.y, hex.z);
    return slot && slot.tile == undefined;
  });
}

Board.prototype.hexToSlot = function(hex) {
  return board.coordsToSlot(hex.x, hex.y, hex.z);
}

Board.prototype.getRow = function(axis, rowNumber) {
  return this.slots.filter(function(slot){
    return slot[axis] == rowNumber;
  })
}

Board.prototype.movesRemaining = function(shapes) {
  board = this;
  return _.any(this.slots, function(slot) {
    return _.any(shapes, function(shape) {
      return board.validShapeAtCoords(new Hex(slot.x, slot.y, slot.z), shape);
    });
  });
}

Board.prototype.draw = function(){
  this.slots.forEach(function(slot){
    slot.draw();
  })
}

module.exports = Board;
