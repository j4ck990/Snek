import { endGame } from '../end.js'
import { update as updateFood, draw as drawFood } from './comfood.js'
import { outsideGrid } from './comgrid.js'
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './comsnake.js'
import { draw as drawScore } from './com_score.js'
import { gameOver, setState } from './gamestate.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('com-game-board')

function main(currentTime) {
  if (gameOver) {
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