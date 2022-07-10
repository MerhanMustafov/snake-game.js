let food;
function generateRandomFoodPosition() {
	let max_x = board.width * 0.97;
	let min_x = 1;
	let random_x = Math.trunc(Math.random() * (max_x - min_x) + 2);
	let max_y = board.height * 0.97;
	let min_y = 1;
	let random_y = Math.trunc(Math.random() * (max_y - min_y) + 2);
	food = { x: random_x, y: random_y };
}

export { generateRandomFoodPosition, food };
