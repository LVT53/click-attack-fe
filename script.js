let score = 0;

const scoreDisplay = document.getElementById("score");
const title = document.getElementById("title");
const attackButton = document.getElementById("attackButton");
const resetButton = document.getElementById("resetButton");
const powerButton = document.getElementById("powerButton");

const playerNameInput = document.getElementById("playerName");
const attackValueInput = document.getElementById("attackValue");
const message = document.getElementById("message");

function updateDisplay() {
    scoreDisplay.innerText = score;

    if (score >= 20) {
        title.innerText = "You win!";
    }
}

function getAttackValue() {
    const rawValue = attackValueInput.value.trim();

    if (rawValue === "") {
        message.innerText = "Please enter a valid number.";
        return null;
    }

    const attackValue = Number(rawValue);

    if (Number.isNaN(attackValue)) {
        message.innerText = "Please enter a valid number.";
        return null;
    }

    if (attackValue < 1 || attackValue > 10) {
        message.innerText = "Choose an attack value from 1 to 10.";
        return null;
    }

    return attackValue;
}

function calculateDamage(baseDamage, isCritical) {
    if (isCritical) {
        return baseDamage * 2;
    }

    return baseDamage;
}

function performAttack() {
    const playerName = playerNameInput.value.trim();
    const attackValue = getAttackValue();

    if (playerName === "") {
        message.innerText = "Please enter your name.";
        return;
    }

    if (attackValue === null) {
        return;
    }

    const isCritical = attackValue === 10;
    const damage = calculateDamage(attackValue, isCritical);

    score += damage;
    message.innerText = `${playerName} caused ${damage} damage.`;
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
attackButton.addEventListener("click", performAttack);
powerButton.addEventListener("click", addPowerPoint);
resetButton.addEventListener("click", resetGame);