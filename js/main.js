

// freeCodeCamp 
// const myArray = ["apple", "banana", "cherry", "date", "elderberry"]; 
// const shuffle = myArray.sort(() => Math.random() - 0.5); 
// console.log(shuffle);

const defaultButtons = ['black', 'blue', 'green', 'red', 'white', 'yellow']
//change to hex
const buttons = defaultButtons.sort(() => Math.random() - 0.5)
console.log(buttons)

//create a button for each item in the array with its hex code as its ID or some feature and then use the ID of the clicked button to fill the background