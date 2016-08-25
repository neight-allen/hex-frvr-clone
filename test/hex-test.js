const assert = require('chai').assert;

const Hex = require('../lib/hex')

var hexSet = [];//, axialSet = [];

describe('Hex', function(){

  before(function(){
    for(var x = -3; x <= 3; x++) {
      for(var y = -3; y <= 3; y++) {
        for(var z = -3; z <= 3; z++) {
          if(x+y+z == 0) {
            var hex = new Hex(x, y, z)
            hexSet.push(hex);
            // axialSet.push(hex.toAxial());
          }
        }
      }
    }
  });

  context('conversions', function(){

    it.skip('should convert from axial to hex', function(){
      var [q, r] = hexHelper.cubeToAxial(0,0,0);
      var [nx, ny, nz] = hexHelper.axialToCube(q, r);
      assert.equal(nx, 0);
      assert.equal(ny, 0);
      assert.equal(nz, 0);
    });

    it.skip('should convert another axial to hex', function(){
      var [q, r] = hexHelper.cubeToAxial(-1,0,1);
      var [nx, ny, nz] = hexHelper.axialToCube(q, r);
      assert.equal(nx, -1);
      assert.equal(ny, 0);
      assert.equal(nz, 1);
    });

    it.skip('should convert a bunch of axials to hex', function() {
      hexSet.forEach(function(coords){
        var [x, y, z] = coords;
        var [q, r] = hexHelper.cubeToAxial(x,y,z);
        var [nx, ny, nz] = hexHelper.axialToCube(q, r);
        assert.equal(nx, x);
        assert.equal(ny, y);
        assert.equal(nz, z);
      });
    });

    it.skip('should convert from pixels to axial', function() {
      var [x, y] = hexHelper.axialToPixels(0,0);
      var [nq, nr] = hexHelper.pixelsToAxial(x, y);
      assert.equal(nq, 0);
      assert.equal(nr, 0);
    });

    it.skip('should convert another pixels to axial', function() {
      var [x, y] = hexHelper.axialToPixels(1,0);
      var [nq, nr] = hexHelper.pixelsToAxial(x, y);
      // var [rq, rr] = hexHelper.axialRound(nq, nr);
      assert.equal(nq, 0);
      assert.equal(nr, 1);
    });

    it.skip('should convert from a bunch of pixels to axial', function() {
      axialSet.forEach(function(axial){
        var [q, r] = axial;
        var [y, x] = hexHelper.axialToPixels(q, r);
        var [nq, nr] = hexHelper.pixelsToAxial(x, y);
        // var [rq, rr] = hexHelper.axialRound(nq, nr);
        assert.equal(rq, q);
        assert.equal(rr, r);
      });
    });

    it('should convert from pixels to hex', function(){
      var hex = (new Hex()).fromPixels({x:0, y:0});
      assert.equal(hex.x, 0);
      assert.equal(hex.y, 0);
      assert.equal(hex.z, 0);
    });

    it('should convert another pixels to hex', function(){
      pixels = new Hex(-1, 0, 1).toPixels();
      var hex = (new Hex()).fromPixels(pixels);
      assert.equal(hex.x, -1);
      assert.equal(hex.y, 0);
      assert.equal(hex.z, 1);
    });

    it('should convert a bunch of pixels to hex', function(){
      hexSet.forEach(function(hex) {
        var pixels = hex.toPixels();
        var hexFromPixels = (new Hex()).fromPixels(pixels);
        assert.equal(hexFromPixels.x, hex.x);
        assert.equal(hexFromPixels.y, hex.y);
        assert.equal(hexFromPixels.z, hex.z);
      })
    });

  });
});
