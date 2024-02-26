  /*----- constants -----*/
const colors = ['#ff3333', '#ffa500', '#fff000', '#00bb60', '#4444ff', '#9900dd']

const open = '#fff5e9'


  /*----- state variables -----*/
let secretCode = []
let buttons = []
let row = 9
let column = 0
let yourMove = `r${row}c${column}`
let currentRow = []


  /*----- cached elements  -----*/
const choiceButtons = document.querySelectorAll('.choice')
let currentSelection = document.getElementById(yourMove)
const submitButton = document.getElementById('submit')
const undoButton = document.getElementById('undo')


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
  for (let i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(Math.random() * colors.length)])
  }
  // console.log(secretCode)
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
    currentRow.push(event.target.id)
    // console.log(currentRow)
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
    currentRow.pop()
    // console.log(currentRow)
    currentSelection.style.backgroundColor = open
  } else {
    column --
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
    currentRow.pop()
    // console.log(currentRow)
    currentSelection.style.backgroundColor = open
  }
}

function submitGuess() {
  if (currentSelection.classList.contains('locked')) {
    giveFeedback()
    column = 0
    row --
    yourMove = `r${row}c${column}`
    currentSelection = document.getElementById(yourMove)
  } else {
    return null
  }
}

function giveFeedback() {
  console.log(secretCode)
  console.log(currentRow)
}
  // console.log('code', secretCode)
  // console.log('current row', currentRow)
  // let compareList = []
  // currentRow.forEach(function(guess) {
  //   compareList.push(guess.style.backgroundColor)
  //   console.log('cl', compareList)
  //   return compareList
  // })



  // console.log(`r${row}c0, r${row}c1, r${row}c2, r${row}c3,`)
  // console.log(currentRow)
