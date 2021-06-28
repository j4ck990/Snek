import { update as updateFood, draw as drawFood } from './comfood.js'
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './comsnake.js'
import { draw as drawScore } from './comscore.js'
import { outsideGrid } from './comgrid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('com-game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/Snek/'
    }
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
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
