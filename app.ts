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
            return [
                [0, 2, 0],
                [0, 1, 0],
                [0, 1, 2],
            ];
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
            if (state[row][col] === 1 || state[row][col] === 2) return false;
            if (state[row][col] === 0) return true;
        },
        isGameOver(board: number[][]) {
            return false;
        },
    };
})();
