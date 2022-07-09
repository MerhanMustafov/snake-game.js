let canvas = /** @type {HTMLCanvasElement} */ (
	document.querySelector("#board")
);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

function resize() {
	let x = 0;
	let y = 0;
	function r(modX, modY, initialX, initialY, count) {
		if (x + initialX < initialX + 50 && y + initialY == initialY) {
			x += modX;
		} else if (
			x + initialX == initialX + 50 &&
			y + initialY < initialY + 50
		) {
			y += modY;
		} else if (y + initialY == initialY + 50 && x + initialX > initialX) {
			x -= modX;
		} else if (x + initialX == initialX && y + initialY > initialY) {
			y -= modY;
		}
		generateNewcircle(x + initialX, y + initialY, count);
	}
	console.log(typeof r);
	return r;
}

function generateNewcircle(x, y, count) {
	if (count == 19) {
		ctx.clearRect(0, 0, innerWidth, innerHeight);
	}
	ctx.beginPath();
	ctx.arc(x, y, 20, Math.PI * 2, false);
	ctx.stroke();
}
let resizeR = resize();
let count = 0;
function animetion() {
	requestAnimationFrame(animetion);
	resizeR(1, 1, 200, 200, count);
	resizeR(1, 1, 300, 300, count);
	resizeR(1, 1, 400, 400, count);
	if (count == 20) {
		count = 0;
	}
	count += 1;

	// if (x < 750) {
	// 	while (x < 750) {
	// 		generateNewcircle();
	// 		x += 1;
	// 	}
	// }
	// else if (x > 200) {
	// 	while (x > 200) {
	// 		generateNewcircle();
	// 		x -= 1;
	// 	}
	// }
	// while(y < )
	// y += 10;
}

animetion();
