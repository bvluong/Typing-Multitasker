
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



const moving_letters = [];
for (var i = 0; i < 5; i++) {
  moving_letters.push(new MovingLetter);
}
// MovingArray({ array: moving_letters,  length: 50000, interval: 50, clear:true});


//
// document.addEventListener("keydown", keyDownTextField, false);
//
// function MovingArray(options) {
//   const defaultOptions = {
//     length: 1500,
//     interval: 1,
//     clear: false
//   };
//   options = Object.assign(defaultOptions,options);
//
//   const runFunc = setInterval(() => {
//     if (options.clear) {
//       c.clearRect(0, 0, innerWidth, innerHeight);
//       }
//     options.array.forEach(obj => obj.update());
//
//   }, options.interval);
//   setTimeout( () => {
//     clearInterval(runFunc);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     options.array.forEach(obj => obj.reset());
//   }, options.length);
// }
//
// function MovingObject(options) {
//   const defaultOptions = {
//     length: 2000,
//     interval: 40,
//   };
//   options = Object.assign(defaultOptions,options);
//   const runFunc = setInterval(() => {
//     c.beginPath();
//     c.arc(innerWidth/2, innerHeight/2, 50, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
//
//     c.beginPath();
//     c.arc(innerWidth/2, innerHeight/2+150, 150, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
//     options.object.update();
//   }, options.interval);
//   setTimeout( () => {
//     clearInterval(runFunc);
//     options.object.reset();
//     c.clearRect(0, 0, innerWidth, innerHeight);
//   }, options.length);
// }
//
// function FlashingWord(options) {
//   const defaultOptions = {
//     length: 2000,
//     interval: 10,
//   };
//   options = Object.assign(defaultOptions,options);
//   const runFunc = setInterval(() => {
//     const object = new options.class;
//     object.update();
//   }, options.interval);
//   setTimeout( () => {
//     clearInterval(runFunc);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//   }, options.length);
// }
//
// function keyDownTextField(e) {
//   const keyInput = e.key;
//
//   switch (keyInput) {
//
//     case 'a':
//       const lap_lines = newLapLines();
//       MovingArray( {array: lap_lines} );
//
//       break;
//
//     case 's':
//       const flickering_circle = newFlickeringCircle();
//       MovingArray( { array: flickering_circle });
//       break;
//
//     case 'd':
//       const big_trailing_circle = new BigTrailingCircle;
//       MovingObject( { object: big_trailing_circle, length: 10000 } );
//       break;
//
//     case 'f':
//       const many_mini_circles = newManyMiniCircles();
//       MovingArray( { array:many_mini_circles, clear:true });
//       break;
//
//     case 'g':
//       FlashingWord({ class: LightsSign } );
//       var audio = document.getElementById("audio");
//       audio.play();
//       break;
//
//     case 'r':
//     if ((moving_letter.x < (innerWidth/2)+50 && moving_letter.x > (innerWidth/2)-50) &&
//         (moving_letter.y < (innerHeight/2)+50 && moving_letter.y > (innerHeight/2)-50))
//      {
//          FlashingWord({ class: LightsSign } );
//     } else {
//       console.log('You missed');
//     }
//     break;
//     default:
//     console.log("not valid key");
//   }
// }
