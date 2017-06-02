## Typing Multitasker

### Background

![screen-page](docs/typing_multitasking.png)

Typing Multitasker is a typing game that utilizes rhythm, timing, and multi-tasking inspired by  **Gyroshi**.

Live Site: [Typing-Multitasker-App](www.slouch-app.com)


## Technology

Typing Multitasker utilizes the following:

- Vanilla JavaScript - For the game logic and event handlers.
- HTML5 Canvas & Easeljs - For creating animations, backgrounds, and rendering shapes.
- Webpack - To bundle up all the code and allow for import/export.
- Babel - For compiling javascript.
- yuki-createjs - To allow Easaljs to work with webpack bundler.

## Gameplay

![game-play](http://res.cloudinary.com/djrgebhxz/image/upload/v1496370380/547d2b366730d5c86136e46007c1cb6f_brqtup.gif)

Typing Multitasker is a single player game that is played three circles which rotate a pair of letters per circle. Once the letter reaches the top of the circle, the user will need to hit the correct key in order to raise their life bar. The game starts off with one circle of rotating letters, but as the game progresses other circles will  appear and rotating their own letters.

```javascript
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

```

## Features

![end-game](docs/end_game.png)

### Wireframe

![wireframes](docs/wireframe.png)

### Bonus features

- [ ] The input circle moves along the outer circle.
- [ ] The outer circles also start moving.
- [ ] Music for when certain combo lengths are reached.
