const assert = require('chai').assert;

const hexHelper = require('../lib/hex-helper');

var hexSet = [], axialSet = [];

describe('Hex Helper', function(){

  before(function(){
    for(var x = -3; x <= 3; x++) {
      for(var y = -3; y <= 3; y++) {
        for(var z = -3; z <= 3; z++) {
          if(x+y+z == 0) {
            hexSet.push([x, y, z]);
            axialSet.push(hexHelper.cubeToAxial(x, y, z));
          }
        }
      }
    }
  });

  context('conversions', function(){

    it('should convert from axial to hex', function(){
      var [q, r] = hexHelper.cubeToAxial(0,0,0);
      var [nx, ny, nz] = hexHelper.axialToCube(q, r);
      assert.equal(nx, 0);
      assert.equal(ny, 0);
      assert.equal(nz, 0);
    });

    it('should convert another axial to hex', function(){
      var [q, r] = hexHelper.cubeToAxial(-1,0,1);
      var [nx, ny, nz] = hexHelper.axialToCube(q, r);
      assert.equal(nx, -1);
      assert.equal(ny, 0);
      assert.equal(nz, 1);
    });

    it('should convert a bunch of axials to hex', function() {
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
      var [x, y, z] = hexHelper.pixelsToHex(0,0);
      assert.equal(x, 0);
      assert.equal(y, 0);
      assert.equal(z, 0);
    });

    it('should convert another pixels to hex', function(){
      var [x, y] = hexHelper.hexToPixels(-1, 0, 1);
      var [hx, hy, hz] = hexHelper.pixelsToHex(x, y);
      assert.equal(hx, -1);
      assert.equal(hy, 0);
      assert.equal(hz, 1);
    });

    it('should convert a bunch of pixels to hex', function(){
      hexSet.forEach(function(hex) {
        var [hx, hy, hz] = hex
        var [x, y] = hexHelper.hexToPixels(hx, hy, hz);
        var [cx, cy, cz] = hexHelper.pixelsToHex(x, y);
        assert.equal(cx, hx);
        assert.equal(cy, hy);
        assert.equal(cz, hz);
      })
    });
  });
});
