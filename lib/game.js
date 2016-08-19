const Board = require('./board');
const Shape = require('./shape');

const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

var isMouseDown = false;
var board = new Board(ctx);

var shapeInHand = new Shape(ctx);

var mouseCoords = {};

var shapesInWaiting = {
  first: new Shape(ctx),
  second: new Shape(ctx),
  third: new Shape(ctx)
}

function drawShapesInWaiting() {
  shapesInWaiting.first.draw(650, 150, .5);
  shapesInWaiting.second.draw(650, 300, .5);
  shapesInWaiting.third.draw(650, 450, .5);
}

function drawShapeInHand(){
  if(isMouseDown && shapeInHand){
    shapeInHand.draw(mouseCoords.x, mouseCoords.y);
  }
}


board.addRandomTiles();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  drawShapesInWaiting();
  drawShapeInHand();
  requestAnimationFrame(gameLoop);
});

document.addEventListener('mousedown', function(event){
  console.log("mouseDown. x:", event.x, " y:", event.y);
  coords = getMousePos(canvas, event);
  mouseCoords = coords;
  isMouseDown = true;
  shapeInHand = whichShapeDidYouPick();
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
