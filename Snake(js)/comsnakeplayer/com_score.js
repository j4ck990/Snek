import { GRID_SIZE } from './comgrid.js'
import { snakeBody } from './comsnake.js'

const base_points = 500
const bonus_points = 250
let steps = 0
let score = 0

export function update() {
    const max_steps = GRID_SIZE * GRID_SIZE
    console.log("AI steps: " + steps)
    // score += base_points + Math.floor(bonus_points*(max_steps - steps)/max_steps)
    score += base_points + Math.floor((Math.max(max_steps - steps, 0)/ max_steps) * bonus_points) +  
            Math.floor((snakeBody.length/(GRID_SIZE * GRID_SIZE)) * bonus_points)
    steps = 0
    console.log("AI: " + score)
}

export function draw(gameboard) {
    const score2 = document.getElementById("score2")
    score2.textContent = "AI: " + score
}

export function incrStep(){
    steps++
}