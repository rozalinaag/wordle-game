export function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 5; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
    }
}
