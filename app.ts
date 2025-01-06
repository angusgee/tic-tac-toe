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
        getBoard() {
            return boardState;
        },
        updateBoard() {
            // to-do: return a new array with the updated values
            return [
                [0, 2, 0],
                [0, 1, 0],
                [0, 1, 2],
            ];
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
        isMoveValid(row: number, col: number): boolean {
            let state = gameBoard.getBoard();
            if (state[row][col] === 1 || state[row][col] === 2) return false;
            if (state[row][col] === 0) return true;
            else return false;
        },
        placeMove(row: number, col: number) {
            const newValue = currentPlayer === playerOne ? 1 : 2;
            gameBoard.updateBoard(row, col, newValue);
        },
        isGameOver(board: number[][]) {
            return false;
        },
    };
})();
