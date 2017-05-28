var canvas = document.getElementById('root');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

class FlickeringCircle {
  constructor(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = ['blue','white', 'white', 'white', 'white', 'white', 'red'];
    this.default = { x, y, dx, dy, radius};
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color[Math.floor(Math.random() * this.color.length)];
    c.fillStyle = this.color[Math.floor(Math.random() * this.color.length)];
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
  }
}

// x and y are the position at which it will be at
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// // set x and y velocity to the velocity ie how much the pixels increase by
// // Use the -0.5 in order the randomize moing left right up or down at start
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// requestAnimationFrame will create a loop on animate
// var radius = 50;

function newFlickeringCircle() {
  var circleArray = [];
  for (var i = 0; i < 50; i++) {
    var radius = 50;
    var x = Math.random() * (innerWidth - radius*2) + radius;
    var y = Math.random() * (innerHeight- radius*2) + radius;
    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    circleArray.push(new FlickeringCircle(x, y, dx, dy, radius));
  }
  return circleArray;
}


export default newFlickeringCircle;
