
var canvas = document.getElementById('root');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// takes x position, y position, width, height
// how to style the rectangles
c.fillStyle = 'rgba(255, 0, 0, 0.2)';
// c.fillRect(x,y,width,height)
c.fillRect(100,100, 100, 100);
c.fillRect(400,100, 100, 100);
c.fillRect(100,300, 100, 100);

// How to add Line
c.beginPath();
// start position
c.moveTo(50,300);
// end postion
c.lineTo(300,100);
c.lineTo(400,300);
c.lineTo(5,600);
// How to add css style to line
c.strokeStyle = "#ffffff";
c.stroke();

// ARC/Circle x position,
// c.arc(x position, y position, radius( how big the arc gets),
// start angle(in radians), end Angle(in radians))
c.beginPath();
c.arc(300, 300, 50, 0, Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke();

for (var i = 0; i < 200; i++) {
  // randomize by full screen width and height
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;

  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  var color = ['red','blue', 'yellow', 'white', 'black', 'purple'];
  c.strokeStyle = color[Math.floor(Math.random() * 5)];
  c.stroke();
}
