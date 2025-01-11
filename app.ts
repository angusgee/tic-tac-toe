type Player = {
    playerName: string;
};

function player(playerName: string): Player {
    return {
        playerName,
    };
}

type GameBoard = {
    boardState: number[][];
    getBoard: () => number[][];
    updateBoard: (row: number, col: number, newValue: number) => number[][];
    resetBoard: () => number[][];
};

const gameBoard = (function (): GameBoard {
    let boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    return {
        boardState,
        getBoard() {
            return boardState;
        },
        updateBoard(row, col, newValue) {
            boardState[row][col] = newValue;
            return boardState;
        },
        resetBoard() {
            boardState = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
            return boardState;
        },
    };
})();

const gameLogic = (function () {
    const playerOne = player("PlayerOne");
    const playerTwo = player("PlayerTwo");

    let currentPlayer = playerOne;

    return {
        getCurrentPlayer(): Player {
            return currentPlayer;
        },
        toggleCurrentPlayer(): Player {
            return currentPlayer === playerOne
                ? (currentPlayer = playerTwo)
                : (currentPlayer = playerOne);
        },
        isMoveValid(row: number, col: number): boolean {
            let state = gameBoard.getBoard();
            if (state[row][col] === 1 || state[row][col] === 2) return false;
            if (state[row][col] === 0) return true;
            else return false;
        },
        placeMove(row: number, col: number) {
            const newValue = currentPlayer === playerOne ? 1 : 2;
            gameBoard.updateBoard(row, col, newValue);
            gameLogic.toggleCurrentPlayer();
        },
        isGameOver(board: number[][]) {
            const isPlayerOneWin = (num: number) => num === 1;
            const isPlayerTwoWin = (num: number) => num === 2;
            const topRow: number[] = board[0];
            const middleRow: number[] = board[1];
            const bottomRow: number[] = board[2];

            const leftCol: number[] = [board[0][0], board[1][0], board[2][0]];
            const middleCol: number[] = [board[0][1], board[1][1], board[2][1]];
            const rightCol: number[] = [board[0][2], board[1][2], board[2][2]];

            const topLeftToBottomRight: number[] = [
                board[0][0],
                board[1][1],
                board[2][2],
            ];

            const topRightToBottomLeft: number[] = [
                board[0][2],
                board[1][1],
                board[2][0],
            ];

            if (topRow.every(isPlayerOneWin)) return 1;
            if (topRow.every(isPlayerTwoWin)) return 2;
            if (middleRow.every(isPlayerOneWin)) return 1;
            if (middleRow.every(isPlayerTwoWin)) return 2;
            if (bottomRow.every(isPlayerOneWin)) return 1;
            if (bottomRow.every(isPlayerTwoWin)) return 2;

            if (leftCol.every(isPlayerOneWin)) return 1;
            if (leftCol.every(isPlayerTwoWin)) return 2;
            if (middleCol.every(isPlayerOneWin)) return 1;
            if (middleCol.every(isPlayerTwoWin)) return 2;
            if (rightCol.every(isPlayerOneWin)) return 1;
            if (rightCol.every(isPlayerTwoWin)) return 2;

            if (topLeftToBottomRight.every(isPlayerOneWin)) return 1;
            if (topLeftToBottomRight.every(isPlayerTwoWin)) return 2;
            if (topRightToBottomLeft.every(isPlayerOneWin)) return 1;
            if (topRightToBottomLeft.every(isPlayerTwoWin)) return 2;

            const isDraw = board.every((row) =>
                row.every((cell) => cell !== 0)
            );
            if (isDraw) return 3;

            return 0;
        },
    };
})();

const displayController = (function () {
    function initBoard() {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.addEventListener("click", handleCardClick);
        });

        const resetButton = document.getElementById("reset-button");
        if (resetButton) {
            resetButton.addEventListener("click", resetGame);
        }
    }

    function resetGame() {
        gameBoard.resetBoard();
        updateDisplay();

        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.textContent = "";
            messageElement.appendChild(
                document.getElementById("reset-button") || createResetButton()
            );
        }
    }

    function createResetButton() {
        const button = document.createElement("button");
        button.id = "reset-button";
        button.textContent = "Reset Game";
        button.addEventListener("click", resetGame);
        return button;
    }

    function handleCardClick(event: Event) {
        const card = event.target as HTMLElement;
        const row = parseInt(card.dataset.row || "0");
        const col = parseInt(card.dataset.col || "0");

        if (gameLogic.isMoveValid(row, col)) {
            gameLogic.placeMove(row, col);
            updateDisplay();

            const gameStatus = gameLogic.isGameOver(gameBoard.getBoard());
            if (gameStatus !== 0) {
                displayGameOver(gameStatus);
            }
        }
    }

    function updateDisplay() {
        const cards = document.querySelectorAll(".card");
        const board = gameBoard.getBoard();

        cards.forEach((card) => {
            const element = card as HTMLElement;
            const row = parseInt(element.dataset.row || "0");
            const col = parseInt(element.dataset.col || "0");

            if (board[row][col] === 1) {
                element.textContent = "X";
            } else if (board[row][col] === 2) {
                element.textContent = "O";
            } else {
                element.textContent = "";
            }
        });
    }

    function displayGameOver(winner: number) {
        const messageElement = document.getElementById("message");
        if (messageElement) {
            const messageText =
                winner === 3
                    ? "Game Over - It's a Draw!"
                    : winner === 1
                    ? "Player One (X) wins!"
                    : "Player Two (O) wins!";

            messageElement.innerHTML = `<div>${messageText}</div>`;
            messageElement.appendChild(
                document.getElementById("reset-button") || createResetButton()
            );
        }
    }

    return {
        initBoard,
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    displayController.initBoard();
});
