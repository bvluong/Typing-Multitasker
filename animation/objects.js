import 'yuki-createjs';

export const createCircle = () => {
  var inputCircle = new createjs.Shape();
  inputCircle.graphics.setStrokeStyle(10,"round").beginFill("#F87060").beginStroke("#F1F0CC")
  .drawCircle(0, 0, 30);
  inputCircle.x = innerWidth/2;
  inputCircle.y = innerHeight/2;
  return inputCircle;
};

export const createLetter = (letter = 'r') => {
  let object = new createjs.Text(letter, "30px Roboto", "#102542");
  object.x = innerWidth/2-10;
  object.y = innerHeight/2-17;
  var inputCircle = new createjs.Shape();
  inputCircle.graphics.setStrokeStyle(3,"round").beginStroke("black")
  .drawCircle(0, 0, 20);
  inputCircle.x = innerWidth/2
  inputCircle.y = innerHeight/2

  var button1 = new createjs.Container();
  button1.addChild(inputCircle, object);
  return button1;
};

export const outerCircle = (x= innerWidth/2, y=innerHeight/2) => {
  var outercircle = new createjs.Shape();
  outercircle.graphics.setStrokeStyle(10,"round").beginStroke("#F1F0CC")
    .drawCircle(0, 0, 130);
  outercircle.x = x;
  outercircle.y = y+130;
  return outercircle;
};

export const lifeBar = () => {
  var lifebar = new createjs.Shape();
  lifebar.graphics.beginFill("#B6CCA1")
    .drawRect(0, 0, 80, 200);
  lifebar.x = innerWidth/16;
  lifebar.y = innerHeight/1.7;
  return lifebar;
};

export const lifeBarBorder = () => {
  var lifebar = new createjs.Shape();
  lifebar.graphics.setStrokeStyle(5).beginFill("#F87060").beginStroke("black")
    .drawRect(0, 0, 80, 200);
  lifebar.x = innerWidth/16;
  lifebar.y = innerHeight/1.7;
  return lifebar;
};

export const Timer = () => {
  let object = new createjs.Text('Timer', "30px Roboto", "#102542");
  object.x = innerWidth/2.2;
  object.y = 10;
  return object;
};

export const Combo = () => {
  let object = new createjs.Text('Combo', "30px Roboto", "#102542");
  object.x = 10;
  object.y = 10;
  return object;
};
