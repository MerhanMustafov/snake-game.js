/** @type {HTMLCanvasElement} */
import { generateRandomFoodPosition, food } from './food.js'
import { setLocalStorage } from './localStoreage.js'
// import { manageSelected, select } from './SelectImgFeature.js'
const board = document.querySelector('#board')
let resetWindow = document.querySelector('.reset-window')
let resetBtn = document.querySelector('.play')

let arrayOfImages = document.querySelectorAll('img')
let current_length = document.querySelector('.score-c')
let imgSection = document.querySelector('.game-background-choses')

const gameOverCheckbox = document.querySelector('#gameOver')
const select = document.querySelectorAll('.selectedImg')

let gameIsOn = true

;[...select].forEach((b) =>
  b.addEventListener('click', (e) => {
    const imageContainer = e.target.parentElement
    const clickedImg = e.target.parentElement.querySelector('img').src
    localStorage.setItem('lastImage', clickedImg)
    board.style.backgroundImage = `url(${clickedImg})`

    ;[...imageContainer.parentElement.children].forEach((imgC) => {
      const checked = imgC.querySelector('input').checked
      if (checked) {
        console.log(imgC)
        imgC.classList.add('iii')
      } else {
        imgC.classList.remove('iii')
      }
    })
  }),
)

resetBtn.addEventListener('click', (e) => {
  resetWindow.style.visibility = 'hidden'
  gameOverCheckbox.checked = false
  snake = [{ x: 70, y: 10 }]
  generateRandomFoodPosition()
  drawSnake()
  dx = NEUTRAL
  dy = NEUTRAL
  gameIsOn = true
  gameOn()
})

const ctx = board.getContext('2d')
let reqId
let timeOut
//easy/ medium/ hard/
let interval = 70

let size = 5
const NEUTRAL = 0
const HORIZONT_LEFT = -size
const HORIZONT_RIGT = size
const VERTICAL_UP = -size
const VERTICAL_DOWN = size
// horizontal velocity
let dx = NEUTRAL
// vertical velocity
let dy = NEUTRAL

let snake = [{ x: 70, y: 10 }]

// board.width = window.innerWidth * 0.8;
// board.height = window.innerHeight * 0.75;
setLocalStorage(snake)
setSnakeLength()

generateRandomFoodPosition()
drawSnake()
gameOn()
function gameOn() {
  document.addEventListener('keydown', (e) => {
    e.preventDefault()
    let goingLeft = dx == HORIZONT_LEFT
    let goingRight = dx == HORIZONT_RIGT
    let goingUp = dy == VERTICAL_UP
    let goingDown = dy == VERTICAL_DOWN
    let notMoving = !goingLeft && !goingRight && !goingDown && !goingUp
    if (e.key == 'ArrowRight' && (!goingLeft || dx == NEUTRAL)) {
      // clearBoard();
      updateAxis('right')
      dx = HORIZONT_RIGT
      moveSnake('X', 'right')
    }
    if (e.key == 'ArrowLeft' && (!goingRight || dx == NEUTRAL)) {
      // clearBoard();
      if (notMoving) {
        snake.reverse()
      }
      updateAxis('left')
      // dx = HORIZONT_LEFT;

      moveSnake('X', 'left')
    }
    if (e.key == 'ArrowUp' && (!goingDown || dy == NEUTRAL)) {
      // clearBoard();
      updateAxis('up')
      moveSnake('Y', 'up')
    }
    if (e.key == 'ArrowDown' && (!goingUp || dy == NEUTRAL)) {
      // clearBoard();
      updateAxis('down')
      moveSnake('Y', 'down')

      cancelAnimationFrame(reqId)
    }
  })
}

// Draw/Visualize Snake/Food
function drawSnake() {
  clearBoard()
  snake.forEach((part, i) => {
    ctx.beginPath()
    ctx.rect(part.x, part.y, size, size)
    //inside color
    if (i == 0) {
      ctx.fillStyle = 'rgba(255, 255, 220)'
        // ctx.setFillColor(blue)
    } else {
      ctx.fillStyle = 'white'
    }
    //border color
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fill()
    ctx.stroke()
  })
  hasEnded()

  ctx.beginPath()
  ctx.rect(food.x, food.y, size, size)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.stroke()
  hasEaten()
  setSnakeLength()
}

function hasEaten() {
  let snakeHeadX = snake[0].x
  let snakeHeadY = snake[0].y
  if (
    (dx == HORIZONT_RIGT || dx == HORIZONT_LEFT) &&
    between(snakeHeadY, food.y - size, food.y + size) &&
    between(snakeHeadX, food.x - size, food.x + size)
  ) {
    generateRandomFoodPosition()
    let head = { x: snake[0].x + size, y: snake[0].y }
    snake.unshift(head)
  }
  if (
    (dy == VERTICAL_DOWN || dy == VERTICAL_UP) &&
    between(snakeHeadX, food.x - size, food.x + size) &&
    between(snakeHeadY, food.y - size, food.y + size)
  ) {
    generateRandomFoodPosition()
    let head = { x: snake[0].x, y: snake[0].y + size }
    snake.unshift(head)
  }
}
function selfcollision(x, y) {
  for (let i = 3; i < snake.length; i++) {
    if (x == snake[i].x && y == snake[i].y) {
      resetGameWindow()
    }
  }
}

function resetGameWindow(value) {
  gameIsOn = false
  resetWindow.style.visibility = 'visible'
  gameOverCheckbox.checked = true
}

function wallcollision() {
  let snakeHeadX = snake[0].x
  let snakeHeadY = snake[0].y
  let leftWall = 0
  let rightWall = board.width - size
  let upWall = 0
  let downWall = board.height - size
  if (snakeHeadX >= rightWall) {
    resetGameWindow()
  } else if (snakeHeadX <= leftWall) {
    resetGameWindow()
  } else if (snakeHeadY >= downWall) {
    resetGameWindow()
  } else if (snakeHeadY <= upWall) {
    resetGameWindow()
  }
}

function updateSnakePositionX(axis, direction) {
  const head = { x: snake[0].x + dx, y: snake[0].y }
  snake.unshift(head)
  snake.pop()
  updateAxis(direction)
}
function updateSnakePositionY(axis, direction) {
  const head = { x: snake[0].x, y: snake[0].y + dy }
  snake.unshift(head)
  snake.pop()
  updateAxis(direction)
}

function toRight(axis, direction) {
  if (gameIsOn) {
    timeOut = setTimeout(() => {
      updateSnakePositionX(axis, direction)
      updateAxis(direction)
      drawSnake()
      reqId = requestAnimationFrame(toRight)
    }, interval)
  }
}
function toLeft(axis, direction) {
  if (gameIsOn) {
    timeOut = setTimeout(() => {
      updateSnakePositionX(axis, direction)
      updateAxis(direction)
      drawSnake()
      reqId = requestAnimationFrame(toLeft)
    }, interval)
  }
}
function toDown(axis, direction) {
  if (gameIsOn) {
    timeOut = setTimeout(() => {
      updateSnakePositionY(axis, direction)
      updateAxis(direction)
      drawSnake()
      reqId = requestAnimationFrame(toDown)
    }, interval)
  }
}
function toUp(axis, direction) {
  if (gameIsOn) {
    timeOut = setTimeout(() => {
      updateSnakePositionY(axis, direction)
      updateAxis(direction)
      drawSnake()
      reqId = requestAnimationFrame(toUp)
    }, interval)
  }
}

function updateAxis(pressedButton) {
  if (pressedButton == 'right') {
    dx = HORIZONT_RIGT
    dy = NEUTRAL
  } else if (pressedButton == 'left') {
    dx = HORIZONT_LEFT
    dy = NEUTRAL
  } else if (pressedButton == 'down') {
    dy = VERTICAL_DOWN
    dx = NEUTRAL
  } else if (pressedButton == 'up') {
    dy = VERTICAL_UP
    dx = NEUTRAL
  }
}
function moveSnake(axis, direction) {
  if (gameIsOn) {
    cancelAnimationFrame(reqId)
    clearTimeout(timeOut)
    updateAxis(direction)
    if (direction == 'right') {
      toRight(axis, direction)
    }
    if (direction == 'left') {
      toLeft(axis, direction)
    }
    if (direction == 'down') {
      toDown(axis, direction)
    }
    if (direction == 'up') {
      toUp(axis, direction)
    }
  }
  // clearBoard();
}

function clearBoard() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
}

function between(cordinates, min, max, type) {
  return min <= cordinates && cordinates <= max
}

arrayOfImages.forEach((i) =>
  i.addEventListener('click', (e) => {
    let img = e.path[0].currentSrc
    localStorage.setItem('lastImage', img)
    board.style.backgroundImage = `url(${localStorage.getItem('lastImage')})`
  }),
)

function setSnakeLength() {
  current_length.innerText = snake.length
}

function hasEnded() {
  // localStorage.setItem("bestScore", 0);
  let last_best_score = localStorage.getItem('bestScore')
  if (last_best_score < snake.length) {
    localStorage.setItem('bestScore', snake.length)
  }
  wallcollision()

  selfcollision(snake[0].x, snake[0].y)
}

//SCROLL HORIZONTALLY
imgSection.addEventListener('wheel', (e) => {
  console.log(e.wheelDelta)
  //scroll direction Down
  if (e.wheelDelta < 0) {
    //scroll direction right
    imgSection.scrollBy(100, 0)
    //scroll direction up
  } else {
    //scroll direction left
    imgSection.scrollBy(-100, 0)
  }
})
