/** @type {HTMLCanvasElement} */
const board = document.querySelector("#board");
board.width = window.innerWidth * 0.8;
board.height = window.innerHeight * 0.75;

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
		if (e.key == "ArrowRight" && (!goingLeft || dx == NEUTRAL)) {
			moveSnake("X", "right");
		}
		if (e.key == "ArrowLeft" && (!goingRight || dx == NEUTRAL)) {
			moveSnake("X", "left");
		}
		if (e.key == "ArrowUp" && (!goingDown || dy == NEUTRAL)) {
			moveSnake("Y", "up");
		}
		if (e.key == "ArrowDown" && (!goingUp || dy == NEUTRAL)) {
			moveSnake("Y", "down");
		}
	});
}

// Draw/Visualize Snake
function drawSnake() {
	clearBoard();
	snake.forEach((part) => {
		ctx.beginPath();
		ctx.rect(part.x, part.y, 10, 10);
		ctx.fillStyle = "black"; //inside color
		ctx.fill(); //inside color
		ctx.strokeStyle = "red"; //border color
		ctx.stroke();
	});
	hasGameEnded();
}

function hasGameEnded() {
	let snakeHeadX = snake[0].x;
	let leftWall = 0;
	let rightWall = Math.trunc(board.width);
	let snakeHeadY = snake[0].y;
	let upWall = 0;
	let downWall = Math.trunc(board.height);
	if (snakeHeadX >= rightWall) {
		alert("You hit the wall!");
	} else if (snakeHeadX < leftWall) {
		alert("You hit the wall!");
	} else if (snakeHeadY >= downWall) {
		alert("You hit the wall!");
	} else if (snakeHeadY < upWall) {
		alert("You hit the wall!");
	}
}

function updateSnakePositionX(axis, direction) {
	const head = { x: snake[0].x + dx, y: snake[0].y };
	snake.unshift(head);
	snake.pop();
	drawSnake();
}
function updateSnakePositionY(axis, direction) {
	const head = { x: snake[0].x, y: snake[0].y + dy };

	snake.unshift(head);
	snake.pop();
	drawSnake();
}

function toRight(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionX(axis, direction);
		reqId = requestAnimationFrame(toRight);
	}, interval);
}
function toLeft(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionX(axis, direction);
		reqId = requestAnimationFrame(toLeft);
	}, interval);
}
function toDown(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionY(axis, direction);
		reqId = requestAnimationFrame(toDown);
	}, interval);
}
function toUp(axis, direction) {
	timeOut = setTimeout(() => {
		updateSnakePositionY(axis, direction);
		reqId = requestAnimationFrame(toUp);
	}, interval);
}

function updateAxis(pressedButton) {
	if (pressedButton == "right") {
		dx = HORIZONT_RIGT;
		dy = NEUTRAL;
	} else if (pressedButton == "left") {
		dx = HORIZONT_LEFT;
		dy = NEUTRAL;
	} else if (pressedButton == "down") {
		dy = VERTICAL_DOWN;
		dx = NEUTRAL;
	} else if (pressedButton == "up") {
		dy = VERTICAL_UP;
		dx = NEUTRAL;
	}
}
function moveSnake(axis, direction) {
	cancelAnimationFrame(reqId);
	clearTimeout(timeOut);
	updateAxis(direction);
	if (direction == "right") {
		toRight(axis, direction);
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

// COMMENT SECTION
