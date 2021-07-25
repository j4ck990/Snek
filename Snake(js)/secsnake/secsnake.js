import { getInputDirection } from "./secinput.js"
import { update as updateScore } from "./secscore.js"

export const SNAKE_SPEED = 12
export const snakeBody = [{ x: 11, y: 10 }]
const dic_directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
}
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
    let currcoord = snakeBody[i]
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = currcoord.y
    snakeElement.style.gridColumnStart = currcoord.x
    
    if (i === 0 ) {
      snakeElement.classList.add('head')
      snakeElement.classList.add('snake-piece')
      if (snakeBody.length != 1) {
        let nextcoord = snakeBody[i + 1]
        let nextdir = {x: (nextcoord.x - currcoord.x), y: (nextcoord.y - currcoord.y)}
        if(equalPositions(nextdir, dic_directions["up"]) || equalPositions(nextdir, dic_directions["down"])) {
          snakeElement.style.transform = "rotate(90deg)"
        }
      }
    } else {
      snakeElement.classList.add('snake')
      let prevcoord = snakeBody[i - 1]
      let prevdir = {x: (prevcoord.x - currcoord.x), y: (prevcoord.y - currcoord.y)}
      if (i == snakeBody.length - 1) {
        snakeElement.classList.add('snake-piece')
        if(equalPositions(prevdir, dic_directions["up"]) || equalPositions(prevdir, dic_directions["down"])) {
          snakeElement.style.transform = "rotate(90deg)"
        }
        gameBoard.appendChild(snakeElement)
        continue
      }
      let nextcoord = snakeBody[i + 1]
      let nextdir = {x: (nextcoord.x - currcoord.x), y: (nextcoord.y - currcoord.y)}

      if(isOpp(prevdir, nextdir)) {
        snakeElement.classList.add('snake-piece')
        if(equalPositions(prevdir, dic_directions["up"]) || equalPositions(prevdir, dic_directions["down"])) {
          snakeElement.style.transform = "rotate(90deg)"
        }
      } else {
        snakeElement.classList.add('snake-corner')
        if ((equalPositions(prevdir, dic_directions["up"]) && equalPositions(nextdir, dic_directions["left"])) || 
        equalPositions(prevdir, dic_directions["left"]) && equalPositions(nextdir, dic_directions["up"])) {
          snakeElement.style.transform = "rotate(-90deg)"
        } else if ((equalPositions(prevdir, dic_directions["down"]) && equalPositions(nextdir, dic_directions["left"])) || 
        equalPositions(prevdir, dic_directions["left"]) && equalPositions(nextdir, dic_directions["down"])) {
          snakeElement.style.transform = "rotate(180deg)"
        } else if ((equalPositions(prevdir, dic_directions["down"]) && equalPositions(nextdir, dic_directions["right"])) || 
        equalPositions(prevdir, dic_directions["right"]) && equalPositions(nextdir, dic_directions["down"])) {
          snakeElement.style.transform = "rotate(90deg)"
        }
      }
    }
    gameBoard.appendChild(snakeElement)
  }
}

function oppDir(dir) {
  if (equalPositions(dir, dic_directions["up"])) {
    return dic_directions["down"]
  } else if (equalPositions(dir, dic_directions["down"])) {
    return dic_directions["up"]
  } else if (equalPositions(dir, dic_directions["left"])) {
    return dic_directions["right"]
  } else {
    return dic_directions["left"]
  }
}

function isOpp(dir1, dir2) {
  return equalPositions(dir1, oppDir(dir2))
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