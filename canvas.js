const canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

import Game from './src/game';
import { glow, hideVisibility } from './src/background_glow';

glow();
const newGame = new Game;
newGame.first_level();

start.addEventListener('click', ()=>{
  if (newGame.gameOver()) {
    newGame.restart();
    newGame.first_level();
  }
  newGame.generateLetters();
  newGame.addEvent();
  newGame.removeCircles();
  hideVisibility();
});

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  const keyInput = e.key;
  if (newGame.inCircle(keyInput.toUpperCase())) {
      newGame.removeLetter();
      newGame.comboCount += 1;
      newGame.score += 1;
      newGame.increase_lifepoints();
  } else {
    newGame.lifeBar.scaleY += 0.04;
    newGame.lifepoints -= 40;
    newGame.comboCount = 0;
  }
}
