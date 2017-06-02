import 'yuki-createjs';
import { createCircle, outerCircle,
          lifeBar,
          lifeBarBorder,
          Timer,
          Combo,
          gameOver,
          createLetter,
          highScore,
          Awesome,
          Bad} from './objects';

class Game {
  constructor() {
      this.random_intervals = [1222, 1751, 2000];
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
      this.outerCircle2 = outerCircle(innerWidth/5,innerHeight/9);
      this.innerCircle2 = createCircle(innerWidth/5,innerHeight/9);
      this.outerCircle3 = outerCircle(innerWidth*(4/5),innerHeight/9);
      this.innerCircle3 = createCircle(innerWidth*(4/5),innerHeight/9);
      this.score = 0;
      this.startLifeCount = false;
  }

  otherCircles() {
    return [this.outerCircle2,this.innerCircle2,
      this.outerCircle3,this.innerCircle3];
  }

  levels() {
    return [this.levelTwo, this.levelThree, this.startLetters,
      this.second_stage, this.middle_stage,
      this.third_stage, this.startLifeCounter];
  }

  first_level() {
    [this.outerCircle,this.innerCircle,this.outerCircle2,this.innerCircle2,
     this.outerCircle3,this.innerCircle3, lifeBarBorder(), this.lifeBar]
     .forEach(circle => this.stage.addChild(circle));
    this.lifeBar.scaleY = 0;
    this.stage.update();
  }

  second_level() {
    this.stage.addChild(this.outerCircle2);
    this.stage.addChild(this.innerCircle2);
    document.getElementById('middle-glow-2').style.visibility = "visible";
    this.secondLetters = ["S","L"];
  }

  third_level() {
    this.stage.addChild(this.outerCircle3);
    this.stage.addChild(this.innerCircle3);
    document.getElementById('middle-glow-3').style.visibility = "visible";
    this.thirdLetters = ["A"];
  }

  addLevels() {
    this.startLifeCounter = setTimeout(()=> {
      this.startLifeCount = true;
    }, 7000);
    this.second_stage = setTimeout(()=> {
      this.frequency = 5;
      this.second_level();
      this.generateLevel2();
    }, 20000);
    this.middle_stage = setTimeout(()=> {
      this.frequency = 4;
    }, 40000);
    this.third_stage = setTimeout(()=> {
      this.third_level();
      this.generateLevel3();
    }, 60000);
  }

  updateLetter(letter,time, speed = [1,3]) {
    letter.x += Math.cos((Math.PI * speed[0]) * (time / 3000))*speed[1];
    letter.y += Math.sin((Math.PI * speed[0]) * (time / 3000))*speed[1];
    if (letter.y < 10 && letter.x > 10 && time > 6000) {
      this.stage.removeChild(letter);
      this.letters_array.shift();
      this.lifepoints -= 125;
      this.lifeBar.scaleY += .125;
      this.incorrectKeyAnimation(letter.children);
    }
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

  generateLevel2() {
    let start_time = 20000;
    this.levelTwo = setInterval(() => {
      start_time += this.random_intervals[1];
      if (Math.floor(Math.random()*this.frequency) < 3) {
        let letter = this.stage
          .addChild(createLetter(this.secondLetters[Math.floor(Math.random()*2)],
          innerWidth/5,innerHeight/8.7));
        this.letters_array.push({ letter, start_time});
      }
    }, this.random_intervals[1]);
  }

  generateLevel3() {
    let start_time = 60000;
    this.levelThree = setInterval(() => {
      start_time += this.random_intervals[2];
      if (Math.floor(Math.random()*this.frequency) < 3) {
        let letter = this.stage
          .addChild(createLetter(this.thirdLetters[0],
          innerWidth*(4/5),innerHeight/8.7));
        this.letters_array.push({ letter, start_time});
      }
    }, this.random_intervals[2]);
  }

  incorrectKeyAnimation(letter) {
    let bad = Bad(letter[1].x, letter[1].y);
    this.stage.addChild(bad);
    createjs.Tween.get(bad).to({alpha: 0},500);
    this.comboCount = 0;
    this.incorrectCircleAnimation(letter[1]);
  }

  correctKeyAnimation(letter) {
    let awesome = Awesome(letter.x, letter.y);
    this.stage.addChild(awesome);
    createjs.Tween.get(awesome).to({alpha: 0},500);
    this.correctCircleAnimation(letter);
  }

  incorrectCircleAnimation(letter) {
    switch (letter.text) {
      case 'S', 'L' :
        this.animateIncorrectCircle(this.outerCircle2, this.innerCircle2);
        break;
      case "A":
        this.animateIncorrectCircle(this.outerCircle3, this.innerCircle3);
      default:
        this.animateIncorrectCircle(this.outerCircle, this.innerCircle);
    }
  }

  correctCircleAnimation(letter) {
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    const audio3 = document.getElementById('audio3');
    this.pauseAudio([audio1,audio2,audio3]);
    switch (letter.text) {
      case 'S', 'L' :
        audio2.play();
        this.animateCircle(this.outerCircle2, this.innerCircle2);
        break;
      case "A":
        audio3.play();
        this.animateCircle(this.outerCircle3, this.innerCircle3);
        break;
      default:
        audio1.play();
        this.animateCircle(this.outerCircle, this.innerCircle);
    }
  }

  pauseAudio(audio_array) {
    audio_array.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  animateIncorrectCircle(bigCircle, smallCircle) {
    smallCircle.alpha = 0.6;
    bigCircle.alpha = 0.6;
    bigCircle.scaleX = 0.9;
    bigCircle.scaleY = 0.9;
    createjs.Tween.get(smallCircle).to({alpha: 1},1000);
    createjs.Tween.get(bigCircle).to({alpha: 1,scaleX: 1, scaleY:1},700);
  }

  animateCircle(bigCircle, smallCircle) {
    bigCircle.scaleX = 1.1;
    bigCircle.scaleY = 1.1;
    smallCircle.scaleX = 1.15;
    smallCircle.scaleY = 1.15;
    createjs.Tween.get(smallCircle).to({alpha: 1, scaleX: 1, scaleY: 1},700);
    createjs.Tween.get(bigCircle).to({alpha: 1, scaleX: 1, scaleY: 1},700);
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
    const background = document.getElementById('background');
    background.style.filter = `brightness(${this.comboCount*1.5}%)`;
  }

  updateLife() {
    if (this.startLifeCount) {
      this.lifepoints -= 1;
      this.lifeBar.scaleY += 0.001;
    }
  }

  updateCounter() {
    this.Timer.text = `Timer: ${Math.round((this.eventTime-this.pauseTime)/1000)}`;
    this.Combo.text = `Combo: ${this.comboCount}  Score: ${this.score}`;
  }

  endGame() {
    this.stage.addChild(gameOver());
    this.stage.addChild(highScore(`HIGH SCORE: ${this.score}`));
    this.stage.update();
    this.hideOptions();
    this.clear_intervals();
  }

  tick(event) {
    this.letters_array.forEach( (obj) => {
      this.updateLetter(obj.letter,event.runTime-this.pauseTime-obj.start_time); });
    this.updateLife();
    this.updateCounter();
    this.eventTime = event.runTime;
    this.updateBackground()
    if (this.lifepoints>1) {
      this.stage.update(event);
    } else {
      this.pauseTime = event.runTime;
      createjs.Ticker.paused = true;
      event.remove();
      this.endGame();
    }
  }

  hideOptions() {
    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('instructions').style.visibility = 'visible';
    document.getElementById('combo-glow').style.visibility = 'hidden';
    document.getElementById('navFooter').style.visibility = "visible";
    document.getElementById('createdBy').style.visibility = "visible";
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
    this.levels().forEach(level => clearInterval(level));
  }

  restart() {
    this.stage.removeAllChildren();
    this.letters_array = [];
    this.counter = 0;
    this.tick = this.tick.bind(this);
    this.lifepoints = 1000;
    this.eventTime = 0;
    this.comboCount = 0;
    this.score = 0;
    this.innerCircle = createCircle();
    this.outerCircle = outerCircle();
    this.outerCircle2 = outerCircle(innerWidth/5,innerHeight/9);
    this.innerCircle2 = createCircle(innerWidth/5,innerHeight/9);
    this.outerCircle3 = outerCircle(innerWidth*(4/5),innerHeight/9);
    this.innerCircle3 = createCircle(innerWidth*(4/5),innerHeight/9);
    this.startLifeCount = false;
  }

  letterPositions() {
    return this.letters_array.map(obj => [obj.letter.children[1].x,obj.letter.children[1].y]);
  }

  inCircle(letter) {
    return this.letters_array.some(obj =>
      ( obj.letter.y < 5 &&
      this.eventTime-this.pauseTime - obj.start_time > 5000 && obj.letter.children[1].text === letter));
  }

  removeCircles() {
    document.getElementById('middle-glow-2').style.visibility = "hidden";
    document.getElementById('middle-glow-3').style.visibility = "hidden";
    this.otherCircles().forEach(circle => this.stage.removeChild(circle));
  }

  stopLetters() {
    clearInterval(this.startLetters);
  }
}

export default Game;
