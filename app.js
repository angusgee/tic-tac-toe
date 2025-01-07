function player(playerName) {
    return {
        playerName: playerName,
        drawMove: function (row, col) {
            return [row, col];
        },
    };
}
var gameBoard = (function () {
    var boardState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    return {
        boardState: boardState,
        getBoard: function () {
            return boardState;
        },
        updateBoard: function (row, col, newValue) {
            boardState[row][col] = newValue;
            return boardState;
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
        toggleCurrentPlayer: function () {
            return currentPlayer === playerOne
                ? (currentPlayer = playerTwo)
                : (currentPlayer = playerOne);
        },
        isMoveValid: function (row, col) {
            var state = gameBoard.getBoard();
            if (state[row][col] === 1 || state[row][col] === 2)
                return false;
            if (state[row][col] === 0)
                return true;
            else
                return false;
        },
        placeMove: function (row, col) {
            var newValue = currentPlayer === playerOne ? 1 : 2;
            gameBoard.updateBoard(row, col, newValue);
            gameLogic.toggleCurrentPlayer();
        },
        isGameOver: function (board) {
            var isPlayerOneWin = function (num) { return num === 1; };
            var isPlayerTwoWin = function (num) { return num === 2; };
            var topRow = board[0];
            var middleRow = board[1];
            var bottomRow = board[2];
            var leftCol = [board[0][0], board[1][0], board[2][0]];
            var middleCol = [board[0][1], board[1][1], board[2][1]];
            var rightCol = [board[0][2], board[1][2], board[2][2]];
            var topLeftToBottomRight = [
                board[0][0],
                board[1][1],
                board[2][2],
            ];
            var topRightToBottomLeft = [
                board[0][2],
                board[1][1],
                board[2][0],
            ];
            if (topRow.every(isPlayerOneWin))
                return 1;
            if (topRow.every(isPlayerTwoWin))
                return 2;
            if (middleRow.every(isPlayerOneWin))
                return 1;
            if (middleRow.every(isPlayerTwoWin))
                return 2;
            if (bottomRow.every(isPlayerOneWin))
                return 1;
            if (bottomRow.every(isPlayerTwoWin))
                return 2;
            if (leftCol.every(isPlayerOneWin))
                return 1;
            if (leftCol.every(isPlayerTwoWin))
                return 2;
            if (middleCol.every(isPlayerOneWin))
                return 1;
            if (middleCol.every(isPlayerTwoWin))
                return 2;
            if (rightCol.every(isPlayerOneWin))
                return 1;
            if (rightCol.every(isPlayerTwoWin))
                return 2;
            if (topLeftToBottomRight.every(isPlayerOneWin))
                return 1;
            if (topRightToBottomLeft.every(isPlayerTwoWin))
                return 2;
            return 0;
        },
    };
})();
