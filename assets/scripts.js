var score = 0;
var timeLeft;
var countdownInterval;
var moleInterval;
var moleChange = new Event("moleChange");
document.addEventListener("moleChange", moveMole);

//Build Game Board on Load of Page
document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");

    createBoard(4, 3);
    randomMole();
    updateScore();

    startCountdown();
});

//Create Board
function createBoard(x, y) {
    let totalSquares = x * y;

    for (let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("data-id", i + 1);

        square.addEventListener("click", whack);

        board.appendChild(square);
    }

    boardMaxWidth(x);
}

// Set a Max width to the board to force wrapping
function boardMaxWidth(x) {
    let square = document.querySelector(".square");
    let squareWidth = parseFloat(window.getComputedStyle(square).width);
    let maxWidth = squareWidth * x;
    board.style.maxWidth = maxWidth + "px";
}

// Show a Mole
function showMole(id) {
    let square = document.querySelector("[data-id='" + id + "']");
    square.classList.add("mole");

    if (typeof moleInterval != "undefined") {
        clearInterval(moleInterval);
    }
    moleInterval = setInterval(function() {
        document.dispatchEvent(moleChange);
    }, 1000);
}

// Randomize which square gets a Mole
function randomMole() {
    let totalSquares = document.querySelectorAll(".square").length;
    let targetId = Math.floor(Math.random() * totalSquares);
    if (targetId == 0) targetId++;
    showMole(targetId);
}

// Clear the mole and move to new spot
function moveMole() {
    let moleSquares = document.querySelectorAll(".square.mole");
    moleSquares.forEach((element, index) => {
        element.classList.remove("mole");
        randomMole();
    });
}

// Check Mole was hit and add score
function whack(event) {
    let targetSquare = event.target;
    // console.log("whack");

    let moleHit = targetSquare.classList.contains("mole");
    // console.log(moleHit);
    if (moleHit) {
        updateMessage("hit");
        addScore();
        updateScore();
        moveMole();
    } else {
        updateMessage("miss");
    }
}

function addScore() {
    score += 10;
}

function updateScore() {
    document.getElementById("score").textContent = score;
}

function startCountdown() {
    timeLeft = 60;
    countdownInterval = setInterval(function() {
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft == 0) {
            clearInterval(countdownInterval);
            gameOver();
        }
        timeLeft--;
    }, 1000);
}

function gameOver() {
    document.removeEventListener("moleChange", moveMole);
    let moleSquares = document.querySelectorAll(".square.mole");
    moleSquares.forEach((element, index) => {
        element.classList.remove("mole");
    });
    updateMessage("Game Over");
}

function updateMessage(msg) {
    let messageEl = document.getElementById("message");
    messageEl.textContent = msg;
}

function clearMessage() {
    let messageEl = document.getElementById("message");
    messageEl.textContent = "";
}
