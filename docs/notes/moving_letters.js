
var canvas = document.getElementById('root');
var c = canvas.getContext('2d');

class MovingLetter {
  constructor() {
    this.x = innerWidth/2;
    this.y = innerHeight/2;
    this.dx = (Math.PI * 2)/100;
    this.dy = (Math.PI * 2)/100;
    this.text = "F";
    this.color = ['#0000CD','#00FFFF', '#6495ED', '#00008B'][Math.floor(Math.random() * 4)];
  }

  draw() {
    c.font = '100px Iceland';
    c.fillStyle = this.color;
    c.textAlign = 'center';
    c.fillText(this.text, this.x, this.y);
  }

  update() {

    this.x += Math.cos(this.dx)*10;
    this.y += Math.sin(this.dy)*10;

    this.dx += (Math.PI * 2)/100;
    this.dy += (Math.PI * 2)/100;

    this.draw();
  }

  reset() {
    this.x = innerWidth/2;
    this.y = innerHeight/2;
    this.dx = (Math.PI * 2)/100;
    this.dy = (Math.PI * 2)/100;
  }
}

export default MovingLetter;
