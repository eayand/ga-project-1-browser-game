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
    // console.log(currentGuess)
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
}

function undoPeg() {
  if (column === 0) {
    return
  } else if (currentSelection.classList.contains('locked')) {
    currentSelection.classList.remove('locked')
    currentGuess.pop()
    // console.log(currentGuess)
    currentSelection.style.backgroundColor = open
  } else {
    column --
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
    currentGuess.pop()
    // console.log(currentGuess)
    currentSelection.style.backgroundColor = open
  }
}

function submitGuess() {
  if (currentSelection.classList.contains('locked')) {
    getFeedback()
    renderFeedback()
    column = 0
    row --
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
    currentGuess = []
    return row
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
    console.log('cgl - ', currentGuess.length) //test-test-test-test
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
    console.log('ppl - ', possiblePartials.length) //test-test-test-test
    let indexPM = secretCodeCopyTwo.findIndex((partialMatch) => partialMatch === possiblePartials[0])
    if (indexPM >= 0) {
      partialMatches.push(possiblePartials.shift())
      secretCodeCopyTwo.splice(indexPM, 1)
    } else {
      possiblePartials.shift()
    }
  }
  console.log('ex - ', exactMatches) //test-test-test-test
  console.log('par - ', partialMatches) //test-test-test-test
}

function renderFeedback() {
  if (exactMatches.length < 1) {
    userMessage.textContent = 'No exact matches'
  } else {
    exactMatches.forEach(function(match, index) {
      leftSpace = index
      currentExactFb = document.getElementById(`tokenr${row}l${leftSpace}`)
      currentExactFb.style.backgroundColor = '#000000'
    })
  }
}

// tokenr9l0
