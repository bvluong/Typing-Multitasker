import 'yuki-createjs';

export const createCircle = (x=innerWidth/2,y=innerHeight/2) => {
  var inputCircle = new createjs.Shape();
  inputCircle.graphics.setStrokeStyle(10,"round").beginFill("#228DFF").beginStroke("white")
  .drawCircle(0, 0, 30);
  inputCircle.x = x;
  inputCircle.y = y;
  return inputCircle;
};

function randomColor() {
  return 'rgb(0,' + Math.floor(255 - 42.5 * (Math.random()*6)) + ',' + Math.floor(255 - 42.5 * (Math.random()*6)) + ')'
}

export const createLetter = (letter = 'r', x= innerWidth/2, y= innerHeight/2) => {
  let object = new createjs.Text(letter, "30px Roboto", "white");
  object.x = x-10;
  object.y = y-17;
  var inputCircle = new createjs.Shape();
  inputCircle.graphics.setStrokeStyle(3,"round").beginFill("black").beginRadialGradientStroke(
    [randomColor(), 'white'], [0, 1], 100, 100, 0, 100, 100, 300)
  .drawCircle(0, 0, 20);
  inputCircle.x = x;
  inputCircle.y = y;

  var button1 = new createjs.Container();
  button1.addChild(inputCircle, object);
  return button1;
};

export const outerCircle = (x= innerWidth/2, y=innerHeight/2) => {
  var outercircle = new createjs.Shape();
  outercircle.graphics.setStrokeStyle(10,"round").beginRadialGradientStroke(["#1b3366","#95e9f9"], [0, 1], 100, 100, 0, 100, 100, 600)
    .drawCircle(0, 0, 130);
  outercircle.x = x;
  outercircle.y = y+130;
  return outercircle;
};

export const lifeBar = () => {
  var lifebar = new createjs.Shape();
  lifebar.graphics.beginFill("black")
    .drawRect(0, 0, 80, 200);
  lifebar.x = innerWidth/16;
  lifebar.y = innerHeight/1.7;
  return lifebar;
};

export const lifeBarBorder = () => {
  var lifebar = new createjs.Shape();
  lifebar.graphics.setStrokeStyle(1).beginStroke("#ff2511")
  .beginLinearGradientFill(["#f75221","#ff2511"], [0, 1], 0, 20, 0, 120)
    .drawRect(0, 0, 80, 200);
  lifebar.x = innerWidth/16;
  lifebar.y = innerHeight/1.7;
  return lifebar;
};

export const Timer = () => {
  let object = new createjs.Text('Timer', "30px Roboto", "#49fcf3");
  object.x = innerWidth/2.2;
  object.y = 10;
  return object;
};

export const Combo = () => {
  let object = new createjs.Text('Combo', "30px Iceland", "#49fcf3");
  object.x = 10;
  object.y = 10;
  return object;
};

export const gameOver = () => {
  let object = new createjs.Text('GAME OVER', "50px Iceland", "white");
  object.x = innerWidth/2 - 120;
  object.y = 50;
  return object;
};
export const highScore = (text) => {
  let object = new createjs.Text(text, "60px Iceland", "white");
  object.x = innerWidth/2 - 200;
  object.y = 100;
  return object;
};

export const Awesome = (x,y) => {
  let object = new createjs.Text('Awesome!', "20px Iceland", "grey");
  object.x = x/1.05;
  object.y = y/1.2;
  return object;
};

export const Bad = (x,y) => {
  let object = new createjs.Text('Bad!', "20px Iceland", "grey");
  object.x = x/1.05;
  object.y = y/1.2;
  return object;
}
