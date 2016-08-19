const Board = require('./board');

const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

var isMouseDown = false;
var board = new Board(ctx);

board.addRandomTiles();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  requestAnimationFrame(gameLoop);
});

document.addEventListener('mousedown', function(event){
  console.log("mouseDown. x:", event.x, " y:", event.y);
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
  }
})

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
