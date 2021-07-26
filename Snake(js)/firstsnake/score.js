import { GRID_SIZE } from './grid.js'
import { snakeBody } from './snake.js'

const base_points = 500
const bonus_points = 250
let steps = 0
let score = 0

export function update() {
    const max_steps = GRID_SIZE * GRID_SIZE - snakeBody.length
    console.log("Player 1: " + steps)
    // score += base_points + Math.floor(bonus_points*(max_steps - steps)/max_steps)
    score += base_points + Math.floor((Math.max(max_steps - steps, 0)/ max_steps) * bonus_points) +  
            Math.floor((snakeBody.length/(GRID_SIZE * GRID_SIZE)) * bonus_points)
    steps = 0
    console.log("Player 1: " + score)
}

export function draw(gameboard) {
    
    const score2 = document.getElementById("score1")
    score2.textContent = "Player 1: " + score
}

export function incrStep() {
    steps++
}