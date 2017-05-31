
var canvas = document.getElementById('root');
var c = canvas.getContext('2d');

class ManyMiniCircles {
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

function newManyMiniCircles() {
  var circleArray = [];
  for (var i = 0; i < 800; i++) {
    var radius = 2;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight- radius*2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var color = ['blue','red', 'black', 'orange'][Math.floor(Math.random() * 4)];
    circleArray.push(new ManyMiniCircles(x, y, dx, dy, radius, color));
  }
  return circleArray;
}

export default newManyMiniCircles;
