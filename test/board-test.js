const assert = require('chai').assert;

const Board = require('../lib/board');

describe('board', function(){
  context('initialization',function(){

    it('should have an array of slots', function(){
      assert.isArray((new Board()).slots);
    })

    it('should have a bunch of slots', function(){
      assert.equal((new Board()).slots.length, 61);
    })

    it('should have slots with coordinates', function(){
      var board = new Board();
      board.slots.forEach(function(slot){
        assert.isNumber(slot.x);
        assert.isNumber(slot.y);
        assert.isNumber(slot.z);
      })
    })

    it('should have slots with coordinates that equal zero', function(){
      var board = new Board();
      board.slots.forEach(function(slot){
        assert.equal(slot.x + slot.y + slot.z, 0);
      })
    })
  })

  context('operations', function() {

    it('should be able to get slot by coords', function() {
      var board = new Board();
      slot = board.coordsToSlot(0,0,0);
      assert.equal(slot.x, 0);
      assert.equal(slot.y, 0);
      assert.equal(slot.z, 0);
    });

    it('should be able to get all slots by coords', function() {
      var board = new Board();
      board.slots.forEach(function(slot) {
        slotFound = board.coordsToSlot(slot.x, slot.y, slot.z);
        assert.equal(slotFound.x, slot.x);
        assert.equal(slotFound.y, slot.y);
        assert.equal(slotFound.z, slot.z);
      })
    });

  });
});
