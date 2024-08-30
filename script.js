const symbols = ["🍺", "🍷", "$", "💵", "💰", "🍻"]; // Beer, wine, and money-themed symbols
const jackpots = ["🍻"]; // Define a jackpot symbol if needed
let balance = 450;

document.getElementById('spin-button').addEventListener('click', spinReels);

function spinReels() {
    const betAmount = parseInt(document.getElementById('bet').value);
    if (betAmount > balance) {
        displayMessage("Insufficient balance!");
        return;
    }

    balance -= betAmount;
    updateBalance();

    const reel1 = getRandomSymbol();
    const reel2 = getRandomSymbol();
    const reel3 = getRandomSymbol();

    const reel1Element = document.getElementById('reel1');
    const reel2Element = document.getElementById('reel2');
    const reel3Element = document.getElementById('reel3');

    startSpinning([reel1Element, reel2Element, reel3Element]);

    setTimeout(() => {
        stopSpinning([reel1Element, reel2Element, reel3Element], [reel1, reel2, reel3]);

        checkWin(reel1, reel2, reel3, betAmount);
    }, 2000);
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function startSpinning(reels) {
    reels.forEach(reel => {
        reel.innerHTML = "";
        reel.style.animationPlayState = "running";
    });
}

function stopSpinning(reels, symbols) {
    reels.forEach((reel, index) => {
        reel.innerHTML = symbols[index];
        reel.style.animationPlayState = "paused";
    });
}

function checkWin(reel1, reel2, reel3, betAmount) {
    if (reel1 === reel2 && reel2 === reel3) {
        if (jackpots.includes(reel1)) {
            const winAmount = betAmount * 10; // Jackpot win
            balance += winAmount;
            displayMessage("Jackpot! You won $" + winAmount + "!");
        } else {
            const winAmount = betAmount * 5; // Regular win
            balance += winAmount;
            displayMessage("You won $" + winAmount + "!");
        }
    } else {
        displayMessage("Try again!");
    }

    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').innerText = balance;
}

function displayMessage(message) {
    document.getElementById('message').innerText = message;
}
