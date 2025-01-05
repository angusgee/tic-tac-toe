function player(playerName: string): object {
    return {
        playerName: playerName,
        drawMove(row: number, col: number): number[] {
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

function gameLogic() {
    return {
        isPlayerATurn: true,
        isMoveValid() {
            return 0;
        },
        isGameOver() {
            return 0;
        },
    };
}
