type Player = {
    playerName: string;
    drawMove: (row: number, col: number) => number[];
};

function player(playerName: string): Player {
    return {
        playerName,
        drawMove(row: number, col: number) {
            return [row, col];
        },
    };
}

type GameBoard = {
    createBoard: () => number[][];
    getCurrentBoard: () => number[][];
    updateBoard: () => number[][];
};

const gameBoard = (function (): GameBoard {
    return {
        createBoard() {
            return [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
        },
        getCurrentBoard() {
            return [];
        },
        updateBoard() {
            return [];
        },
    };
})();

const gameLogic = (function () {
    const playerOne = player("PlayerOne");
    const playerTwo = player("PlayerTwo");

    let currentPlayer = playerOne;

    return {
        getCurrentPlayer() {
            return currentPlayer;
        },
        isMoveValid(row: number, col: number) {
            let state = gameBoard.getCurrentBoard();
            // check using the row and col values
            // return false if 1 or 2
            // else if 0 return true
            return true;
        },
        isGameOver(board: number[][]) {
            return false;
        },
    };
})();
