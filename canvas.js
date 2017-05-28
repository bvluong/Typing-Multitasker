import newLapLines from './animations/overlapping_lines.js';
import newFlickeringCircle from './animations/flickering_circle.js';
import BigTrailingCircle from './animations/big_trailing_circle';
import newManyMiniCircles from './animations/many_mini_circles';
import LightsSign from './animations/lights_sign';


var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


document.addEventListener("keydown", keyDownTextField, false);



function MovingArray(options) {
  const defaultOptions = {
    length: 1500,
    interval: 1,
    clear: false
  };
  options = Object.assign(defaultOptions,options);

  const runFunc = setInterval(() => {
    if (options.clear) {
      c.clearRect(0, 0, innerWidth, innerHeight);
      }
    options.array.forEach(obj => obj.update());
  }, options.interval);
  setTimeout( () => {
    clearInterval(runFunc);
    c.clearRect(0, 0, innerWidth, innerHeight);
    options.array.forEach(obj => obj.reset());
  }, options.length);
}

function MovingObject(options) {
  const defaultOptions = {
    length: 2000,
    interval: 50,
  };
  options = Object.assign(defaultOptions,options);
  const runFunc = setInterval(() => {
    options.object.update();
  }, options.interval);
  setTimeout( () => {
    clearInterval(runFunc);
    options.object.reset();
    c.clearRect(0, 0, innerWidth, innerHeight);
  }, options.length);
}

function FlashingWord(options) {
  const defaultOptions = {
    length: 2000,
    interval: 10,
  };
  options = Object.assign(defaultOptions,options);
  const runFunc = setInterval(() => {
    const object = new options.class;
    object.update();
  }, options.interval);
  setTimeout( () => {
    clearInterval(runFunc);
    c.clearRect(0, 0, innerWidth, innerHeight);
  }, options.length);
}

function keyDownTextField(e) {
  const keyInput = e.key;

  switch (keyInput) {

    case 'a':
      const lap_lines = newLapLines();
      MovingArray( {array: lap_lines} );
      break;

    case 's':
      const flickering_circle = newFlickeringCircle();
      MovingArray( { array: flickering_circle });
      break;

    case 'd':
      const big_trailing_circle = new BigTrailingCircle;
      MovingObject( { object: big_trailing_circle } );
      break;

    case 'f':
      const many_mini_circles = newManyMiniCircles();
      MovingArray( { array:many_mini_circles, clear:true });
      break;
      
    case 'g':
      FlashingWord({ class: LightsSign } );
      break;

    default:
    console.log("not valid key");
  }
}
