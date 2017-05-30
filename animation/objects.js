import 'yuki-createjs';

export const createCircle = () => {
  var inputCircle = new createjs.Shape();
  inputCircle.graphics.beginStroke("DeepSkyBlue").drawCircle(0, 0, 40);
  inputCircle.x = innerWidth/2;
  inputCircle.y = innerHeight/2;
  return inputCircle;
};

export const createletterR = () => {
  let object = new createjs.Text("r", "20px Arial", "#ff7700");
  object.x = innerWidth/2;
  object.y = innerHeight/2;
  return object;
};
