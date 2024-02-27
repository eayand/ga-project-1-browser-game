  /*----- constants -----*/
const colors = ['#ff3333', '#ffa500', '#fff000', '#00bb60', '#4444ff', '#9900dd']

const open = '#fff5e9'


  /*----- state variables -----*/
let secretCode = []
let buttons = []
let row = 9
let column = 0
let yourMove = `r${row}c${column}`
let currentGuess = []
let exactMatches = []
let partialMatches = []
let leftSpace = 0
let rightSpace = 0
let extraText = ''


  /*----- cached elements  -----*/
const choiceButtons = document.querySelectorAll('.choice')
let currentSelection = document.getElementById(yourMove)
const submitButton = document.getElementById('submit')
const undoButton = document.getElementById('undo')
const userMessage = document.querySelector('#message-area > p')
let currentExactFb = document.getElementById(`tokenr${row}l${leftSpace}`)
let currentPartialFb = document.getElementById(`tokenr${row}r${rightSpace}`)


  /*----- event listeners -----*/
choiceButtons.forEach((choiceButton) => choiceButton.addEventListener('click', addPeg))
submitButton.addEventListener('click', submitGuess)
undoButton.addEventListener('click', undoPeg)


  /*----- functions -----*/
init()

function init() {
    makeCode()
    shuffle()
}

function makeCode() {
  // for (let i = 0; i < 4; i++) {
  //   secretCode.push(colors[Math.floor(Math.random() * colors.length)])
  // }
  secretCode = ['#ff3333', '#ffa500', '#fff000', '#00bb60']
}

function shuffle() {
    buttons = colors.sort(() => Math.random() - 0.5)
    choiceButtons.forEach(function(choiceButton, idx) {
      const pickedColor = buttons[idx]
      choiceButton.style.backgroundColor = pickedColor
      choiceButton.setAttribute('id', `${pickedColor}`)
    })
}
//credit freeCodeCamp

function addPeg(event) {
  if (currentSelection.classList.contains('locked')) {
    return
  } else {
    currentGuess.push(event.target.id)
    let selectedColor = event.target.style.backgroundColor
    currentSelection.style.backgroundColor = selectedColor
    selectNext()
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
  }
}

function selectNext() {
  if (column === 3) {
    currentSelection.classList.add('locked')
  }
  else {
    column ++
  }
  if (column === 1) {
    userMessage.textContent = ''
  }
}

function undoPeg() {
  if (column === 0) {
    return
  } else if (currentSelection.classList.contains('locked')) {
    currentSelection.classList.remove('locked')
    currentGuess.pop()
    currentSelection.style.backgroundColor = open
  } else {
    column --
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
    currentGuess.pop()
    currentSelection.style.backgroundColor = open
  }
}

function submitGuess() {
  if (currentSelection.classList.contains('locked')) {
    getFeedback()
    renderFeedback()
    if (row === 0) {
      userMessage.innerHTML = 'No more guesses. The code was <strong>EXAMPLE</strong>'
    } else {
      column = 0
      row --
      yourMove = `r${row}c${column}`
      currentSelection = document.getElementById(yourMove)
      currentGuess = []
      return row
    } 
  } else {
    return null
  } 
} 

function getFeedback() {
  exactMatches = []
  partialMatches = []
  let secretCodeCopyOne = [...secretCode]
  let secretCodeCopyTwo = []
  let possiblePartials = []
  while (currentGuess.length > 0) {
    if (currentGuess[0] === secretCodeCopyOne[0]) {
      exactMatches.push(currentGuess.shift())
      secretCodeCopyOne.shift()
    } else {
      possiblePartials.push(currentGuess.shift())
      secretCodeCopyTwo.push(secretCodeCopyOne.shift())
    }
  }
  if (exactMatches.length === 4) {
    return
  }
  while (possiblePartials.length > 0) {
    let indexPM = secretCodeCopyTwo.findIndex((partialMatch) => partialMatch === possiblePartials[0])
    if (indexPM >= 0) {
      partialMatches.push(possiblePartials.shift())
      secretCodeCopyTwo.splice(indexPM, 1)
    } else {
      possiblePartials.shift()
    }
  }
}

function renderFeedback() {
  renderExactMatches()
  renderPartialMatches()
}

function renderExactMatches () {
  if (exactMatches.length < 1) {
    extraText = 'No exact matches. '
    userMessage.textContent = extraText
    return extraText
  } else {
    exactMatches.forEach(function(match, index) {
      leftSpace = index
      currentExactFb = document.getElementById(`tokenr${row}l${leftSpace}`)
      currentExactFb.style.backgroundColor = '#000000'
    })
  }
  if (exactMatches.length === 4) {
    userMessage.innerHTML = '<strong>Congratulations! You cracked the code!</strong>'
  }
}

function renderPartialMatches () {
  if (partialMatches.length < 1 && exactMatches.length !== 4) {
    userMessage.textContent = `${extraText}No partial matches.`
  } else {
    partialMatches.forEach(function(match, index) {
      rightSpace = index
      currentPartialFb = document.getElementById(`tokenr${row}r${rightSpace}`)
      currentPartialFb.style.border = ' 2.5px solid #000000'
      currentPartialFb.style.backgroundColor = '#ffffff'
    })
  }
}