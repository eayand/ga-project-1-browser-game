  /*----- constants -----*/
const colors = ['#ff3333', '#ffa500', '#fff000', '#00bb60', '#4444ff', '#9900dd']

let secretCode = []
let buttons = []


  /*----- state variables -----*/


  /*----- cached elements  -----*/
const choiceButtons = document.querySelectorAll('.choice')

  /*----- event listeners -----*/


  /*----- functions -----*/
init()

function init() {
    shuffle()
}

function shuffle() {
    const black = '#000000'
    buttons = colors.sort(() => Math.random() - 0.5)
    choiceButtons.forEach(function(choiceButton, idx) {
      const pickedColor = buttons[idx]
      choiceButton.style.backgroundColor = pickedColor
    })
}

