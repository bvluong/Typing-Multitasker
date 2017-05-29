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


var stage = new createjs.Stage("root");

var inputCircle = new createjs.Shape();
inputCircle.graphics.beginStroke("DeepSkyBlue").drawCircle(0, 0, 40);
inputCircle.x = innerWidth/2;
inputCircle.y = innerHeight/2;
stage.addChild(inputCircle);

var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
circle.x = innerWidth/2;
circle.y = innerHeight/2;
stage.addChild(circle);

function letterK() {
  let object = new createjs.Text("r", "20px Arial", "#ff7700");
  object.x = innerWidth/2;
  object.y = innerHeight/2;
  stage.addChild(object);
  return object;
}

function updateLetter(letter,time) {
  letter.x += Math.cos( ((Math.PI*2) /2) * (time / 2000))*10;
  letter.y += Math.sin( ((Math.PI*2) /2) * (time / 2000))*10;

}

function removeLetter(obj) {
  stage.removeChild(obj);
}

function addLetter(letter) {
  stage.addChild(letter);
}

const letters_array = [[circle,0]];


createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setFPS(50);
createjs.Ticker.setInterval(20);

let start_time = 0;
setInterval(() => {
  start_time += 1500;
  letters_array.push([letterK(),start_time]);
}, 1500);

function tick(event) {

  letters_array.forEach( (letter) => {
    updateLetter(letter[0] ,event.time-letter[1]); });

  stage.update(event);
}


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  switch (keyInput) {
    case 'r':
    // if ((circle2.x < inputCircle.x+50 && circle2.x > inputCircle.x-50) &&
    //     (circle2.y < inputCircle.y+50 && circle2.y > inputCircle.y-50))
    //  {
    //    console.log(circle2.text);
    //    console.log("it works");
    // } else {
    //   console.log('You missed');
    // }
    // break;
    default:
    console.log("not valid key");
  }
}
