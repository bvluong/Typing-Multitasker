import 'yuki-createjs';
import { createCircle, outerCircle,
          lifeBar,
          lifeBarBorder,
          createLetter } from './animation/objects';


var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "#B6CCA1";
var c = canvas.getContext('2d');

let count = 0;


class Game {
  constructor() {
      this.random_intervals = [1111, 1500, 2000, 6000, 3000];
      this.stage = new createjs.Stage("root");
      this.letters_array = [];
      this.counter = 0;
      this.tick = this.tick.bind(this);
      this.lifepoints = 1000;
      this.lifeBar = lifeBar();
      this.firstLetters = ['F','J'];
      this.eventTime = 0;
      this.pauseTime = 0;

  }

  first_level() {
    this.stage.addChild(outerCircle());
    this.stage.addChild(createCircle());
    this.stage.addChild(lifeBarBorder());
    this.stage.addChild(this.lifeBar);
    this.lifeBar.scaleY = 0;
    this.stage.update();

    // this.background = setInterval( () => {
    //   canvas.style.background = ["#F5E0B7", "#8B635C", "#C1DBB3", "#F5E0B7"][count%4];
    //   canvas.style.transition = "2s";
    //   count += 0;
    // }, 10000);
  }

  increase_lifepoints() {
    if (this.lifepoints<=800) {
      this.lifepoints += 200;
      this.lifeBar.scaleY -= .2;
    } else if (this.lifepoints> 800) {
      this.lifepoints = 1000;
      this.lifeBar.scaleY = 0;
    }
  }

  generateLetters() {
    let start_time = 0;
    this.startLetters = setInterval(() => {
      start_time += this.random_intervals[this.counter];
      let letter = this.stage
        .addChild(createLetter(this.firstLetters[Math.floor(Math.random()+0.5)] ));
      this.letters_array.push({ letter, start_time });
    }, this.random_intervals[this.counter]);
  }

  stopLetters() {
    clearInterval(this.startLetters);
  }

  updateLetter(letter,time) {
    letter.x += Math.cos( ((Math.PI*2) /2) * (time / 3000))*3;
    letter.y += Math.sin( ((Math.PI*2) /2) * (time / 3000))*3;
    if (letter.children[1].x + letter.x >= (innerWidth/2)+20 && time > 3000) {
      this.stage.removeChild(letter);
      this.letters_array.shift();
    }
  }

  removeLetter() {
    this.stage.removeChild(this.letters_array[0].letter);
    this.letters_array.shift();
  }

  addLetter(letter) {
    this.stage.addChild(letter);
  }

  addEvent() {
    createjs.Ticker.addEventListener('tick',this.tick);
    createjs.Ticker.setFPS(50);
    createjs.Ticker.setInterval(20);
    createjs.Ticker.paused = false;
  }

  gameOver() {
    return this.lifepoints <= 1;
  }

  tick(event) {
    this.letters_array.forEach( (obj) => {
      this.updateLetter(obj.letter,event.runTime-this.pauseTime-obj.start_time); });
    this.lifepoints -= 1;
    this.lifeBar.scaleY += 0.001;
    this.eventTime = event.runTime;
    if (this.lifepoints>1) {
      this.stage.update(event);
    } else {
      this.pauseTime = event.runTime;
      createjs.Ticker.paused = true;
      createjs.Ticker.removeAllEventListeners();
      // clearInterval(this.background);
      console.log("Game Over");
      clearInterval(this.startLetters);
      document.getElementById('start').style.visibility = 'visible';
      document.getElementById('instructions').style.visibility = 'visible';
    }
    }

  restart() {
    this.stage = new createjs.Stage("root");
    this.letters_array = [];
    this.counter = 0;
    createjs.Ticker.removeAllEventListeners();
    this.tick = this.tick.bind(this);
    this.lifepoints = 1000;
    this.eventTime = 0;
  }

  letterPositions() {
    return this.letters_array.map(obj => [obj.letter.children[1].x,obj.letter.children[1].y]);
  }

  inCircle(letter) {
    return this.letters_array.some(obj =>
      ( obj.letter.y < 5 &&
      this.eventTime-this.pauseTime - obj.start_time > 3000 && obj.letter.children[1].text === letter));
  }

}

const start = document.getElementById('start');
const instructions = document.getElementById('instructions');
let newGame = new Game;
newGame.first_level();

start.addEventListener('click', ()=>{
  if (newGame.gameOver()) {
    newGame.restart();
    newGame.first_level();
    newGame.generateLetters();
    newGame.addEvent();
    start.style.visibility = "hidden";
    instructions.style.visibility = "hidden";

  } else {
    newGame.generateLetters();
    newGame.addEvent();
    start.innerHTML = 'Restart';
    start.style.visibility = "hidden";
    instructions.style.visibility = "hidden";
  }

  }
);

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  var paused = !createjs.Ticker.getPaused();
  if (newGame.inCircle(keyInput.toUpperCase())) {
      newGame.removeLetter();
      newGame.increase_lifepoints();
  } else {
    newGame.lifeBar.scaleY += 0.1;
    newGame.lifepoints -= 100;
    console.log(newGame.lifepoints);
  }

  }
