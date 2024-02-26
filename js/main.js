  /*----- constants -----*/
const colors = ['#ff3333', '#ffa500', '#fff000', '#00bb60', '#4444ff', '#9900dd']


  /*----- state variables -----*/
let secretCode = []
let buttons = []
let row = 9
let column = 0
let yourMove = `r${row}c${column}`


  /*----- cached elements  -----*/
const choiceButtons = document.querySelectorAll('.choice')
let currentSelection = document.getElementById(yourMove)
const submitButton = document.getElementById('submit')

  /*----- event listeners -----*/
choiceButtons.forEach((choiceButton) => choiceButton.addEventListener('click', addPeg))
submitButton.addEventListener('click', submitGuess)

  /*----- functions -----*/
init()

function init() {
    makeCode()
    shuffle()
}

function makeCode() {
  for (let i = 0; i < 4; i++) {
    secretCode.push(Math.floor(Math.random() * colors.length))
  }
}

function shuffle() {
    buttons = colors.sort(() => Math.random() - 0.5)
    choiceButtons.forEach(function(choiceButton, idx) {
      const pickedColor = buttons[idx]
      choiceButton.style.backgroundColor = pickedColor
    })
}
//credit freeCodeCamp

function addPeg(event) {
  if (currentSelection.classList.contains('lock')) {
    return
  } else {
    let selectedColor = event.target.style.backgroundColor
    currentSelection.style.backgroundColor = selectedColor
    selectNext(event)
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
  }
}
//start by selecting r9c0 to r9c3
//end with r0c3

function selectNext() {
  if (column > 2) {
    currentSelection.classList.add('lock')
  }
  else {
    column ++
  }
}

function submitGuess() {
  if (column === 3) {
    column = 0
    row --
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
  } else {
    return null
  }
}

function undoPeg() {

}