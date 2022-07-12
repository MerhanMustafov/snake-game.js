export { setLocalStorage };
let best_length = document.querySelector(".score-b");
function setLocalStorage(snake) {
	setLastImage();
	setBestScore(snake);
}

function setLastImage() {
	let lastImage = localStorage.getItem("lastImage");
	if (lastImage) {
		board.style.backgroundImage = `url(${lastImage})`;
	} else {
		localStorage.setItem("lastImage", `../images/one.jpg`);
		board.style.backgroundImage = localStorage.getItem("lastImage");
	}
}

function setBestScore(snake) {
	let bestScore = localStorage.getItem("bestScore");

	if (!bestScore) {
		localStorage.setItem("bestScore", snake.length);
		best_length.innerText = Number(localStorage.getItem("bestScore"));
	} else if (bestScore && snake.length > bestScore) {
		localStorage.setItem("bestScore", snake.length);
		best_length.innerText = bestScore;
	} else {
		best_length.innerText = bestScore;
	}
}
