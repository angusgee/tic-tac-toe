type player = {
    playerName: string;
    drawMove: (row: number, col: number) => number[];
};

function player(playerName: string): object {
    return {
        playerName,
        drawMove(row: number, col: number) {
            return [row, col];
        },
    };
}

const gameBoard = (function (): object {
    return {
        createBoard() {
            return [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
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
        isMoveValid() {
            return 0;
        },
        isGameOver() {
            return 0;
        },
    };
})();
