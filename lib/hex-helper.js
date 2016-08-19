module.exports = {
  // # convert cube to odd-r offset
  // col = x + (z - (z&1)) / 2
  // row = z
  size: 35,
  boardOffset: {x: 250, y: 300},
  HexToOffset: function(x,y,z) {
    col = x + (z - (z&1)) / 2;
    row = z;
    return [row, col];
  },
  OffsetToPixels: function(row, col) {
    var height = this.size * 2;
    var x = height * Math.sqrt(3) * (col + 0.5 * (row&1)) / 2
    var y = this.size * 3/2 * row
    return [x, y]
  },
  HexToPixels: function(x,y,z) {
    [row,col] = this.HexToOffset(x,y,z);
    return this.OffsetToPixels(row,col);
  }
}

// # convert odd-r offset to cube
// x = col - (row - (row&1)) / 2
// z = row
// y = -x-z
