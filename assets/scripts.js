document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");

    createBoard(4, 3);
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
