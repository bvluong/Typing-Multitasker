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
const big_trailing_circle = new BigTrailingCircle;

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
      const dInterval = setInterval(() => {
        big_trailing_circle.update();
      }, 50);
      setTimeout( () => {
        clearInterval(dInterval);
        big_trailing_circle.reset();
        c.clearRect(0, 0, innerWidth, innerHeight);
      }, 2000);
      break;

    case 'f':
      const many_mini_circles = newManyMiniCircles();
      MovingArray( {
        array:many_mini_circles,
        clear:true
      });
      break;
    case 'g':
      const gInterval = setInterval(() => {
        const lights_sign = new LightsSign;
        lights_sign.update();
      }, 4);
      setTimeout( () => {
        clearInterval(gInterval);
        c.clearRect(0, 0, innerWidth, innerHeight);
      }, 2000);
      break;
    default:
    console.log("not valid key");
  }
}
