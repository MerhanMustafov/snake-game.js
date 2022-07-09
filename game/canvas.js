let canvas = document.querySelector("#board");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
function figures() {
	ctx.strokeRect(260, 260, 50, 50);
	ctx.fillStyle = "rgba(255, 0, 0, 0.9)";
	ctx.fillRect(10, 10, 40, 40);
	ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
	ctx.fillRect(60, 60, 40, 40);
	ctx.fillStyle = "rgba(0, 0, 255, 0.7)";
	ctx.fillRect(110, 110, 40, 40);
	ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
	ctx.fillRect(160, 160, 40, 40);
	ctx.fillStyle = "rgba(200, 100, 50, 0.5)";
	ctx.fillRect(210, 210, 40, 40);

	ctx.beginPath();
	ctx.moveTo(100, 200);
	ctx.lineTo(400, 500);
	ctx.lineTo(200, 500);
	ctx.lineTo(100, 200);
	ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
	ctx.stroke();
}
let isTrue = true;

setInterval(() => {
	if (isTrue) {
		isTrue = false;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < 100; i++) {
			let x = Math.random() * window.innerWidth;
			let y = Math.random() * window.innerHeight;
			// figures();
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.arc(x, y, 30, 70, false);
			ctx.arc(x, y, 30, 70, false);
			ctx.arc(x, y, 30, 70, false);
			ctx.arc(x, y, 30, 70, false);
			ctx.stroke();
		}
	} else {
		isTrue = true;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < 100; i++) {
			let x = Math.random() * window.innerWidth;
			let y = Math.random() * window.innerHeight;
			// figures();
			ctx.beginPath();
			ctx.arc(x, y, 30, 70, false);
			ctx.arc(x, y, 30, 70, false);
			ctx.arc(x, y, 30, 70, false);
			ctx.arc(x, y, 30, 70, false);
			ctx.stroke();
		}
	}

	console.log(isTrue);
}, 2000);

// if (isTrue) {
// 	while (isTrue == true) {
// for (let i = 0; i < 5; i++) {
// 	let x = Math.random() * window.innerWidth;
// 	let y = Math.random() * window.innerHeight;
// 	figures();
// 	ctx.beginPath();
// 	ctx.arc(x, y, 30, 70, false);
// 	ctx.arc(x, y, 30, 70, false);
// 	ctx.arc(x, y, 30, 70, false);
// 	ctx.arc(x, y, 30, 70, false);
// 	ctx.stroke();
// }
// 		isTrue = false;
// 	}
// }
