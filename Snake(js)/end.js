import { gameOver as end1} from "./firstsnake/snakeGame.js";
import { score as score1} from "./firstsnake/score.js";
import { gameOver as end2, score as score2} from "./secsnake/gamestate.js";
import { gameOver as endAI, score as scoreAI} from "./comsnakeplayer/gamestate.js";

export function endGame() {
    if (end1 && (end2 || endAI)) {
        const winbanner = document.getElementById("winban")
        const butt = document.getElementById("button1")
        
        let otherscore = 0;
        if (end2) {
            otherscore = score2
            if (otherscore > score1) {
                winbanner.textContent = "Player 2 Wins !!!"
            } else if (otherscore === score1) {
                winbanner.textContent = "It's a draw"
            } else {
                winbanner.textContent = "Player 1 Wins !!!"
            }
        } else {
            otherscore = scoreAI
            if (otherscore > score1) {
                winbanner.textContent = "AI Overlord wins !!!"
            } else if (otherscore === score1) {
                winbanner.textContent = "It's a draw"
            } else if(localStorage.getItem("difficulty") == 10){
                winbanner.textContent = "Impossible! I Demand a Rematch"
                butt.textContent = "REMATCH"
                const butt2 = document.getElementById("button2")
                const buttG = document.getElementById("gimmick")
                butt2.style.display = "none"
                buttG.style.display = "block"
            } else {
                winbanner.textContent = "You win !!!"
            }
        }
        const endpage = document.getElementById("end")
        endpage.style.display = "block"
    } 
}