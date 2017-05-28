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
const lap_lines = newLapLines();
const flickering_circle = newFlickeringCircle();
const big_trailing_circle = new BigTrailingCircle;
const many_mini_circles = newManyMiniCircles();

function keyDownTextField(e) {
  const keyInput = e.key;

  switch (keyInput) {

    case 'a':
      const aInterval = setInterval(() => lap_lines.forEach(circle => circle.update()), 1);
      setTimeout( () => {
        clearInterval(aInterval);
        c.clearRect(0, 0, innerWidth, innerHeight);
        lap_lines.forEach(circle => {circle.reset();});
      }, 1500);
      break;

    case 's':
      const sInterval = setInterval(() => flickering_circle.forEach(circle => circle.update()), 1);
      setTimeout( () => {
        clearInterval(sInterval);
        c.clearRect(0, 0, innerWidth, innerHeight);
        flickering_circle.forEach(circle => {circle.reset();});
      }, 1500);
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
      const fInterval = setInterval(() => {
        c.clearRect(0, 0, innerWidth, innerHeight);
        many_mini_circles.forEach(circle => circle.update());
      }, 1);
      setTimeout( () => {
        clearInterval(fInterval);
        many_mini_circles.forEach(circle => {circle.reset();
        });
        c.clearRect(0, 0, innerWidth, innerHeight);
      }, 1500);
      break;
    case 'g':
      const gInterval = setInterval(() => {
        const lights_sign = new LightsSign;
        lights_sign.update()
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
