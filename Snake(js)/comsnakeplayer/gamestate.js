export let gameOver = false
export let score = 0

export function setState(bool) {
    gameOver = bool
}

export function updateScore(num) {
    score += num
}

