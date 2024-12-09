let gameBoardListItems = document.querySelectorAll("li");
let inputElement = document.querySelector("input");
let buttonElement = document.querySelector("button");
let warning1 = document.getElementById("warning1");
let warning2 = document.getElementById("warning2");

function checkUserInput(userInput) {
  // Definicija regularnog izraza za slova hrvatske abecede
  const croatianAlphabet = /^[A-Za-zČĆĐŠŽčćđšž]*$/;

  // Provjera unosa
  return !croatianAlphabet.test(userInput);
}

let rowIndex = 0;
let colIndex = 0;

let board = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

function getUserInputAndDisplayIt() {
  let word = inputElement.value;
  if (word.length !== 5) {
    return (warning1.style.display = "block");
  } else {
    warning1.style.display = "none";
  }

  if (checkUserInput(word)) {
    return (warning2.style.display = "block");
  } else {
    warning2.style.display = "none";
  }

  let fiveLetterArray = word.split("");
  console.log(fiveLetterArray);

  for (let letter of fiveLetterArray) {
    board[rowIndex][colIndex] = letter;
    console.log(letter);
    for (let listItem of gameBoardListItems) {
      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex
      ) {
        listItem.textContent = letter;
      }
    }
    if (colIndex === 4) {
      colIndex = 0;
    } else {
      colIndex++;
    }
  }
  if (rowIndex === 5) {
    rowIndex = 0;
    buttonElement.removeEventListener("click", getUserInputAndDisplayIt);
  } else {
    rowIndex++;
    console.log(board);
  }
}

buttonElement.addEventListener("click", getUserInputAndDisplayIt);
