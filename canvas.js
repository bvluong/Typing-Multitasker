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
import { glow, hideVisibility } from './animation/background_glow';

var canvas = document.getElementById('root');
var background = document.getElementById('background');
glow();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

let count = 0;


class Game {
  constructor() {
      this.random_intervals = [1222, 2700, 3333];
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
      this.score = 0;
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
    this.outerCircle2 = outerCircle(innerWidth/5,innerHeight/9);
    this.stage.addChild(this.outerCircle2);
    this.innerCircle2 = createCircle(innerWidth/5,innerHeight/9);
    this.stage.addChild(this.innerCircle2);
    document.getElementById('middle-glow-2').style.visibility = "visible";
    this.secondLetters = ["S","L"];
  }

  third_level() {
    this.stage.addChild(outerCircle(innerWidth*(4/5),innerHeight/9));
    this.stage.addChild(createCircle(innerWidth*(4/5),innerHeight/9));
    document.getElementById('middle-glow-3').style.visibility = "visible";
    this.thirdLetters = ["A"];
  }

  generateLevel2() {
    let start_time = 20000;
    this.levelTwo = setInterval(() => {
      start_time += this.random_intervals[1];
      let letter = this.stage
        .addChild(createLetter(this.secondLetters[Math.floor(Math.random()*2)],
        innerWidth/5,innerHeight/8.7));
      this.letters_array.push({ letter, start_time});
    }, this.random_intervals[1]);
  }

  generateLevel3() {
    let start_time = 60000;
    this.levelThree = setInterval(() => {
      start_time += this.random_intervals[2];
      let letter = this.stage
        .addChild(createLetter(this.thirdLetters[0],
        innerWidth*(4/5),innerHeight/8.7));
      this.letters_array.push({ letter, start_time});
    }, this.random_intervals[2]);
  }

  generateLetters() {
    this.start_time = 0;
    this.addLevels();
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

  addLevels() {
    this.second_stage = setTimeout(()=> {
      this.frequency = 5;
      this.second_level();
      this.generateLevel2();
    }, 20000);
    this.middle_stage = setTimeout(()=> {
      this.frequency = 4;
    }, 40000);
    this.third_stage = setTimeout(()=> {
      this.frequency = 5;
      this.third_level();
      this.generateLevel3();
    }, 60000);
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

    let audio = document.getElementById(
      ['audio1','audio2','audio3','audio4'][Math.floor(Math.random() * 4)]);
    audio.play();
    let awesome = Awesome(letter.x, letter.y);
    this.stage.addChild(awesome);
    createjs.Tween.get(awesome).to({alpha: 0},500);
    this.correctCircleAnimation(letter);
  }

  correctCircleAnimation(letter) {
    switch (letter.text) {
      case 'S', 'L' :
        this.outerCircle2.scaleX = 1.1;
        this.outerCircle2.scaleY = 1.1;
        this.innerCircle2.scaleX = 1.15;
        this.innerCircle2.scaleY = 1.15;
        createjs.Tween.get(this.innerCircle2).to({alpha: 1, scaleX: 1, scaleY: 1},700);
        createjs.Tween.get(this.outerCircle2).to({alpha: 1, scaleX: 1, scaleY: 1},700);
        break;
      default:
        this.outerCircle.scaleX = 1.1;
        this.outerCircle.scaleY = 1.1;
        this.innerCircle.scaleX = 1.15;
        this.innerCircle.scaleY = 1.15;
        createjs.Tween.get(this.innerCircle).to({alpha: 1, scaleX: 1, scaleY: 1},700);
        createjs.Tween.get(this.outerCircle).to({alpha: 1, scaleX: 1, scaleY: 1},700);
    }
  }

  incorrectKeyAnimation(letter) {
    let bad = Bad(letter[1].x, letter[1].y);
    this.stage.addChild(bad);
    createjs.Tween.get(bad).to({alpha: 0},500);
    this.comboCount = 0;
    this.innerCircle.alpha = 0.6;
    this.outerCircle.alpha = 0.6;
    this.outerCircle.scaleX = 0.9;
    this.outerCircle.scaleY = 0.9;
    createjs.Tween.get(this.innerCircle).to({alpha: 1},1000);
    createjs.Tween.get(this.outerCircle).to({alpha: 1,scaleX: 1, scaleY:1},700);
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
    background.style.filter = `brightness(${this.comboCount*2}%)`;
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
      document.getElementById('combo-glow').style.visibility = 'hidden';
    }
  }

  increase_lifepoints() {
    if (this.lifepoints<=800) {
      this.lifepoints += 100;
      this.lifeBar.scaleY -= .1;
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
    clearInterval(this.middle_stage);
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


let newGame = new Game;
newGame.first_level();


start.addEventListener('click', ()=>{
  if (newGame.gameOver()) {
    newGame.restart();
    newGame.first_level();
    newGame.generateLetters();
    newGame.addEvent();
    hideVisibility();
  } else {
    newGame.generateLetters();
    newGame.addEvent();
    hideVisibility();
  }
}
);


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  if (newGame.inCircle(keyInput.toUpperCase())) {
      console.log(keyInput);
      newGame.removeLetter();
      newGame.comboCount += 1;
      newGame.increase_lifepoints();
  } else {
    newGame.lifeBar.scaleY += 0.04;
    newGame.lifepoints -= 40;
    newGame.comboCount = 0;
  }
}

// Find browser game, update css.
// Add high score.
// Update the sounds, one for each circle.
// Add easy medium hard level
