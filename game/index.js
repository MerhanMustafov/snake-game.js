/** @type {HTMLCanvasElement} */
import { generateRandomFoodPosition, food } from "./food.js";
import { setLocalStorage } from "./localStoreage.js";

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

const snake = [{ x: 220, y: 10 }];

let arrayOfImages = document.querySelectorAll("img");
let current_length = document.querySelector(".score-c");
let imgSection = document.querySelector(".game-background-choses");

// board.width = window.innerWidth * 0.8;
// board.height = window.innerHeight * 0.75;
setLocalStorage(snake);
setSnakeLength();

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
		let notMoving = !goingLeft && !goingRight && !goingDown && !goingUp;
		if (e.key == "ArrowRight" && (!goingLeft || dx == NEUTRAL)) {
			// clearBoard();
			updateAxis("right");
			dx = HORIZONT_RIGT;
			moveSnake("X", "right");
		}
		if (e.key == "ArrowLeft" && (!goingRight || dx == NEUTRAL)) {
			// clearBoard();
			if (notMoving) {
				snake.reverse();
			}
			updateAxis("left");
			// dx = HORIZONT_LEFT;

			moveSnake("X", "left");
		}
		if (e.key == "ArrowUp" && (!goingDown || dy == NEUTRAL)) {
			// clearBoard();
			updateAxis("up");
			moveSnake("Y", "up");
		}
		if (e.key == "ArrowDown" && (!goingUp || dy == NEUTRAL)) {
			// clearBoard();
			updateAxis("down");
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
	hasEnded();

	ctx.beginPath();
	ctx.rect(food.x, food.y, SIZE, SIZE);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.stroke();
	hasEaten();
	setSnakeLength();
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
	updateAxis(direction);
	drawSnake();
}
function updateSnakePositionY(axis, direction) {
	const head = { x: snake[0].x, y: snake[0].y + dy };
	snake.unshift(head);
	snake.pop();
	updateAxis(direction);
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
	// clearBoard();
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

arrayOfImages.forEach((i) =>
	i.addEventListener("click", (e) => {
		let img = e.path[0].currentSrc;
		localStorage.setItem("lastImage", img);
		board.style.backgroundImage = `url(${localStorage.getItem(
			"lastImage"
		)})`;
	})
);

function setSnakeLength() {
	current_length.innerText = snake.length;
}

function hasEnded() {
	// localStorage.setItem("bestScore", 0);
	let last_best_score = localStorage.getItem("bestScore");
	if (last_best_score < snake.length) {
		localStorage.setItem("bestScore", snake.length);
	}
	wallcollision();
	selfcollision(snake[0].x, snake[0].y);
}

//SCROLL HORIZONTALLY
imgSection.addEventListener("wheel", (e) => {
	console.log(e.wheelDelta);
	//scroll direction Down
	if (e.wheelDelta < 0) {
		//scroll direction right
		imgSection.scrollBy(100, 0);
		//scroll direction up
	} else {
		//scroll direction left
		imgSection.scrollBy(-100, 0);
	}
});
