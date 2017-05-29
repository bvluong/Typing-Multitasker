## Typing Multitasker

### Background

Typing Multitasker is a typing game that utilizes rhythm, timing, and multi-tasking inspired by  **Gyroshi**. Typing MultiTasker is a 1-player game that plays out on three circles that rotate with letters. Once the letter reaches the top of the circle, the user will need to hit the correct key in order to raise their life bar. The game starts off with one circle of rotating letters, but as the game progresses other circles will  appear and rotating their own letters.

### Functionality & MVP  

With this Conway's Game of Life simulator, users will be able to:

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

In addition to the webpack entry file, there will be three scripts involved in this project:

`canvas.js`: this script will handle the logic

`circle.js`: will generate the circle and animations

### Implementation Timeline

**Day 1**:

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid, ideally all 3 grid types.  Build in the ability to toggle the live/dead states on click for each cell.  Goals for the day:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, toggling the state of the square on click
- Do the same for triangular and hexagonal grids

**Day 3**: Create the automata logic backend.  Build out modular functions for handling the different grid types along with their unique neighbor checks and rule sets.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Automata` object with correct type and handling logic
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

- [ ] Animations/Sounds in the background when letters clicked correctly
- [ ] The input circle moves along the outer circle.
