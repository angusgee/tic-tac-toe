function player(playerName) {
    return {
        playerName: playerName,
        drawMove: function (row, col) {
            return [row, col];
        },
    };
}
var gameBoard = (function () {
    return {
        createBoard: function () {
            console.log([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]);
            return [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
        },
    };
})();
function gameLogic() {
    return {
        isPlayerATurn: true,
        isMoveValid: function () {
            return 0;
        },
        isGameOver: function () {
            return 0;
        },
    };
}
