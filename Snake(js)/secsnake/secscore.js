import { GRID_SIZE } from './secgrid.js'
import { snakeBody } from './secsnake.js'

const base_points = 500
const bonus_points = 500
let steps = 0
let score = 0

export function update() {
    const max_steps = GRID_SIZE * GRID_SIZE - snakeBody.length
    score += base_points + Math.floor(bonus_points*(max_steps - steps)/max_steps)
    steps = 0
    console.log("Player 2: " + score)
}

export function draw(gameboard) {
    steps++
    var canvas = document.getElementById("score1");
    // var ctx = canvas.getContext("2d");
    // ctx.font = "30px Arial";
    // ctx.textAlign = "center";
    // ctx.fillText("Score: " + score, 10, 50);
}