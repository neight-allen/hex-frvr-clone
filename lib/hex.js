var size = 35;
var boardOffset = {x: 300, y: 300};

function Hex(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

Hex.prototype.toPixels = function() {
  var axial = cubeToAxial(this);
  return axialToPixels(axial);
}

Hex.prototype.fromPixels = function(pixels) {
  var axial = pixelsToAxial(pixels);
  return axialToCube(axial);
}

function pixelsToAxial(pixels) {
  var axial = {};
  axial.q = (pixels.x * Math.sqrt(3)/3 - pixels.y / 3) / size;
  axial.r = pixels.y * 2/3 / size;
  roundedAxial = axialRound(axial);
  return roundedAxial;
}

function cubeToAxial(cube) {
  return {q: cube.x, r: cube.z}
}

function axialToCube(axial) {
  return new Hex(axial.q, -axial.q - axial.r, axial.r);
}

function axialToPixels(axial) {
  var pixels = {};
  pixels.x = size * Math.sqrt(3) * (axial.q + axial.r/2);
  pixels.y = size * 3/2 * axial.r;
  return pixels;
}

function axialRound(axial) {
  var floatCube = axialToCube(axial);
  var roundedCube = cubeRound(floatCube);
  return cubeToAxial(roundedCube);
}

function cubeRound(floatedCube) {
  var rx = Math.round(floatedCube.x)
  var ry = Math.round(floatedCube.y)
  var rz = Math.round(floatedCube.z)

  var x_diff = Math.abs(rx - floatedCube.x)
  var y_diff = Math.abs(ry - floatedCube.y)
  var z_diff = Math.abs(rz - floatedCube.z)

  if(x_diff > y_diff && x_diff > z_diff) {
    rx = -ry-rz;
  } else if(y_diff > z_diff) {
    ry = -rx-rz;
  } else {
    rz = -rx-ry;
  }

  return new Hex(rx, ry, rz);
}

module.exports = Hex;
