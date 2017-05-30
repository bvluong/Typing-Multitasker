import 'yuki-createjs';

export const createCircle = () => {
  var inputCircle = new createjs.Shape();
  inputCircle.graphics.beginStroke("DeepSkyBlue")
  .drawCircle(0, 0, (innerWidth + innerHeight)/32);
  inputCircle.x = innerWidth/2;
  inputCircle.y = innerHeight/2;
  return inputCircle;
};

export const createLetter = (letter = 'r') => {
  let object = new createjs.Text(letter, "20px Arial", "#ff7700");
  object.x = innerWidth/2-5;
  object.y = innerHeight/2-20;
  return object;
};

export const outerCircle = (x= innerWidth/2, y=innerHeight/2) => {
  var outercircle = new createjs.Shape();
  outercircle.graphics.beginStroke("DeepSkyBlue")
    .drawCircle(0, 0, (innerWidth + innerHeight)/12);
  outercircle.x = x;
  outercircle.y = y+(innerWidth + innerHeight)/12;
  return outercircle;
};

export const lifeBar = () => {
  var lifebar = new createjs.Shape();
  lifebar.graphics.beginFill("red")
    .drawRect(0, 0, 80, 200);
  lifebar.x = innerWidth/16;
  lifebar.y = innerHeight/1.7;
  return lifebar;
};

export const lifeBarBorder = () => {
  var lifebar = new createjs.Shape();
  lifebar.graphics.beginStroke("black")
    .drawRect(0, 0, 80, 200);
  lifebar.x = innerWidth/16;
  lifebar.y = innerHeight/1.7;
  return lifebar;
};
