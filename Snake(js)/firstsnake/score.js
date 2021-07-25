import { GRID_SIZE } from './grid.js'
import { snakeBody } from './snake.js'

const base_points = 500
const bonus_points = 500
let steps = 0
let score = 0

export function update() {
    const max_steps = GRID_SIZE * GRID_SIZE - snakeBody.length
    score += base_points + Math.floor(bonus_points*(max_steps - steps)/max_steps)
    steps = 0
    console.log("Player 1: " + score)
}

export function draw(gameboard) {
    steps++
    const score2 = document.getElementById("score1")
    score2.textContent = "Player 1:" + score
}