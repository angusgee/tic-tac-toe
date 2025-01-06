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
            return [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
        },
        getCurrentBoard: function () {
            return [
                [0, 2, 0],
                [0, 1, 0],
                [0, 1, 2],
            ];
        },
        updateBoard: function () {
            return [];
        },
    };
})();
var gameLogic = (function () {
    var playerOne = player("PlayerOne");
    var playerTwo = player("PlayerTwo");
    var currentPlayer = playerOne;
    return {
        getCurrentPlayer: function () {
            return currentPlayer;
        },
        isMoveValid: function (row, col) {
            var state = gameBoard.getCurrentBoard();
            if (state[row][col] === 1 || state[row][col] === 2)
                return false;
            if (state[row][col] === 0)
                return true;
        },
        isGameOver: function (board) {
            return false;
        },
    };
})();
