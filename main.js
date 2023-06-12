// query selectors
var nineBoxes = document.querySelectorAll('.box')


// global variables

var currentPlayers;
var gameBoard = {
    gameBoardPositions: ['', '', '', '', '', '', '', '', ''],
    turn: 2,
    // playerIcons: ['🧞‍♂️', '🧞‍♀️'],
    winningCombos: [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['1','4','7'],
        ['2','5','8'],
        ['3','6','9'],
        ['1','5','9'],
        ['3','5','7'],
    ]
}
// have choose their own icon

// event listeners
document.addEventListener('DOMContentLoaded', function() {
    setGame()
})

nineBoxes.forEach(function(box) {
    box.addEventListener('click', function(event) {
    placeToken(event);
    });
});

// data model

function createPlayers(id, token) {
    return {
        id: id,
        token: token,
        wins: 0,
        isTurn: false
    }
}

function addPlayersToGameboard() {
    gameBoard.players = []
    gameBoard.players.push(createPlayers('alpha', '🧞‍♂️'), createPlayers('omega', '🧞‍♀️'))
    return gameBoard
}

function setGame() {
    gameBoard = addPlayersToGameboard()
    var firstPlayer = determineFirstTurn(gameBoard)
    if (firstPlayer === 'alpha') {
        gameBoard.players[0].isTurn = true
        gameBoard.players[1].isTurn = false
    } else if (firstPlayer === 'omega') {
        gameBoard.players[0].isTurn = false
        gameBoard.players[1].isTurn = false
    }
}

// function updatePlayerPositions(gameBoard) {
//     nineBoxes.forEach(function(box) {
//         gameBoard.positions = event.target
//         });
//     }

function determineFirstTurn(gameBoard) {
    if (gameBoard.turn % 2 === 0) {
        gameBoard.players[0].isTurn = true
        gameBoard.players[1].isTurn = false
        return 'alpha'
    } else {
        gameBoard.players[0].isTurn = false
        gameBoard.players[1].isTurn = true
        return 'omega'
    }
}

function determineTurn(gameBoard) {
 for (var i = 0; i < gameBoard.players.length; i++) {
    if (gameBoard.players[i].isTurn === true) {
        return gameBoard.players[i].id
    }
 }
}

// function determineNonFirstTurn(gameBoard) {
//     if (gameBoard.turns % 2 === 0) {
//         gameBoard.players[0].isTurn = true
//         return 'alpha'
//     } else {
//         gameBoard.players[1].isTurn = true
//         return 'omega'
//     }
// }

function swapTurns() {
    for (var i = 0; i < gameBoard.players.length; i++) {
        if (gameBoard.players[i].isTurn === true) {
            gameBoard.players[i].isTurn = false
        } else if (gameBoard.players[i].isTurn === false) {
            gameBoard.players[i].isTurn = true
        }
    }
}

function increaseWins(player) {
    player.wins ++
}


//-------------- DOM FUNCTIONS -----------------//
  
  function placeToken(event) {
    var alphaToken = gameBoard.players[0].token;
    var omegaToken = gameBoard.players[1].token;
    console.log(event.target);
  
    var clickedIndex = Array.from(nineBoxes).indexOf(event.target);
    
    if (gameBoard.gameBoardPositions.every(position => position === '')) {
      if (determineFirstTurn(gameBoard) === 'alpha') {
        gameBoard.gameBoardPositions[clickedIndex] = alphaToken;
        event.target.innerHTML += alphaToken;
      } else if (determineFirstTurn(gameBoard) === 'omega') {
        gameBoard.gameBoardPositions[clickedIndex] = omegaToken;
        event.target.innerHTML += omegaToken;
      }
    } else {
      if (determineTurn(gameBoard) === 'alpha') {
        gameBoard.gameBoardPositions[clickedIndex] = alphaToken;
        event.target.innerHTML += alphaToken;
      } else if (determineTurn(gameBoard) === 'omega') {
        gameBoard.gameBoardPositions[clickedIndex] = omegaToken;
        event.target.innerHTML += omegaToken;
      }
    }
    
    swapTurns();
  }
  



// event.target.innerHTML += `<span role="img" aria-label="red-icon" title="red-icon">${gameBoard.players[i].token}</span>`



// function switchPlayers() {

// }


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
        