let EMPTY = 0, X = 1, O = 2;
let board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let buttons = [
    [],
    [],
    []
]
let runs = [
    // diagonal
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
    // horizontal
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // vertical
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
]
let gameOver = false;
let defaultStartMessage = "Play tic-tac-toe! Click on the grid above to place your X's!"

function postEndGameMessage(message) {
    document.getElementById("gameOverMessage").innerText = "Game Over! " + message;
}

function checkPlayerWin(piece) {
    for (let run of runs) {
        let didWin = true;
        for (let coord of run) {
            let x = coord[0], y = coord[1];
            if (board[y][x] != piece) {
                didWin = false;
                break;
            }
        }
        if (didWin == true) {
            gameOver = true;
            return;
        }
    }
}

function doAIWin() {
    postEndGameMessage("You lost.")
}

function placeAIPiece() {
    for (let run of runs) {
        let enemyPiecesInRun = 0;
        let emptyCellsInRun = 0;
        for (let coord of run) {
            let x = coord[0], y = coord[1];
            if (board[y][x] == X) {
                enemyPiecesInRun += 1;
            } else if (board[y][x] == EMPTY) {
                emptyCellsInRun += 1;
            }
        }
        if (enemyPiecesInRun == 2 && emptyCellsInRun == 1) {
            for (let coord of run) {
                let x = coord[0], y = coord[1];
                if (board[y][x] == EMPTY) {
                    board[y][x] = O;
                    return;
                }
            }
        }
    }
    for (let run of runs) {
        let isGoodPlacement = true;
        let spots = [];
        let spotCount = 0;
        for (let coord of run) {
            let x = coord[0], y = coord[1];
            if (board[y][x] == X) {
                isGoodPlacement = false;
                break;
            } else if (board[y][x] == EMPTY) {
                spots.push(coord);
                spotCount += 1;
            }
        }
        if (isGoodPlacement && spotCount > 0) {
            let index = Math.round(Math.random() * (spotCount - 1));
            board[spots[index][1]][spots[index][0]] = O;
            return;
        }
    }
}

function aiMove() {
    placeAIPiece();
    checkPlayerWin(O);
    if (gameOver) {
        doAIWin();
    }
}

function doPlayerWin() {
    postEndGameMessage("You win!")
}

function doTie() {
    postEndGameMessage("You tied!")
}

function updateBoard() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            let value = board[y][x];
            if (value == X) {
                buttons[y][x].innerText = "X";
            } else if (value == O) {
                buttons[y][x].innerText = "O";
            } else {
                buttons[y][x].innerText = ".";
            }
        }
    }
}

function checkBoardFull() {
    for (let row of board) {
        for (let cell of row) {
            if (cell == EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function playerMove(x, y) {
    if (board[y][x] == EMPTY && !gameOver) {
        board[y][x] = X;
        if (checkBoardFull()) {
            doTie();
        } else {
            checkPlayerWin(X);
            if (!gameOver) {
                aiMove(x, y);
            } else {
                doPlayerWin();
            }
        }
    }
    updateBoard();
}

function resetBoard() {
    for (let row of board) {
        for (let i in row) {
            row[i] = EMPTY;
        }
    }
    updateBoard();
    document.getElementById("gameOverMessage").innerText = defaultStartMessage;
    gameOver = false;
}

let table = document.getElementById("ticTacToeTable");
for (let y = 0; y < 3; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < 3; x++) {
        let button = document.createElement("button");
        button.addEventListener("click", function() {
            playerMove(x, y);
        });
        button.className = "ticTacToeButton"
        button.innerText = "."
        buttons[y][x] = button;
        row.appendChild(button);
    }
    table.appendChild(row);
}

document.getElementById("resetButton").addEventListener("click", resetBoard);
resetBoard();