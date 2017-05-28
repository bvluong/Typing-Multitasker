/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('root');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var FlickeringCircle = function () {
  function FlickeringCircle(x, y, dx, dy, radius) {
    _classCallCheck(this, FlickeringCircle);

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = ['blue', 'white', 'white', 'white', 'white', 'white', 'red'];
    this.default = { x: x, y: y, dx: dx, dy: dy, radius: radius };
  }

  _createClass(FlickeringCircle, [{
    key: 'draw',
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color[Math.floor(Math.random() * this.color.length)];
      c.fillStyle = this.color[Math.floor(Math.random() * this.color.length)];
      c.fill();
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.x = this.default['x'];
      this.y = this.default['y'];
      this.dx = this.default['dx'];
      this.dy = this.default['dy'];
      this.radius = this.default['radius'];
    }
  }]);

  return FlickeringCircle;
}();

// x and y are the position at which it will be at
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// // set x and y velocity to the velocity ie how much the pixels increase by
// // Use the -0.5 in order the randomize moing left right up or down at start
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// requestAnimationFrame will create a loop on animate
// var radius = 50;

function newFlickeringCircle() {
  var circleArray = [];
  for (var i = 0; i < 50; i++) {
    var radius = 50;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    circleArray.push(new FlickeringCircle(x, y, dx, dy, radius));
  }
  return circleArray;
}

exports.default = newFlickeringCircle;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('root');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var OverLappingLines = function () {
  function OverLappingLines(x, y, dx, dy, radius, color) {
    _classCallCheck(this, OverLappingLines);

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.default = { x: x, y: y, dx: dx, dy: dy, radius: radius, color: color };
  }

  _createClass(OverLappingLines, [{
    key: 'draw',
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color;
      c.fillStyle = this.color;
      c.fill();
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.x = this.default['x'];
      this.y = this.default['y'];
      this.dx = this.default['dx'];
      this.dy = this.default['dy'];
      this.radius = this.default['radius'];
      this.color = this.default['color'];
    }
  }]);

  return OverLappingLines;
}();

function newLapLines() {
  var circleArray = [];
  for (var i = 0; i < 4; i++) {
    var radius = 10;
    var x = 0.15 * i * (innerWidth - radius * 2) + radius;
    var y = 1 * (i % 2) * (innerHeight - radius * 2) + radius;
    var dx = 4;
    var dy = i % 2 === 0 ? 4 : -4;
    var color = ['blue', 'red'][i % 2];
    circleArray.push(new OverLappingLines(x, y, dx, dy, radius, color));
  }
  return circleArray;
}
exports.default = newLapLines;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _overlapping_lines = __webpack_require__(1);

var _overlapping_lines2 = _interopRequireDefault(_overlapping_lines);

var _flickering_circle = __webpack_require__(0);

var _flickering_circle2 = _interopRequireDefault(_flickering_circle);

var _big_trailing_circle = __webpack_require__(3);

var _big_trailing_circle2 = _interopRequireDefault(_big_trailing_circle);

var _many_mini_circles = __webpack_require__(4);

var _many_mini_circles2 = _interopRequireDefault(_many_mini_circles);

var _lights_sign = __webpack_require__(5);

var _lights_sign2 = _interopRequireDefault(_lights_sign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('root');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

document.addEventListener("keydown", keyDownTextField, false);
var big_trailing_circle = new _big_trailing_circle2.default();

function MovingArray(options) {
  var defaultOptions = {
    length: 1500,
    interval: 1,
    clear: false
  };
  options = Object.assign(defaultOptions, options);

  var runFunc = setInterval(function () {
    if (options.clear) {
      c.clearRect(0, 0, innerWidth, innerHeight);
    }
    options.array.forEach(function (obj) {
      return obj.update();
    });
  }, options.interval);

  setTimeout(function () {
    clearInterval(runFunc);
    c.clearRect(0, 0, innerWidth, innerHeight);
    options.array.forEach(function (obj) {
      return obj.reset();
    });
  }, options.length);
}

function keyDownTextField(e) {
  var keyInput = e.key;

  switch (keyInput) {

    case 'a':
      var lap_lines = (0, _overlapping_lines2.default)();
      MovingArray({ array: lap_lines });
      break;

    case 's':
      var flickering_circle = (0, _flickering_circle2.default)();
      MovingArray({ array: flickering_circle });
      break;

    case 'd':
      var dInterval = setInterval(function () {
        big_trailing_circle.update();
      }, 50);
      setTimeout(function () {
        clearInterval(dInterval);
        big_trailing_circle.reset();
        c.clearRect(0, 0, innerWidth, innerHeight);
      }, 2000);
      break;

    case 'f':
      var many_mini_circles = (0, _many_mini_circles2.default)();
      MovingArray({
        array: many_mini_circles,
        clear: true
      });
      break;
    case 'g':
      var gInterval = setInterval(function () {
        var lights_sign = new _lights_sign2.default();
        lights_sign.update();
      }, 4);
      setTimeout(function () {
        clearInterval(gInterval);
        c.clearRect(0, 0, innerWidth, innerHeight);
      }, 2000);
      break;
    default:
      console.log("not valid key");
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('root');

var c = canvas.getContext('2d');

var BigTrailingCircle = function () {
  function BigTrailingCircle() {
    _classCallCheck(this, BigTrailingCircle);

    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.dx = 0;
    this.dy = Math.PI * 2 / 20;
    this.startPoint = 0;
    this.endPoint = Math.PI * 2 / 20;
    this.radius = (innerHeight + innerWidth) / 6;
    this.color = 'magenta';
  }

  _createClass(BigTrailingCircle, [{
    key: 'draw',
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, this.startPoint, this.endPoint, false);
      c.strokeStyle = this.color;
      c.lineWidth = 30;
      c.stroke();
    }
  }, {
    key: 'update',
    value: function update() {
      c.clearRect(0, 0, innerWidth, innerHeight);
      if (this.endPoint >= Math.PI * 2) {
        this.dx = Math.PI * 2 / 20;
        this.dy = 0;
      }
      this.startPoint += this.dx;
      this.endPoint += this.dy;

      this.draw();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.dx = 0;
      this.dy = Math.PI * 2 / 20;
      this.startPoint = 0;
      this.endPoint = Math.PI * 2 / 50;
    }
  }]);

  return BigTrailingCircle;
}();

exports.default = BigTrailingCircle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('root');
var c = canvas.getContext('2d');

var ManyMiniCircles = function () {
  function ManyMiniCircles(x, y, dx, dy, radius, color) {
    _classCallCheck(this, ManyMiniCircles);

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.default = { x: x, y: y, dx: dx, dy: dy, radius: radius, color: color };
  }

  _createClass(ManyMiniCircles, [{
    key: 'draw',
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color;
      c.fillStyle = this.color;
      c.fill();
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.x = this.default['x'];
      this.y = this.default['y'];
      this.dx = this.default['dx'];
      this.dy = this.default['dy'];
      this.radius = this.default['radius'];
      this.color = this.default['color'];
    }
  }]);

  return ManyMiniCircles;
}();

function newManyMiniCircles() {
  var circleArray = [];
  for (var i = 0; i < 800; i++) {
    var radius = 2;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var color = ['blue', 'red', 'black', 'orange'][Math.floor(Math.random() * 4)];
    circleArray.push(new ManyMiniCircles(x, y, dx, dy, radius, color));
  }
  return circleArray;
}

exports.default = newManyMiniCircles;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('root');
var c = canvas.getContext('2d');

var LightsSign = function () {
  function LightsSign() {
    _classCallCheck(this, LightsSign);

    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.text = "LIGHTS";
    this.color = ['#0000CD', '#00FFFF', '#6495ED', '#00008B'][Math.floor(Math.random() * 4)];
  }

  _createClass(LightsSign, [{
    key: 'draw',
    value: function draw() {
      c.font = '100px Iceland';
      c.fillStyle = this.color;
      c.textAlign = 'center';
      c.fillText(this.text, this.x, this.y);
    }
  }, {
    key: 'update',
    value: function update() {
      this.draw();
    }
  }]);

  return LightsSign;
}();

exports.default = LightsSign;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map