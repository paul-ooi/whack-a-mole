var score = 0;
var timeLeft;
var moleInterval;
var moleChange = new Event("moleChange");
document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");

    createBoard(4, 3);
    randomMole();
});
document.addEventListener("moleChange", function() {
    console.log("moleChange Fired");
    moveMole();
    // setInterval(moveMole, 1000);
});

//Create Board
function createBoard(x, y) {
    let totalSquares = x * y;

    for (let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("data-id", i + 1);

        square.addEventListener("mouseup", whack);

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
    });

    randomMole();
}

// Check Mole was hit and add score
function whack(event) {
    let targetSquare = event.target;
    let moleHit = targetSquare.classList.contains("mole");
    if (moleHit) {
        targetSquare.classList.remove("mole");
        score++;

        document.getElementById("score").textContent = score;
        moveMole();
    }
}
