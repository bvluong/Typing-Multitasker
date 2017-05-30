
var canvas = document.getElementById('root');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

class OverLappingLines {
  constructor(x,y,dx,dy,radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.default = { x, y, dx, dy, radius, color};
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if ( this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if ( this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  reset() {
    this.x = this.default['x'];
    this.y = this.default['y'];
    this.dx = this.default['dx'];
    this.dy = this.default['dy'];
    this.radius = this.default['radius'];
    this.color = this.default['color'];
  }
}

function newLapLines() {
  var circleArray = [];
  for (var i = 0; i < 4; i++) {
    var radius = 10;
    var x = (0.15*i) * (innerWidth - radius*2) + radius;
    var y = (1*(i%2)) * (innerHeight- radius*2) + radius;
    var dx = 4;
    var dy = (i%2 === 0 ? 4 : -4);
    var color = ['blue', 'red'][i%2];
    circleArray.push(new OverLappingLines(x, y, dx, dy, radius, color));
  }
  return circleArray;
}
export default newLapLines;