import 'yuki-createjs';
import { createCircle, createletterR } from './animation/objects';


var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

class Game {
  constructor() {
      this.random_intervals = [3333, 1500, 2000, 6000, 3000];
      this.stage = new createjs.Stage("root");
      this.letters_array = [];
      this.counter = 0;
      this.tick = this.tick.bind(this);
      this.lifebar = 100000;
  }

  first_level() {
    let inputCircle = createCircle()
    this.stage.addChild(inputCircle);
    this.stage.update();
  }

  generateLetters() {
    let start_time = 0;
    this.startLetters = setInterval(() => {
      start_time += this.random_intervals[this.counter];
      let newObj = this.stage.addChild(createletterR());
      this.letters_array.push([newObj,start_time]);
    }, this.random_intervals[this.counter]);
  }

  stopLetters() {
    clearInterval(this.startLetters);
  }

  updateLetter(letter,time) {
    letter.x += Math.cos( ((Math.PI*2) /2) * (time / 3000))*3;
    letter.y += Math.sin( ((Math.PI*2) /2) * (time / 3000))*3;
    if (letter.x >= 465 && time > 3000) {
      this.stage.removeChild(letter);
    }
  }

  removeLetter(obj) {
    this.stage.removeChild(obj);
  }

  addLetter(letter) {
    this.stage.addChild(letter);
  }

  addEvent() {
    createjs.Ticker.addEventListener("tick", this.tick);
    createjs.Ticker.setFPS(50);
    createjs.Ticker.setInterval(20);
  }

  tick(event) {
    this.letters_array.forEach( (letter) => {
      this.updateLetter(letter[0] ,event.time-letter[1]); });
    this.lifebar -= 1
    console.log(this.lifebar);
    this.stage.update(event);
  }

  letterPositions() {
    return this.letters_array.map(letter => [letter[0].x,letter[0].y]);
  }

  inCircle() {
    return this.letters_array.some(letter =>
      (letter[0].x < (innerWidth/2)+50 && letter[0].x > (innerWidth/2)-50) &&
      (letter[0].y < (innerHeight/2)+50 && letter[0].y  > (innerHeight/2)-50) &&
      letter[1] > 3000);
  }

}

let newGame = new Game;
newGame.first_level();
newGame.generateLetters();
newGame.addEvent();

setTimeout(() => newGame.stopLetters(), 10000 );


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  switch (keyInput) {
    case 'r':
    console.log(newGame.inCircle());
      if (newGame.inCircle()) {
        newGame.lifebar += 300;
    }
    default:
    console.log("not valid key");
  }
}
