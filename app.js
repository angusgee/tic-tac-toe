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
        },
        isGameOver: function (board) {
            var isPlayerOneWin = function (num) { return num === 1; };
            var topRow = board[0];
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
