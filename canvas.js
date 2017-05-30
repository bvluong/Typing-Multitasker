import 'yuki-createjs';
import { createCircle, outerCircle,
          lifeBar,
          lifeBarBorder,
          createletterR } from './animation/objects';


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
      this.lifepoints = 1000;
      this.lifeBar = lifeBar();

  }

  first_level() {
    this.stage.addChild(createCircle());
    this.stage.addChild(outerCircle());
    this.stage.addChild(lifeBarBorder());
    this.stage.addChild(this.lifeBar);
    this.stage.update();
  }

  generateLetters() {
    let start_time = 0;
    this.startLetters = setInterval(() => {
      start_time += this.random_intervals[this.counter];
      let letter = this.stage.addChild(createletterR());
      this.letters_array.push({ letter, start_time });
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
      this.letters_array.shift();
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
    this.letters_array.forEach( (obj) => {
      this.updateLetter(obj.letter ,event.time-obj.start_time); });
    this.lifepoints -= 1;
    this.lifeBar.scaleY -= 0.001;
    if (this.lifepoints>1) {
      this.stage.update(event);
    } else {
      event.remove();
      console.log("Game Over");

    }
  }

  letterPositions() {
    return this.letters_array.map(obj => [obj.letter.x,obj.letter.y]);
  }

  inCircle() {
    return this.letters_array.some(obj =>
      (obj.letter.x < (innerWidth/2)+50 && obj.letter.x > (innerWidth/2)-50) &&
      (obj.letter.y < (innerHeight/2)+50 && obj.letter.y  > (innerHeight/2)-50) &&
      obj.start_time > 3000);
  }

}

let newGame = new Game;
newGame.first_level();
newGame.generateLetters();
newGame.addEvent();


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  switch (keyInput) {
    case 'r':
    console.log(newGame.inCircle());
      if (newGame.inCircle()) {
        newGame.lifepoints += 300;
        newGame.lifeBar.scaleY += .3;
    }
    default:
    console.log("not valid key");
  }
}
