function Tile(image, context) {
  this.image = new Image();
  this.image.src = image;

  this._context = context;

}

module.exports = Tile;
