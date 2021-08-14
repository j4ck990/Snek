import { GRID_SIZE, outsideGrid } from "./comgrid.js"
import { Hamilcycle } from "./comcycle.js"
import {getSnakeHead, getSnakeTail, getSnakeLength, onSnake, oppDir, equalPositions} from "./comsnake.js"
import {getCurrentFoodPosition, EXPANSION_RATE} from "./comfood.js"
import {will_survive, getAStarDir} from "./astar.js"

let hamilcycle = new Hamilcycle()
let count = 0
let currDir = { x: 0, y: -1 }
export const difficulty = localStorage.getItem('difficulty')
const ARENA_SIZE = GRID_SIZE * GRID_SIZE
const BUFFER = 1
const dic_directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
}

let inefficient_dir = []
let offroad_dir = []
let death_dir = []

let deathChance = (10 - difficulty)
let offroadChance = deathChance + (10 - difficulty) * (6 - Math.floor(difficulty / 3))
let inefficientChance = offroadChance + (10 - difficulty) * (9 - Math.floor(difficulty / 3))

let Astarlimit = ARENA_SIZE / Math.min(difficulty * 2, 15)
let AstarChance = 4500 - difficulty * 1000

function getRandom() {
    return Math.floor(Math.random() * 10000)
}


function calcDist(start, end) {
    if (start < end) {
        return end - start - 1
    } else {
        return ARENA_SIZE + end - start - 1
    }
}

function clearArray() {
    inefficient_dir = []
    offroad_dir = []
    death_dir = []
}

export function getInputDirection() {
    clearArray()
    let randomNum = getRandom()
    count++
    // console.log(count)
    
    let emptyDist = ARENA_SIZE - getSnakeLength() - EXPANSION_RATE
    if (getSnakeLength() < Astarlimit) {
        let Astardir = getAStarDir()
        console.log(Astardir)
        Astardir = (randomNum < AstarChance) ? currDir : Astardir
        // if (randomNum < AstarChance) {
        //     console.log("CHANCE")
        //     Astardir = currDir
        //     console.log(currDir)
            
        // }
        // console.log("----------------")
        currDir = Astardir
        return Astardir
    }
    // console.log("transit")
    let head = getSnakeHead()
    let headpos = hamilcycle.getNodePosition(head.x, head.y)
    let tail = getSnakeTail()
    let tailpos = hamilcycle.getNodePosition(tail.x, tail.y)
    let food = getCurrentFoodPosition()
    let foodpos =  hamilcycle.getNodePosition(food.x, food.y)
    let foodDist = calcDist(headpos, foodpos)
    let tailDist = calcDist(headpos, tailpos)
    let cutDistAvail = tailDist - EXPANSION_RATE - BUFFER
    
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
    // let surviveDir = bestDir
    // console.log(bestDir)
    let bestDist = -1
    let tempDist = 0


    if(canLeft) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x - 1, head.y))
        // surviveDir = dic_directions["left"]
        if(tempDist <= cutDistAvail) {
            inefficient_dir.push(dic_directions["left"])
            // console.log("inefficient")
            if (tempDist > bestDist) {
                bestDir = dic_directions["left"]
                bestDist = tempDist
            }
        } else {
            // console.log("offroad")
            offroad_dir.push(dic_directions["left"])
        }
    } else {
        // console.log("death")
        death_dir.push(dic_directions["left"])
    }

    if(canUp) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x, head.y - 1))
        // surviveDir = dic_directions["up"]
        if(tempDist <= cutDistAvail) {
            inefficient_dir.push(dic_directions["up"])
            // console.log("inefficient")
            if (tempDist > bestDist) {
                bestDir = dic_directions["up"]
                bestDist = tempDist
            }
        } else {
            offroad_dir.push(dic_directions["up"])
            // console.log("offroad")
        }
    } else {
        death_dir.push(dic_directions["up"])
        // console.log("death")
    }

    if(canRight) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x + 1, head.y))
        // surviveDir = dic_directions["right"]
        if(tempDist <= cutDistAvail) {
            inefficient_dir.push(dic_directions["right"])
            // console.log("inefficient")
            if (tempDist > bestDist) {
                bestDir = dic_directions["right"]
                bestDist = tempDist
            }
        } else {
            offroad_dir.push(dic_directions["right"])
            // console.log("offroad")
        }
    } else {
        death_dir.push(dic_directions["right"])
        // console.log("death")
    }

    if(canDown) {
        tempDist = calcDist(headpos, hamilcycle.getNodePosition(head.x, head.y + 1))
        // surviveDir = dic_directions["down"]
        if(tempDist <= cutDistAvail) {
            // console.log("inefficient")
            inefficient_dir.push(dic_directions["down"])
            if (tempDist > bestDist) {
                bestDir = dic_directions["down"]
                bestDist = tempDist
            }
        } else {
            offroad_dir.push(dic_directions["down"])
            // console.log("offroad")
        }
    } else {
        // console.log("death")
        death_dir.push(dic_directions["down"])
    }
    
    if (!will_survive({x: head.x + bestDir.x, y: head.y + bestDir.y})) {
        bestDir = (offroad_dir.length == 0) ? currDir : offroad_dir[Math.floor(Math.random() * offroad_dir.length)]
        // console.log(offroad_dir.length)
        // console.log(death_dir.length)
        // console.log(inefficient_dir.length)
        // console.log(bestDir)
        // console.log("SAVED")
    }

    if (randomNum < deathChance) {
        console.log("randomnum:" + randomNum)
        console.log("Death:" + deathChance)
        if (death_dir.length > 1 ) {
            bestDir = death_dir[Math.floor(Math.random() * death_dir.length)]
            while (equalPositions(bestDir, oppDir(currDir))) {
                bestDir = death_dir[Math.floor(Math.random() * death_dir.length)]
                console.log(bestDir)
                console.log(currDir)
                console.log("DEATH")
            }

        } else {
            console.log("NONE D: 1 ")
        }
        
        console.log("----------")
        
    } else if (deathChance <= randomNum && randomNum < offroadChance) {
        console.log("randomnum:" + randomNum)
        console.log("Death:" + deathChance)
        console.log("Offroad:" + offroadChance)
        if (offroad_dir.length != 0) {
            bestDir = offroad_dir[Math.floor(Math.random() * offroad_dir.length)]
            console.log("OFFROAD")
        } else {
            console.log("NONE D: 2 ")
        }
        
        console.log("----------")
        
    } else if (offroadChance <= randomNum && randomNum < inefficientChance) {
        console.log("randomnum:" + randomNum)
        console.log("Offroad:" + offroadChance)
        console.log("Inefficient:" + inefficientChance)
        if (inefficient_dir.length != 0) {
            bestDir = inefficient_dir[Math.floor(Math.random() * inefficient_dir.length)]
            console.log("SEIZE THE MEANS OF PRODUCTION")
        } else {
            console.log("NONE D: 3 ")
        }
        
        console.log("----------")
        
    }
    // console.log("----------------")

    currDir = bestDir
    return bestDir
}