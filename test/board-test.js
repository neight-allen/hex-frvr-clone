const assert = require('chai').assert;
var _ = require('underscore');

const Board = require('../lib/board');
const Shape = require('../lib/shape');
const Tile = require('../lib/tile');

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

  context('slots', function() {

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

  context('shapes', function(){
    it('can place shapes in the middle of a blank board', function(){
      var board = new Board();
      for(var i = 0; i < 50; i++){
        assert(board.validShapeAtCoords(0,0,0, new Shape()));
      }
    })

    it("can't place shapes on top of a tile", function(){
        var board = new Board();
        board.coordsToSlot(0,0,0).tile = new Tile();
        for(var i = 0; i < 50; i++){
          assert.isFalse(board.validShapeAtCoords(0,0,0, new Shape()));
        }
    });

    it("has remaining moves when the board is empty", function(){
      var board = new Board();
      for(var i = 0; i < 50; i++){
        assert(board.movesRemaining([new Shape(), new Shape(), new Shape()]));
      }
    });

    it("has remaining moves when the board is empty", function(){
      var board = new Board();
      board.slots.forEach(function(slot){
        slot.tile = new Tile();
      })
      for(var i = 0; i < 10; i++) {
        assert.isFalse(board.movesRemaining([new Shape(), new Shape(), new Shape()]));
      }
    });

  });

  context("rows", function() {

    it("can get a row of slots", function() {
      var board = new Board();
      _.range(-board.boardSize, board.boardSize).forEach(function(rowNum) {
        ["x", "y", "z"].forEach(function(axis) {
          board.getRow(axis, rowNum).forEach(function(slot) {
            assert.equal(slot[axis], rowNum);
          });
        });
      });
    });

    it("will remove a row that is full of tiles", function(){
      var board = new Board();
      _.range(-board.boardSize, board.boardSize).forEach(function(rowNum) {
        ["x", "y", "z"].forEach(function(axis) {
          var row = board.getRow(axis, rowNum)
          row.forEach(function(slot) {
            slot.tile = new Tile();
          });
          board.removeFullLines();
          row.forEach(function(slot){
            assert.isUndefined(slot.tile);
          })
        });
      });
    });

    it("will remove multiple rows that are full of tiles", function(){
      var board = new Board();
      _.range(-board.boardSize, board.boardSize).forEach(function(rowNum) {
        var rows = ["x", "y", "z"].map(function(axis) {
          var row = board.getRow(axis, rowNum)
          row.forEach(function(slot) {
            slot.tile = new Tile();
          });
          return row
        });
        board.removeFullLines();
        rows.forEach(function(row) {
          row.forEach(function(slot) {
            assert.isUndefined(slot.tile);
          })
        })
      });
    });

  });
});
