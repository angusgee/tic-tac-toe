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
            const isPlayerOneWin = (num: number) => num === 1;
            const topRow: number[] = board[0];
            console.log(topRow.every(isPlayerOneWin));
            // check if second row is all 1s or 2s
            // check if third row is all 1s or 2s
            // check if first col is all 1s or 2s
            // check if second col is all 1s or 2s
            // check if third col is all 1s or 2s
            // check top left to bottom right diagonal
            // check top right to bottom left diagonal
            // return 1 if player one wins
            // return 2 if player two wins
            // return 0 if game is not won
        },
    };
})();
