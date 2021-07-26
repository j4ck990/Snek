import { gameOver as end1} from "./firstsnake/snakeGame.js";
import { score as score1} from "./firstsnake/score.js";
import { gameOver as end2, score as score2} from "./secsnake/gamestate.js";
import { gameOver as endAI, score as scoreAI} from "./comsnakeplayer/gamestate.js";

export function endGame() {
    if (end1 && (end2 || endAI)) {
        const winbanner = document.getElementById("winban")
        const butt = document.getElementById("button1")
        const butt2 = document.getElementById("button2")
        
        let otherscore = 0;
        if (end2) {
            otherscore = score2
            if (otherscore > score1) {
                winbanner.textContent = "Player 2 Wins !!!"
            } else {
                winbanner.textContent = "Player 1 Wins !!!"
            }
        } else {
            otherscore = scoreAI
            if (otherscore > score1) {
                winbanner.textContent = "AI Overlord wins !!!"
                // butt2.setAttribute('href', "../index.html")
                // butt2.href = "../index.html"
            } else {
                winbanner.textContent = "I Demand a Rematch"
                butt.textContent = "REMATCH"
                // butt2.setAttribute('href', "./com.html")
                // // butt2.href = "./com.html"
            }
        }
        const endpage = document.getElementById("end")
        endpage.style.display = "block"
    } 
}