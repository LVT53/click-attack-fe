let score = 0;

const scoreDisplay = document.getElementById("score");
const title = document.getElementById("title");
const attackButton = document.getElementById("attackButton");
const resetButton = document.getElementById("resetButton");
const powerButton = document.getElementById("powerButton");

function updateDisplay() {
    scoreDisplay.innerText = score;

    if (score >= 20) {
        title.innerText = "You win!";
    }
}

// TODO: create addPoint()
function addPoint() {
    score++;
    updateDisplay();
}
function addPowerPoint() {
    score += 5;
    updateDisplay();
}
// TODO: create resetGame()
function resetGame() {
    score = 0;
    updateDisplay();
    title.innerText = "Click Attack";
}
// TODO: connect both functions to buttons
attackButton.addEventListener("click", addPoint);
powerButton.addEventListener("click", addPowerPoint);
resetButton.addEventListener("click", resetGame);