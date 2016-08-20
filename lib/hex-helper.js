module.exports = {
  // # convert cube to odd-r offset
  // col = x + (z - (z&1)) / 2
  // row = z
  size: 35,
  boardOffset: {x: 300, y: 300},
  // hexToOffset: function(x,y,z) {
  //   col = x + (z - (z&1)) / 2;
  //   row = z;
  //   return [row, col];
  // },
  // offsetToHex: function(col, row) {
  //   x = col - (row - (row&1)) / 2
  //   z = row
  //   y = -x-z
  //   return [x,y,z]
  // },
  // offsetToPixels: function(row, col) {
  //   var x = this.size * Math.sqrt(3) * (col + 0.5 * (row&1))
  //   var y = this.size * 3/2 * row
  //
  //   return [x, y]
  // },
// # convert cube to axial
// q = x
// r = z
  cubeToAxial: function(x,y,z) {
    return [x, z]
  },
// # convert axial to cube
// x = q
// z = r
// y = -x-z
  axialToCube: function(q, r) {
    return [q, -q-r, r]
  },
  axialToPixels: function(q, r) {
    var x = this.size * Math.sqrt(3) * (q + r/2)
    var y = this.size * 3/2 * r
    return [x, y]
  },
  hexToPixels: function(x,y,z) {
    [q, r] = this.cubeToAxial(x, y, z);
    return this.axialToPixels(q, r);
  },
  pixelsToAxial: function(x, y) {
    q = (x * Math.sqrt(3)/3 - y / 3) / this.size;
    r = y * 2/3 / this.size;
    [rq, rr] = this.axialRound(q, r);
    return [rq, rr];
  },
  pixelsToHex: function(x, y) {
    var [q,r] = this.pixelsToAxial(x, y);
    return this.axialToCube(q, r)
    // var [fx, fy, fz] = this.axialToCube(q, r);
    // return this.cubeRound(fx, fy, fz);
  },
  axialRound: function(q, r){
    var [fx, fy, fz] = this.axialToCube(q, r);
    var [x, y, z] = this.cubeRound(fx, fy, fz);
    return this.cubeToAxial(x, y, z);
  },
  cubeRound: function(x, y, z) {
    var rx = Math.round(x)
    var ry = Math.round(y)
    var rz = Math.round(z)

    var x_diff = Math.abs(rx - x)
    var y_diff = Math.abs(ry - y)
    var z_diff = Math.abs(rz - z)

    if(x_diff > y_diff && x_diff > z_diff) {
      rx = -ry-rz;
    } else if(y_diff > z_diff) {
      ry = -rx-rz;
    } else {
      rz = -rx-ry;
    }

    return [rx, ry, rz];
  },
  nearestHexCenterFromPixels: function(x, y) {
    var [hx, hy, hz] = this.pixelsToHex(x, y);
    return this.hexToPixels(hx, hy, hz);
  }
  // pixelsToOffset: function(x, y) {
  //   col = (x * Math.sqrt(3)/3 - y / 3) / this.size;
  //   row = y * 2/3 / this.size;
  //
  //   // q = x * 2/3 / this.size;
  //   // r = (-x / 3 + Math.sqrt(3)/3 * y) / this.size;
  //   var [rq, rr] = this.offsetRound(col, row);
  //   return [rq, rr];
  // },
  // offsetRound: function(q, r) {
  //   var [x, y, z] = this.offsetToHex(q, r);
  //   var [rx, ry, rz] = this.hexRound(x, y, z);
  //   return this.hexToOffset(rx, ry, rz);
  // },
  // pixelsToHex: function(x, y){
  //
  // }
}

// # convert odd-r offset to cube
// x = col - (row - (row&1)) / 2
// z = row
// y = -x-z
