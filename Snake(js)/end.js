import { gameOver as end1 } from "./firstsnake/snakeGame.js";
import { gameOver as end2 } from "./secsnake/secsnakeGame.js";
// import { gameOver as endAI } from "./comsnakeplayer/comsnakeGame.js";

export function endGame() {
    if (end1 && (end2 || endAI)) {
        const endpage = document.getElementById("end")
        endpage.style.display = "block"
    } 
}