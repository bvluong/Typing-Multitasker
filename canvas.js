import 'yuki-createjs';
import { createCircle, createletterR } from './animation/background_circle';


var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var stage = new createjs.Stage("root");

let inputCircle = createCircle();
stage.addChild(inputCircle);

// class Letters {
//   constructor() {
//     this.letters_array = [];
//   }
//
//   createletterR() {
//     let object = new createjs.Text("r", "20px Arial", "#ff7700");
//     object.x = innerWidth/2;
//     object.y = innerHeight/2;
//     stage.addChild(object);
//     this.letters_array.push(object);
//   }
//
// }
//

function createletterR() {
  let object = new createjs.Text("r", "20px Arial", "#ff7700");
  object.x = innerWidth/2;
  object.y = innerHeight/2;
  stage.addChild(object);
  return object;
}

function generateLetters() {
  let start_time = 0;
  setInterval(() => {
    start_time += random_intervals[counter];
    letters_array.push([createletterR(),start_time]);
  }, random_intervals[counter]);
}

function updateLetter(letter,time) {
  letter.x += Math.cos( ((Math.PI*2) /2) * (time / 3000))*3;
  letter.y += Math.sin( ((Math.PI*2) /2) * (time / 3000))*3;
  if (letter.x >= 465 && time > 3000) {
    stage.removeChild(letter);
  }
}

function removeLetter(obj) {
  stage.removeChild(obj);
}

function addLetter(letter) {
  stage.addChild(letter);
}

const letters_array = [];
const random_intervals = [3333, 1500, 2000, 6000, 3000];
let counter = 0;


createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setFPS(50);
createjs.Ticker.setInterval(20);
generateLetters();

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
    if (length) {

    }
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
