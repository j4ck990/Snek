import { GRID_SIZE, outsideGrid } from "./comgrid.js"
import { Hamilcycle } from "./comcycle.js"
import {getSnakeHead, getSnakeTail, getSnakeLength, onSnake} from "./comsnake.js"
import {getCurrentFoodPosition, EXPANSION_RATE} from "./comfood.js"
import {will_survive, getAStarDir} from "./astar.js"

let hamilcycle = new Hamilcycle()
let count = 0
const ARENA_SIZE = GRID_SIZE * GRID_SIZE
const dic_directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  }


function calcDist(start, end) {
    if (start < end) {
        return end - start - 1
    } else {
        return ARENA_SIZE + end - start - 1
    }
}

export function getInputDirection() {
    count++
    console.log(count)
    
    let emptyDist = ARENA_SIZE - getSnakeLength() - EXPANSION_RATE
    if (emptyDist > ARENA_SIZE - ARENA_SIZE / 20) {
        return getAStarDir()
    }
    let head = getSnakeHead()
    let headpos = hamilcycle.getNodePosition(head.x, head.y)
    let tail = getSnakeTail()
    let tailpos = hamilcycle.getNodePosition(tail.x, tail.y)
    let food = getCurrentFoodPosition()
    let foodpos =  hamilcycle.getNodePosition(food.x, food.y)
    let foodDist = calcDist(headpos, foodpos)
    let tailDist = calcDist(headpos, tailpos)
    let cutDistAvail = tailDist - EXPANSION_RATE
    
    if (emptyDist < ARENA_SIZE / 4) {
        cutDistAvail = 0
    } else if (foodDist < tailDist){
        cutDistAvail -= EXPANSION_RATE
    }
    let cuttingAmtWanted = foodDist
    if (cutDistAvail < 0) {
        cutDistAvail = 0
    } else if (cuttingAmtWanted < cutDistAvail) {
        cutDistAvail = cuttingAmtWanted
    }

    let canRight = will_survive({x: head.x + 1, y: head.y})
    let canLeft = will_survive({x: head.x - 1, y: head.y})
    let canUp = will_survive({x: head.x, y: head.y - 1})
    let canDown = will_survive({x: head.x, y: head.y + 1})
    
    let nextpos = (headpos === GRID_SIZE * GRID_SIZE) ? 1 : headpos + 1
    let nextCoords = hamilcycle.getNodeCoords(nextpos)
    let bestDir = {x: nextCoords.x - head.x, y: nextCoords.y - head.y}
    let bestDist = -1
    let tempDist = 0

    if(canRight) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x + 1, head.y))
        if(tempDist < cutDistAvail && tempDist > bestDist) {
            bestDir = dic_directions["right"]
            bestDist = tempDist
        }
    }

    if(canLeft) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x - 1, head.y))
        if(tempDist < cutDistAvail && tempDist > bestDist) {
            bestDir = dic_directions["left"]
            bestDist = tempDist
        }
    }

    if(canUp) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x, head.y - 1))
        if(tempDist < cutDistAvail && tempDist > bestDist) {
            bestDir = dic_directions["up"]
            bestDist = tempDist
        }
    }

    if(canDown) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x, head.y + 1))
        if(tempDist < cutDistAvail && tempDist > bestDist) {
            bestDir = dic_directions["down"]
            bestDist = tempDist
        }
    }
    return bestDir
}