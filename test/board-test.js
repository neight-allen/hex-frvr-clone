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
});
