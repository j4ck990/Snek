import {GRID_SIZE} from "./comgrid.js"
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
let direction = [];
gen_boring();

const dic_directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
}
  

function gen_boring() {

  for (let i = 0; i < Math.floor(GRID_SIZE/2) - 1; i++) {
    direction.push("left")
  }

  for (let i = 0; i < Math.floor(GRID_SIZE/4); i++) {
    direction.push("down")
    for (let i = 0; i < GRID_SIZE - 2; i++) {
      direction.push("right")
    }
    direction.push("down")
    for (let i = 0; i < GRID_SIZE - 2; i++) {
      direction.push("left")
    }
  }

  direction.push("left")
  for (let i = 0; i < GRID_SIZE - 1; i++) {
    direction.push("up");
  }
  direction.push("right")

  for (let i = 0; i < Math.floor(GRID_SIZE/4); i++) {
    for (let i = 0; i < GRID_SIZE - 2; i++) {
      direction.push("right")
    }
    direction.push("down")
    if (i == Math.floor(GRID_SIZE/4) - 1){continue}
    for (let i = 0; i < GRID_SIZE - 2; i++) {
      direction.push("left")
    }
    direction.push("down")
  }
  for (let i = 0; i < Math.floor(GRID_SIZE/2) - 1; i++) {
    direction.push("left")
  }

  for (let i = 0; i < 8; i++) {
    direction.push(...direction)
  }

}


export function getInputDirection() {
  inputDirection = dic_directions[direction.shift()]
  return inputDirection
}

//directions["left"]