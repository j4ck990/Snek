import { endGame } from '../end.js'
import { update as updateFood, draw as drawFood } from './comfood.js'
import { outsideGrid, GRID_SIZE } from './comgrid.js'
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getSnakeLength } from './comsnake.js'
import { draw as drawScore } from './com_score.js'
import { gameOver, setState, score as comScore } from './gamestate.js'
import {score as playerScore} from "../firstsnake/score.js"
import { gameOver as playerEnd} from "../firstsnake/snakeGame.js";

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
  setState(outsideGrid(getSnakeHead()) || snakeIntersection() || (playerEnd && playerScore < comScore) || getSnakeLength() == GRID_SIZE * GRID_SIZE - 1)
  if (gameOver) {
    document.getElementById("gameover2").style.display = "block"
  }
}