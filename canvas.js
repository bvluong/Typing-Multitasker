import 'yuki-createjs';
import { createCircle, outerCircle,
          lifeBar,
          lifeBarBorder,
          Timer,
          Combo,
          gameOver,
          createLetter,
          Awesome,
          Bad} from './animation/objects';


var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "black";
var c = canvas.getContext('2d');

let count = 0;


class Game {
  constructor() {
      this.random_intervals = [1222, 2700, 4333];
      this.stage = new createjs.Stage("root");
      this.letters_array = [];
      this.tick = this.tick.bind(this);
      this.lifepoints = 1000;
      this.lifeBar = lifeBar();
      this.firstLetters = ['F','J','D','K'];
      this.eventTime = 0;
      this.pauseTime = 0;
      this.Timer = Timer();
      this.comboCount = 0;
      this.Combo = Combo();
      this.frequency = 4;
      this.innerCircle = createCircle();
      this.outerCircle = outerCircle();
  }

  first_level() {
    this.stage.addChild(this.outerCircle);
    this.stage.addChild(this.innerCircle);
    this.stage.addChild(lifeBarBorder());
    this.stage.addChild(this.lifeBar);
    this.lifeBar.scaleY = 0;
    this.stage.update();
  }

  second_level() {
    this.stage.addChild(outerCircle(innerWidth/5,innerHeight/9));
    this.stage.addChild(createCircle(innerWidth/5,innerHeight/9));
    this.secondLetters = ["S","L"];
  }

  third_level() {
    this.stage.addChild(outerCircle(innerWidth*(4/5),innerHeight/9));
    this.stage.addChild(createCircle(innerWidth*(4/5),innerHeight/9));
    this.thirdLetters = ["A"];
  }

  generateLevel2() {
    let start_time = 30000;
    this.levelTwo = setInterval(() => {
      start_time += this.random_intervals[1];
      let letter = this.stage
        .addChild(createLetter(this.secondLetters[Math.floor(Math.random()*2)],
        innerWidth/5,innerHeight/8));
      this.letters_array.push({ letter, start_time});
    }, this.random_intervals[1]);
  }

  generateLevel3() {
    let start_time = 60000;
    this.levelThree = setInterval(() => {
      start_time += this.random_intervals[2];
      let letter = this.stage
        .addChild(createLetter(this.thirdLetters[0],
        innerWidth*(4/5),innerHeight/8));
      this.letters_array.push({ letter, start_time});
    }, this.random_intervals[2]);
  }

  generateLetters() {
    this.start_time = 0;
    this.second_stage = setTimeout(()=> {
      this.frequency = 6;
      this.second_level();
      this.generateLevel2();
    }, 30000);
    this.third_stage = setTimeout(()=> {
      this.frequency = 8;
      this.third_level();
      this.generateLevel3();
    }, 60000);

    this.stage.addChild(this.Timer);
    this.stage.addChild(this.Combo);
    this.startLetters = setInterval(() => {
      this.start_time += this.random_intervals[0];
      if (Math.floor(Math.random()*this.frequency) < 4) {
        let letter = this.stage
          .addChild(createLetter(this.firstLetters[Math.floor(Math.random()*4)] ));
        this.letters_array.push({ letter, start_time: this.start_time });
      }
    }, this.random_intervals[0]);
  }


  stopLetters() {
    clearInterval(this.startLetters);
  }

  updateLetter(letter,time, speed = [2,3]) {
    letter.x += Math.cos( ((Math.PI*2) /speed[0]) * (time / 3000))*speed[1];
    letter.y += Math.sin( ((Math.PI*2) /speed[0]) * (time / 3000))*speed[1];
    if (letter.y < 10 && letter.x > 10 && time > 6000) {
      this.stage.removeChild(letter);
      this.letters_array.shift();
      this.lifepoints -= 125;
      this.lifeBar.scaleY += .125;

      this.incorrectKeyAnimation(letter.children);
    }
  }


  correctKeyAnimation(letter) {
    let audio = document.getElementById('audio');
    audio.play();
    let awesome = Awesome(letter.x, letter.y);
    this.stage.addChild(awesome);
    createjs.Tween.get(awesome).to({alpha: 0},500);
    this.innerCircle.alpha = 1;
    this.outerCircle.alpha = 1;
    this.innerCircle.scaleX = 1.1;
    this.innerCircle.scaleY = 1.1;
    createjs.Tween.get(this.innerCircle).to({alpha: 1.2, scaleX: 1, scaleY: 1},700);
    createjs.Tween.get(this.outerCircle).to({alpha: 1.2},700);
  }

  incorrectKeyAnimation(letter) {
    let bad = Bad(letter[1].x, letter[1].y);
    this.stage.addChild(bad);
    createjs.Tween.get(bad).to({alpha: 0},500);
    this.comboCount = 0;
    this.innerCircle.alpha = 0.7;
    this.outerCircle.alpha = 0.7
    createjs.Tween.get(this.innerCircle).to({alpha: 1},700);
    createjs.Tween.get(this.outerCircle).to({alpha: 1},700);
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

  updateBackground() {
    if (this.comboCount > 10) {
      canvas.style.background = "#0d0d0d";
    } else if (this.comboCount > 20) {
      canvas.style.background = "#1a1a1a";
    } else if (this.comboCount > 30) {
      canvas.style.background = "#262626";
    } else if (this.comboCount > 40) {
      canvas.style.background = "#333333";
    } else if (this.comboCount > 50) {
      canvas.style.background = "#404040";
    } else {
      canvas.style.background = "black";
    }
  }

  tick(event) {
    this.letters_array.forEach( (obj) => {
      this.updateLetter(obj.letter,event.runTime-this.pauseTime-obj.start_time); });
    this.lifepoints -= 1;
    this.lifeBar.scaleY += 0.001;
    this.eventTime = event.runTime;
    this.Timer.text = `Timer: ${Math.round((this.eventTime-this.pauseTime)/1000)}`;
    this.Combo.text = `Combo ${this.comboCount}`;

    this.updateBackground()

    if (this.lifepoints>1) {
      this.stage.update(event);
    } else {
      this.pauseTime = event.runTime;
      createjs.Ticker.paused = true;
      createjs.Ticker.removeAllEventListeners();
      this.stage.addChild(gameOver());
      this.stage.update();

      this.clear_intervals();
      document.getElementById('start').style.visibility = 'visible';
      document.getElementById('instructions').style.visibility = 'visible';
    }
  }

  increase_lifepoints() {
    if (this.lifepoints<=800) {
      this.lifepoints += 125;
      this.lifeBar.scaleY -= .125;
    } else if (this.lifepoints> 800) {
      this.lifepoints = 1000;
      this.lifeBar.scaleY = 0;
    }
  }

  removeLetter() {
    this.correctKeyAnimation(this.letters_array[0].letter.children[1]);
    this.stage.removeChild(this.letters_array[0].letter);
    this.letters_array.shift();
  }

  gameOver() {
    return this.lifepoints <= 1;
  }

  clear_intervals() {
    clearInterval(this.levelTwo);
    clearInterval(this.levelThree);
    clearInterval(this.startLetters);
    clearInterval(this.second_stage);
    clearInterval(this.third_stage);
  }

  restart() {
    this.stage = new createjs.Stage("root");
    this.letters_array = [];
    this.counter = 0;
    createjs.Ticker.removeAllEventListeners();
    this.tick = this.tick.bind(this);
    this.lifepoints = 1000;
    this.eventTime = 0;
    this.comboCount = 0;
  }

  letterPositions() {
    return this.letters_array.map(obj => [obj.letter.children[1].x,obj.letter.children[1].y]);
  }

  inCircle(letter) {
    return this.letters_array.some(obj =>
      ( obj.letter.y < 5 &&
      this.eventTime-this.pauseTime - obj.start_time > 5000 && obj.letter.children[1].text === letter));
  }
}

const start = document.getElementById('start');
const instructions = document.getElementById('instructions');
const logo = document.getElementById('logo');
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
    logo.style.visibility = "hidden";
  } else {
    newGame.generateLetters();
    newGame.addEvent();
    start.innerHTML = 'Restart';
    start.style.visibility = "hidden";
    instructions.style.visibility = "hidden";
    logo.style.visibility = "hidden";
  }
}
);

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  if (newGame.inCircle(keyInput.toUpperCase())) {
      newGame.removeLetter();
      newGame.comboCount += 1;
      newGame.increase_lifepoints();
  } else {
    newGame.lifeBar.scaleY += 0.05;
    newGame.lifepoints -= 50;
    newGame.comboCount = 0;
  }
}
