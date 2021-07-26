import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getSnakeLength } from './secsnake.js'
import { update as updateFood, draw as drawFood } from './secfood.js'
import { outsideGrid, GRID_SIZE } from './secgrid.js'
import { draw as drawScore } from './secscore.js'
import { endGame } from '../end.js'
import { gameOver, setState } from './gamestate.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('sec-game-board')

function main(currentTime) {
  if (gameOver ||  getSnakeLength() == GRID_SIZE * GRID_SIZE - 1) {
    endGame()
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
  drawScore(gameBoard)
}

function checkDeath() {
  setState(outsideGrid(getSnakeHead()) || snakeIntersection())
}