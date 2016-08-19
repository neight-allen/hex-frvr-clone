const Board = require('./board');
const Shape = require('./shape');

const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

var isMouseDown = false;
var board = new Board(ctx);

var shape = new Shape(ctx);

var mouseCoords = {};

board.addRandomTiles();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  if(isMouseDown){
    shape.draw(mouseCoords.x, mouseCoords.y);
  }
  requestAnimationFrame(gameLoop);
});

document.addEventListener('mousedown', function(event){
  console.log("mouseDown. x:", event.x, " y:", event.y);
  coords = getMousePos(canvas, event);
  mouseCoords = coords;
  isMouseDown = true;
})

document.addEventListener('mouseup', function(event){
  console.log("mouseUp. x:", event.x, " y:", event.y);
  isMouseDown = false;
})

document.addEventListener('mousemove', function(event){
  if(isMouseDown){
    coords = getMousePos(canvas, event);
    console.log('x:', coords.x, ' y:', coords.y);
    mouseCoords = coords;
  }
})

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
