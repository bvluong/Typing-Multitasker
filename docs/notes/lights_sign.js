
var canvas = document.getElementById('root');
var c = canvas.getContext('2d');

class LightsSign {
  constructor() {
    this.x = innerWidth/2;
    this.y = innerHeight/2;
    this.text = "LIGHTS";
    this.color = ['#0000CD','#00FFFF', '#6495ED', '#00008B'][Math.floor(Math.random() * 4)];
  }

  draw() {
    c.font = '100px Iceland';
    c.fillStyle = this.color;
    c.textAlign = 'center';
    c.fillText(this.text, this.x, this.y);
  }

  update() {
    this.draw();
  }
}

export default LightsSign;
