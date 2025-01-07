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
            if (topRightToBottomLeft.every(isPlayerTwoWin)) return 2;

            return 0;
        },
    };
})();

const displayController = (function () {})();
