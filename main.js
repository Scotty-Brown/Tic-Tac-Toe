// query selectors
var nineBoxes = document.querySelectorAll('.box')
var playerBanner = document.querySelector('.player-banner')
var leftWinCount = document.querySelector('.left-count-display')
var rightWinCount = document.querySelector('.right-count-display')

// global variables

var currentWinner = ''
var gameBoard = {
  gameBoardPositions: ['', '', '', '', '', '', '', '', ''],
  round: 1,
  winningCombos: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
}

// event listeners
document.addEventListener('DOMContentLoaded', function () {
  setInitialGame()
  updateBannerDisplay()
  displayPlayerWinCount()
})

nineBoxes.forEach(function (box) {
  box.addEventListener('click', function (event) {
    if (currentWinner === '') {
      validateGameBoardPosition(event)
      if (checkForWins() === null && checkForDraws()) {
        setTimeout(() => {
          resetBoard(nineBoxes)
        }, 5000)
      } else if (checkForWins() !== null) {
        handleWin(checkForWins())
        setTimeout(() => {
          resetBoard(nineBoxes)
        }, 5000)
      }
    }
  })
})

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
  gameBoard.players = [createPlayers('alpha', '🧞‍♂️'), createPlayers('omega', '🧞‍♀️')]
  return gameBoard
}

function setInitialGame() {
  gameBoard = addPlayersToGameboard()
  var firstPlayer = determineFirstTurn()
  if (firstPlayer === 'alpha') {
    gameBoard.players[0].isTurn = true
    gameBoard.players[1].isTurn = false
  } else if (firstPlayer === 'omega') {
    gameBoard.players[0].isTurn = false
    gameBoard.players[1].isTurn = true
  }
}


function determineFirstTurn() {
  if (gameBoard.round % 2 === 0) {
    gameBoard.players[0].isTurn = true
    gameBoard.players[1].isTurn = false
    return 'alpha'
  } else {
    gameBoard.players[0].isTurn = false
    gameBoard.players[1].isTurn = true
    return 'omega'
  }
}

function determineTurn() {
  for (var i = 0; i < gameBoard.players.length; i++) {
    if (gameBoard.players[i].isTurn === true) {
      return gameBoard.players[i].id
    }
  }
}

function swapTurns() {
  for (var i = 0; i < gameBoard.players.length; i++) {
    gameBoard.players[i].isTurn = !gameBoard.players[i].isTurn
  }
}


function checkForWins() {
  var winningCombos = gameBoard.winningCombos
  var gameBoardPositions = gameBoard.gameBoardPositions

  for (var i = 0; i < winningCombos.length; i++) {
    var combo = winningCombos[i]

    var position1 = combo[0]
    var position2 = combo[1]
    var position3 = combo[2]

    var token1 = gameBoardPositions[position1]
    var token2 = gameBoardPositions[position2]
    var token3 = gameBoardPositions[position3]

    if (token1 !== '' && token1 === token2 && token2 === token3) {
      currentWinner = token1
      return currentWinner
    }
  }
  return null
}

function checkForDraws() {
  var gbPositionsClone = ['']
  for (var i = 0; i < gameBoard.gameBoardPositions.length; i++) {
    if (gameBoard.gameBoardPositions[i] !== '') {
      gbPositionsClone.push(gameBoard.gameBoardPositions[i].token)
    }
  }
  if (gbPositionsClone.length === 10 && checkForWins() === null) {
    currentWinner = 'draw'
    return true
  }
  return false
}


function increaseWinCount(winner) {
  for (var i = 0; i < gameBoard.players.length; i++) {
    if (gameBoard.players[i].token === winner) {
      gameBoard.players[i].wins++
    }
  }
}

function clearGameBoardPositions() {
  for (var i = 0; i < gameBoard.gameBoardPositions.length; i++) {
    gameBoard.gameBoardPositions[i] = ''
  }
  gameBoard.round++
}


//-------------- DOM FUNCTIONS -----------------//

function placeToken(event) {
  var alphaToken = gameBoard.players[0].token
  var omegaToken = gameBoard.players[1].token

  var clickedIndex = Array.from(nineBoxes).indexOf(event.target)

  if (gameBoard.gameBoardPositions.every(position => position === '')) {
    if (determineFirstTurn() === 'alpha') {
      gameBoard.gameBoardPositions[clickedIndex] = alphaToken
      event.target.innerHTML += alphaToken
    } else if (determineFirstTurn() === 'omega') {
      gameBoard.gameBoardPositions[clickedIndex] = omegaToken
      event.target.innerHTML += omegaToken
    }
  } else {
    if (determineTurn() === 'alpha') {
      gameBoard.gameBoardPositions[clickedIndex] = alphaToken
      event.target.innerHTML += alphaToken
    } else if (determineTurn() === 'omega') {
      gameBoard.gameBoardPositions[clickedIndex] = omegaToken
      event.target.innerHTML += omegaToken
    }
  }

  swapTurns()
  updateBannerDisplay()
}

function updateBannerDisplay() {
  for (var i = 0; i < gameBoard.players.length; i++) {
    if (checkForDraws()) {
      playerBanner.innerText = `Oh No, It's a Draw!`
    } else if (gameBoard.players[i].isTurn === false && checkForWins() !== null) {
      playerBanner.innerText = `Congrats ${gameBoard.players[i].token} - You're a Winner!`
    } else if (gameBoard.players[i].isTurn === true && checkForWins() === null) {
      playerBanner.innerText = `${gameBoard.players[i].token} - Your Turn!`
    }
  }
}


function displayPlayerWinCount() {
  leftWinCount.innerText = `${gameBoard.players[0].wins}`
  rightWinCount.innerText = `${gameBoard.players[1].wins}`
}

function handleWin(token) {

  for (var i = 0; i < gameBoard.players.length; i++) {
    if (token === gameBoard.players[i].token) {
      increaseWinCount(gameBoard.players[i].token)
      displayPlayerWinCount()
    }
  }
}

function resetBoard(nineBoxes) {
  for (var i = 0; i < nineBoxes.length; i++) {
    nineBoxes[i].innerText = ''
  }
  currentWinner = ''
  clearGameBoardPositions()
  updateBannerDisplay()
}

function validateGameBoardPosition(event) {
  if (event.target.innerText === '') {
    placeToken(event)
  } else {
    return
  }
}