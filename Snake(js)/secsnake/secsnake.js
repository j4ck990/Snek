import { getInputDirection } from "./secinput.js"
import { update as updateScore } from "./secscore.js"

export const SNAKE_SPEED = 7
export const snakeBody = [{ x: 11, y: 10 }]
let newSegments = 0

export function update() {
  addSegments()

  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  for (let i = 0; i < snakeBody.length; i++) {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = snakeBody[i].y
    snakeElement.style.gridColumnStart = snakeBody[i].x
    if (i === 0 ) {
      snakeElement.classList.add('head')
    } else {
        snakeElement.classList.add('snake')
    }
    gameBoard.appendChild(snakeElement)
  }
}

export function expandSnake(amount) {
  updateScore()
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}