function player(playerName) {
    return {
        playerName: playerName,
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
        resetBoard: function () {
            boardState = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
            return boardState;
        },
    };
})();
var gameLogic = (function () {
    var playerOne = player("Player One");
    var playerTwo = player("Player Two");
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
        updatePlayerNames: function () {
            var p1Input = document.getElementById("player-one");
            var p2Input = document.getElementById("player-two");
            if (p1Input === null || p1Input === void 0 ? void 0 : p1Input.value)
                playerOne.playerName = p1Input.value;
            if (p2Input === null || p2Input === void 0 ? void 0 : p2Input.value)
                playerTwo.playerName = p2Input.value;
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
            if (topLeftToBottomRight.every(isPlayerTwoWin))
                return 2;
            if (topRightToBottomLeft.every(isPlayerOneWin))
                return 1;
            if (topRightToBottomLeft.every(isPlayerTwoWin))
                return 2;
            var isDraw = board.every(function (row) {
                return row.every(function (cell) { return cell !== 0; });
            });
            if (isDraw)
                return 3;
            return 0;
        },
    };
})();
var displayController = (function () {
    function initBoard() {
        var cards = document.querySelectorAll(".card");
        cards.forEach(function (card) {
            card.addEventListener("click", handleCardClick);
        });
        var resetButton = document.getElementById("reset-button");
        if (resetButton) {
            resetButton.addEventListener("click", resetGame);
        }
    }
    function resetGame() {
        gameBoard.resetBoard();
        updateDisplay();
        var messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.innerHTML = "<div class=\"player-inputs\">\n                <input type=\"text\" id=\"player-one\" placeholder=\"Player One (X)\">\n                <input type=\"text\" id=\"player-two\" placeholder=\"Player Two (O)\">\n            </div>";
            messageElement.appendChild(document.getElementById("reset-button") || createResetButton());
        }
    }
    function createResetButton() {
        var button = document.createElement("button");
        button.id = "reset-button";
        button.textContent = "Reset Game";
        button.addEventListener("click", resetGame);
        return button;
    }
    function handleCardClick(event) {
        var card = event.target;
        var row = parseInt(card.dataset.row || "0");
        var col = parseInt(card.dataset.col || "0");
        if (gameLogic.isMoveValid(row, col)) {
            gameLogic.placeMove(row, col);
            updateDisplay();
            var gameStatus = gameLogic.isGameOver(gameBoard.getBoard());
            if (gameStatus !== 0) {
                displayGameOver(gameStatus);
            }
        }
    }
    function updateDisplay() {
        var cards = document.querySelectorAll(".card");
        var board = gameBoard.getBoard();
        cards.forEach(function (card) {
            var element = card;
            var row = parseInt(element.dataset.row || "0");
            var col = parseInt(element.dataset.col || "0");
            if (board[row][col] === 1) {
                element.textContent = "X";
            }
            else if (board[row][col] === 2) {
                element.textContent = "O";
            }
            else {
                element.textContent = "";
            }
        });
    }
    function displayGameOver(winner) {
        var messageElement = document.getElementById("message");
        if (messageElement) {
            gameLogic.updatePlayerNames();
            var currentPlayer = gameLogic.getCurrentPlayer();
            var p1Input = document.getElementById("player-one");
            var p2Input = document.getElementById("player-two");
            var winnerName = winner === 1
                ? (p1Input === null || p1Input === void 0 ? void 0 : p1Input.value) || "Player One (X)"
                : (p2Input === null || p2Input === void 0 ? void 0 : p2Input.value) || "Player Two (O)";
            var messageText = winner === 3
                ? "Game Over - It's a Draw!"
                : "".concat(winnerName, " wins!");
            messageElement.innerHTML = "<div class=\"player-inputs\">\n                <input type=\"text\" id=\"player-one\" placeholder=\"Player One (X)\">\n                <input type=\"text\" id=\"player-two\" placeholder=\"Player Two (O)\">\n            </div>\n            <div class=\"win-message\">".concat(messageText, "</div>");
            messageElement.appendChild(document.getElementById("reset-button") || createResetButton());
        }
    }
    return {
        initBoard: initBoard,
    };
})();
document.addEventListener("DOMContentLoaded", function () {
    displayController.initBoard();
});
