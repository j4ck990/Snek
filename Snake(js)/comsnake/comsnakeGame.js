import { update as updateFood, draw as drawFood } from './comfood.js'
import { outsideGrid, GRID_SIZE } from './comgrid.js'
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getSnakeLength } from './comsnake.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('com-game-board')

function main(currentTime) {
  if (gameOver) {
    window.location = 'Snek/Snake(js)/snakeAI.html'
    return
  }

  if(getSnakeLength() == GRID_SIZE * GRID_SIZE - 1) {
    window.location = 'Snek/Snake(js)/snakeAI.html'
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
}
  
window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
