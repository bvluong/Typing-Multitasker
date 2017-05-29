## Typing Multitasker

### Background

Typing Multitasker is a typing game that utilizes rhythm, timing, and multi-tasking inspired by  **Gyroshi**. Typing MultiTasker is a 1-player game that plays out on three circles that rotate with letters. Once the letter reaches the top of the circle, the user will need to hit the correct key in order to raise their life bar. The game starts off with one circle of rotating letters, but as the game progresses other circles will  appear and rotating their own letters.

### Functionality & MVP  

- [ ] Click on Letter inside circle and obtain feedback(sound/animation) if hit correctly.
- [ ] Letters will rotate inside the circle and disappear after one rotation.
- [ ] A combo meter to show how many letters that are hit in a row.
- [ ] Life bar that will end the game if a certain number of incorrect keys are hit.
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and the About modal.  Game controls will include any letter on the keyboard.
![wireframes](docs/wireframe.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript and jQuery
- HTML5 Canvas
- Webpack
- Babel
- Easel?

In addition to the webpack entry file, there will be three scripts involved in this project:

`canvas.js`: this script will handle the logic

`circle.js`: will generate the circle and animations

### Implementation Timeline

**Day 1**: Setup files, babel, webpack, canvas, and easel.js

**Day 2**: Create and handle the game logic for one circle so that when the letter is within 50pixels of the input circle that a correct response is returned.

**Day 3**: Add more letters into the circle so that a constant stream of letters will appear within a circle.

**Day 4**: Style the frontend, add different colors to the circles. Add some fade or movement as

### Bonus features

- [ ] Animations/Sounds in the background when letters clicked correctly
- [ ] The input circle moves along the outer circle.
