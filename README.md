# Tic tac toe

## Requirements

### CLI

-   Firstly, store the gameboard as an array inside of a Gameboard object.
-   Each little piece of functionality should be able to fit in the game, player or gameboard objects.
-   Your main goal here is to have as little global code as possible.
-   Make sure you include logic that checks for when the game is over!
-   You should be checking for all winning 3-in-a-rows and ties.
-   Try to avoid thinking about the DOM and your HTML/CSS until your game is working. Don’t worry about taking user input at this point either. You can call your functions and pass arguments to them to play the game yourself and check if everything is working as intended.

### Web app

-   Once you have a working console game, create an object that will handle the display/DOM logic.
-   Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).
-   Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken!
-   Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!

## Class Responsibility Collaborator (CRC) Cards

### Gameboard

#### Responsibilities

-   create the nine squares
-   hold the game state e.g. for each square is it blank, X or O

#### Collaborators

-   DisplayController
-   Players

---

### Players

#### Responsibilities

-   create player
-   place X or O in square

#### Collaborators

-   Gameboard

---

### GameLogic

#### Responsibilities

-   remember whose turn it is
-   start and finish the game

#### Collaborators

-   Gameboard

---

### DisplayController

#### Responsibilities

-   display the game state in the DOM

#### Collaborators

-   Gameboard
