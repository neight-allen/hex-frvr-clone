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

Board.prototype.drawPotentialSlots = function(x, y, shape) {
  if(!shape) return;
  var [cx, cy] = hexHelper.nearestHexCenterFromPixels(x, y);
  shape.draw(cx - 3, cy - 15);
}

Board.prototype.validateDrop(x, y, shape) {
  
}

Board.prototype.draw = function(){
  this.slots.forEach(function(slot){
    slot.draw();
  })
}

module.exports = Board;
