/** @type {HTMLCanvasElement} */
import { generateRandomFoodPosition, food } from "./food.js";
board.style.backgroundImage = `url(${localStorage.getItem("lastImage")})`;
// board.width = window.innerWidth * 0.8;
// board.height = window.innerHeight * 0.75;

const ctx = board.getContext("2d");
let reqId;
let timeOut;
//easy/ medium/ hard/
let interval = 70;

let SIZE = 5;
const NEUTRAL = 0;
const HORIZONT_LEFT = -SIZE;
const HORIZONT_RIGT = SIZE;
const VERTICAL_UP = -SIZE;
const VERTICAL_DOWN = SIZE;
// horizontal velocity
let dx = NEUTRAL;
// vertical velocity
let dy = NEUTRAL;

const snake = [
	{ x: 20, y: 10 },
	// { x: 10 , y: 10 },
];
generateRandomFoodPosition();
drawSnake();

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

// Draw/Visualize Snake/Food
function drawSnake() {
	clearBoard();
	snake.forEach((part, i) => {
		ctx.beginPath();
		ctx.rect(part.x, part.y, SIZE, SIZE);
		//inside color
		ctx.fillStyle = "white";
		//border color
		ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
		ctx.fill();
		ctx.stroke();
	});

	wallcollision();
	selfcollision(snake[0].x, snake[0].y);

	ctx.beginPath();
	ctx.rect(food.x, food.y, SIZE, SIZE);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.stroke();
	hasEaten();
}

function hasEaten() {
	let snakeHeadX = snake[0].x;
	let snakeHeadY = snake[0].y;
	if (
		(dx == HORIZONT_RIGT || dx == HORIZONT_LEFT) &&
		between(snakeHeadY, food.y - SIZE, food.y + SIZE) &&
		between(snakeHeadX, food.x - SIZE, food.x + SIZE)
	) {
		generateRandomFoodPosition();
		let head = { x: snake[0].x + SIZE, y: snake[0].y };
		snake.unshift(head);
		drawSnake();
	}
	if (
		(dy == VERTICAL_DOWN || dy == VERTICAL_UP) &&
		between(snakeHeadX, food.x - SIZE, food.x + SIZE) &&
		between(snakeHeadY, food.y - SIZE, food.y + SIZE)
	) {
		generateRandomFoodPosition();
		let head = { x: snake[0].x, y: snake[0].y + SIZE };
		snake.unshift(head);
		drawSnake();
	}
}
function selfcollision(x, y) {
	for (let i = 3; i < snake.length; i++) {
		if (x == snake[i].x && y == snake[i].y) {
			// return true;
			alert("end hit ITSELF");
		}
	}
	// return false;
}
function wallcollision() {
	let snakeHeadX = snake[0].x;
	let leftWall = -5;
	let rightWall = Math.trunc(board.width);
	let snakeHeadY = snake[0].y;
	let upWall = 0;
	let downWall = board.height;
	if (snakeHeadX >= rightWall) {
		alert("You hit the wall!");
	} else if (snakeHeadX <= leftWall) {
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

function between(cordinates, min, max, type) {
	return min <= cordinates && cordinates <= max;
}

document.querySelectorAll("img").forEach((i) =>
	i.addEventListener("click", (e) => {
		let img = e.path[0].currentSrc;
		localStorage.setItem("lastImage", img);
		board.style.backgroundImage = `url(${localStorage.getItem(
			"lastImage"
		)})`;
	})
);

// let brushButton = document.querySelector(".drop-down-images");
// // document.querySelector(".fa-brush").addEventListener("click", (e) => {
// // 	if (brushButton.style.display == "none") {
// // 		brushButton.style.display = "inline-block";
// // 	} else {
// // 		brushButton.style.display = "none";
// // 	}
// // });

// let imgS = document.querySelector(".game-background-choses");
// // imgS.addEventListener("mouseover", (e) => {
// // 	imgS.style.overflowY = "auto";
// // 	brushButton.style.display = "flex";
// // });
// // imgS.addEventListener("mouseout", (e) => {
// // 	imgS.style.overflowY = "hidden";
// // 	brushButton.style.display = "none";
// // });
