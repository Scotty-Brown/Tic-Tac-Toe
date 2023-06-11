// query selectors
var nineBoxes = document.querySelectorAll('box')

// global variables

var currentPlayer;
var gameBoard = {
    players: [],
    turn: 0,
    playerIcons: ['🧞‍♂️', '🧞‍♀️'],
    winningCombos: [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ]
}
// have player choose their own icon

// event listeners

// data model

function createPlayer(icon) {
    return {
        id: Date.now(),
        token: icon,
        wins: 0,
    } 
}

function assignPlayerIcon() {
    var playerIcons = [
        '<span role="img" aria-label="BlueIcon" title="BlueIcon">🧞‍♂️</span>',
        '<span role="img" aria-label="RedIcon" title="RedIcon">🧞‍♀️</span>'
    ]
    for (var i = 0; i < playerIcons.length; i++) {
        gameBoard.players.push(createPlayer(playerIcons[i]))
    } 
  }
  

function increaseWins(player) {
    player.wins ++
    return player
}

function switchPlayers() {

}


// DOM


// for whos turn function -
    // logic can detect odd or even number and that coincides with each players turn and then when its re initiated it adds one to turn and redoes process it could also take which turn it is by using it as an argument in the function and then just calling the same function to restart game

//pseudocode
    // i have two players and a gameboard
    // when the page loads it should be a random players turn
    // each click should switch players
        // a function that creates object that stores each players info
        // a function that increaseWins - increase the count of current players wins
        // a function that keeps track of the data for the game board
        // a function that keeps track of which plays turn it currently is
        // a function that checks the game board data for win conditions
        // a function that detects when a game is a draw
        // a function that resets the game boards data to begin a new game
        