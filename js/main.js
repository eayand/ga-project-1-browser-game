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

  /*----- event listeners -----*/
choiceButtons.forEach((choiceButton) => choiceButton.addEventListener('click', addPeg))


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

function selectNext() {
  if (column === 3) {
    column = 0
    row --
  } else {
    column ++
  }
}

function addPeg(event) {
  let selectedColor = event.target.style.backgroundColor
  currentSelection.style.backgroundColor = selectedColor
  selectNext()
 //next advance selection   
}
//start by selecting r9c0 to r9c3
//end with r0c3