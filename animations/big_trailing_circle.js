var canvas = document.getElementById('root');

var c = canvas.getContext('2d');

class BigTrailingCircle {
  constructor() {
    this.x = innerWidth/2;
    this.y = innerHeight/2;
    this.dx = (Math.PI * 2)/100;
    this.dy = (Math.PI * 2)/100;
    this.startPoint = 0;
    this.endPoint = (Math.PI * 2)/100;
    this.radius = (innerHeight+innerWidth)/6;
    this.color = 'magenta';

  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, this.startPoint, this.endPoint, false);
    c.strokeStyle = this.color;
    c.lineWidth = 30;
    c.stroke();
  }

  update() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    if ( this.endPoint >= Math.PI * 2) {
      this.dx = (Math.PI * 2)/100;
      this.dy = 0;
    }
    this.startPoint += this.dx;
    this.endPoint += this.dy;

    this.draw();
  }

  reset() {
    this.dx = 0;
    this.dy = (Math.PI * 2)/100;
    this.startPoint = 0;
    this.endPoint = (Math.PI * 2)/100;
  }
}

export default BigTrailingCircle;
