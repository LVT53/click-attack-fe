let score = 0;
let energy = 5;

const attacks = [];

const scoreDisplay = document.getElementById("score");
const title = document.getElementById("title");
const attackButton = document.getElementById("attackButton");
const resetButton = document.getElementById("resetButton");
const powerButton = document.getElementById("powerButton");

const playerNameInput = document.getElementById("playerName");
const attackValueInput = document.getElementById("attackValue");
const message = document.getElementById("message");

const historyList = document.getElementById("history");
const attackCount = document.getElementById("attackCount");
const largestAttack = document.getElementById("largestAttack");
const energyDisplay = document.getElementById("energy");

function updateDisplay() {
    scoreDisplay.innerText = score;
    attackCount.innerText = attacks.length;
    largestAttack.innerText = findLargestAttack(attacks);
    energyDisplay.innerText = energy;
    updateHistory();

    if (score >= 20) {
        title.innerText = "YOU WIN!";
        attackButton.disabled = true;
        powerButton.disabled = true;
    } else {
        title.innerText = "Click Attack";
        attackButton.disabled = false;
        powerButton.disabled = false;
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

function getPlayerName() {
    const playerName = playerNameInput.value.trim();

    if (playerName === "") {
        message.innerText = "Please enter your name.";
        return null;
    }

    return playerName;
}

function calculateDamage(baseDamage, isCritical) {
    if (isCritical) {
        return baseDamage * 2;
    }

    return baseDamage;
}

function findLargestAttack(values) {
    if (values.length === 0) {
        return 0;
    }

    let largest = values[0];

    for (let index = 0; index < values.length; index++) {
        if (values[index] > largest) {
            largest = values[index];
        }
    }

    return largest;
}

function applyAttack(playerName, baseDamage, isCritical) {
    const damage = calculateDamage(baseDamage, isCritical);

    score += damage;
    attacks.push(damage);
    energy--;

    message.innerText = `${playerName} caused ${damage} damage.`;
    updateDisplay();
}

function canAttack() {
    if (energy <= 0) {
        message.innerText = "You are out of energy. Press Reset to play again.";
        return false;
    }

    return true;
}

function performAttack() {
    if (!canAttack()) {
        return;
    }

    const playerName = getPlayerName();

    if (playerName === null) {
        return;
    }

    const attackValue = getAttackValue();

    if (attackValue === null) {
        return;
    }

    const isCritical = attackValue === 10;
    applyAttack(playerName, attackValue, isCritical);
}

function performPowerAttack() {
    if (!canAttack()) {
        return;
    }

    const playerName = getPlayerName();

    if (playerName === null) {
        return;
    }

    applyAttack(playerName, 5, false);
}

function updateHistory() {
    historyList.innerHTML = "";

    for (let index = 0; index < attacks.length; index++) {
        const listItem = document.createElement("li");
        listItem.innerText = `Attack ${index + 1}: ${attacks[index]} damage`;
        historyList.appendChild(listItem);
    }
}

function resetGame() {
    score = 0;
    energy = 5;
    attacks.length = 0;
    playerNameInput.value = "";
    attackValueInput.value = "1";
    title.innerText = "Click Attack";
    message.innerText = "Enter your name and choose an attack value.";
    updateDisplay();
}

attackButton.addEventListener("click", performAttack);
powerButton.addEventListener("click", performPowerAttack);
resetButton.addEventListener("click", resetGame);

updateDisplay();
