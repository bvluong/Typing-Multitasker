import newLapLines from './animations/overlapping_lines.js';
import newFlickeringCircle from './animations/flickering_circle.js';
import BigTrailingCircle from './animations/big_trailing_circle';
import newManyMiniCircles from './animations/many_mini_circles';
import LightsSign from './animations/lights_sign';
import MovingLetter from './animations/moving_letters';
import 'yuki-createjs';



var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

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


var stage = new createjs.Stage("root");
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
circle.x = innerWidth/2;
circle.y = innerHeight/2;

var inputCircle = new createjs.Shape();
inputCircle.graphics.beginStroke("DeepSkyBlue").drawCircle(0, 0, 40);
inputCircle.x = innerWidth/2;
inputCircle.y = innerHeight/2;


stage.addChild(circle);
stage.addChild(inputCircle);
stage.update();

createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setInterval(1000);
createjs.Ticker.setFPS(50);
let dx = (Math.PI * 2)/50;
let dy = (Math.PI * 2)/50;
function tick(event) {
    // move 100 pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond):
  circle.x += Math.cos(dx)*20;
  circle.y += Math.sin(dy)*20;
  dx += (Math.PI*2)/50;
  dy += (Math.PI*2)/50;
  // this will log a steadily increasing value:
  stage.update();
}
