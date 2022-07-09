/** @type {HTMLCanvasElement} */
const board = document.querySelector("#board");
board.width = window.innerWidth * 0.95;
board.height = window.innerHeight * 0.8;

const ctx = board.getContext("2d");

const snake = [
	{ x: 60, y: 0 },
	{ x: 50, y: 0 },
	// { x: 40, y: 0 },
	// { x: 30, y: 0 },
	// { x: 20, y: 0 },
];
const NEUTRAL = 0;

const HORIZONT_LEFT = -10;
const HORIZONT_RIGT = 10;

const VERTICAL_UP = -10;
const VERTICAL_DOWN = 10;
// horizontal velocity
let dx = NEUTRAL;

// vertical velocity
let dy = NEUTRAL;

let reqId;
let timeOut;
//easy/ medium/ hard/
let interval = 150;

gameOn();
function gameOn() {
	document.addEventListener("keydown", (e) => {
		e.preventDefault();

		let goingLeft = dx == HORIZONT_LEFT;
		let goingRight = dx == HORIZONT_RIGT;
		let goingUp = dy == VERTICAL_UP;
		let goingDown = dy == VERTICAL_DOWN;
		console.log("DX: " + Math.sign(dx));
		console.log("DY: " + Math.sign(dy));
		if (e.key == "ArrowRight" && (!goingLeft || dx == NEUTRAL)) {
			moveSnake("X", "right");
		}
		if (e.key == "ArrowLeft" && (!goingRight || dx == NEUTRAL)) {
			moveSnake("X", "left");
		}
		if (e.key == "ArrowUp" && (!goingDown || dy == NEUTRAL)) {
			moveSnake("Y", "up");
			console.log("Pressed: " + e.key);
		}
		if (e.key == "ArrowDown" && (!goingUp || dy == NEUTRAL)) {
			moveSnake("Y", "down");
			console.log("Pressed: " + e.key);
		}
	});
}

// Draw/Visualize Snake
function drawSnake() {
	clearBoard();
	snake.forEach((part) => {
		ctx.beginPath();
		ctx.rect(part.x, part.y, 10, 10);
		ctx.stroke();
	});
}

function updateSnakePositionX(axis, direction) {
	const head = { x: snake[0].x + dx, y: snake[0].y };
	snake.unshift(head);
	snake.pop();
	drawSnake();
	// for (let i = 0; i < snake.length; i++) {
	// 	snake[i].x += dx;
	// 	drawSnake();
	// }
}
function updateSnakePositionY(axis, direction) {
	const head = { x: snake[0].x, y: snake[0].y + dy };

	snake.unshift(head);
	snake.pop();
	drawSnake();
	// for (let i = 0; i < snake.length; i++) {
	// 	snake[i].y += dy;
	// 	drawSnake();
	// }
}

function toRight(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionX(axis, direction);
		// drawSnake();
		cancelAnimationFrame(reqId);
		reqId = requestAnimationFrame(toRight);
	}, interval);
}
function toLeft(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionX(axis, direction);
		// drawSnake();

		cancelAnimationFrame(reqId);
		reqId = requestAnimationFrame(toLeft);
	}, interval);
}
function toDown(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionY(axis, direction);
		// drawSnake();
		cancelAnimationFrame(reqId);
		reqId = requestAnimationFrame(toDown);
	}, interval);
}
function toUp(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionY(axis, direction);
		// drawSnake();
		cancelAnimationFrame(reqId);
		reqId = requestAnimationFrame(toUp);
	}, interval);
}

function updateAxis(pressedButton) {
	// let lastHorizontalAxisLeft = Math.sign(dx) == -1;
	// let lastVerticalAxisUp = Math.sign(dy) == -1;
	// let lastHorizontalAxisRight = Math.sign(dx) == 1;
	// let lastVerticalAxisDown = Math.sign(dy) == 1;
	// 	const NEUTRAL = 0

	// const HORIZONT_LEFT_DIRECTION = -10;
	// const HORIZONT_RIGT_DIRECTION = -10;

	// const VERTICAL_UP_DIRECTION = -10
	// const VERTICAL_DOWN_DIRECTION = 10
	if (pressedButton == "right") {
		// if (Math.sign(dx) == -1) {
		dx = HORIZONT_RIGT;
		dy = NEUTRAL; //transform from negative to positive number
		// }
	} else if (pressedButton == "left") {
		// if (Math.sign(dx) == 1) {
		dx = HORIZONT_LEFT; //transform from positive to negative number
		dy = NEUTRAL;
		// }
	} else if (pressedButton == "down") {
		// if (Math.sign(dy) == -1) {
		dy = VERTICAL_DOWN; //transform from negative to positive number
		dx = NEUTRAL;
		// }
	} else if (pressedButton == "up") {
		// if (Math.sign(dy) == 1) {
		dy = VERTICAL_UP; //transform from positive to negative number
		dx = NEUTRAL;

		// }
	}
}
function moveSnake(axis, direction) {
	cancelAnimationFrame(reqId);
	clearTimeout(timeOut);
	updateAxis(direction);
	if (direction == "right") {
		toRight(axis, direction);
		// toRight(axis, direction);
	}
	if (direction == "left") {
		toLeft(axis, direction);
	}
	if (direction == "down") {
		toDown(axis, direction);
	}
	if (direction == "up") {
		toUp(axis, direction);
	}
}

function clearBoard() {
	ctx.clearRect(0, 0, innerWidth, innerHeight);
}

// COMMENT SECTION

// let x = 0;
// let y = 0;
// for (let i = 0; i < 5; i++) {
// 	ctx.beginPath();
// 	ctx.rect(x, y, 20, 20);
// 	ctx.stroke();
// 	x += 20;
// }

// let head = { x: snake[i].x + dx, y: snake[i].y };
// snake.shift();
// snake.unshift(head);
// snake.pop();

// const boarder = {
// 	right: snake[snake.length - 1].x == board.width * 0.97,
// 	// left: snake[0].x == Math.trunc(board.width / 100),
// 	left: snake[0].x < 2,
// };
// if (boarder.right) {
// 	dx = -dx;
// }
// if (boarder.left) {
// 	dx *= dx;
// }

// const snakeDirection = {
// 	right: dx > 0 ? true : false,
// 	left: dx < 0 ? true : false,
// 	up: dy < 0 ? true : false,
// 	down: dy > 0 ? true : false,
// };

// const pressed = {
// 	right: [false, 0],
// 	left: [false, 0],
// 	up: [false, 0],
// 	down: [false, 0],
// };
// COMMENT SECTION
