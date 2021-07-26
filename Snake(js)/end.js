import { gameOver as end1 } from "./firstsnake/snakeGame.js";
import { gameOver as end2 } from "./secsnake/gamestate.js";
import { gameOver as endAI } from "./comsnakeplayer/gamestate.js";

export function endGame() {
    if (end1 && (end2 || endAI)) {
        const endpage = document.getElementById("end")
        endpage.style.display = "block"
    } 
}