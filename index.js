let gameBoardListItems = document.querySelectorAll("#game-board li");
let inputElement = document.querySelector("input");
let writeToBoardBtn = document.getElementById("write-to-board-btn");
let warning1 = document.getElementById("warning1");
let warning2 = document.getElementById("warning2");
let spanElementWordNumber = document.getElementById("span-number");
let explanationDiv = document.getElementById("explanation-div");
let explanationParagraph = document.getElementById("explanation-paragraph");
let gameLogicBtn = document.getElementById("game-logic-btn");
let backdrop = document.getElementById("backdrop");
let asideList = document.querySelector("aside ul");
let asideListItems = document.querySelectorAll("aside li");
let didntFindWordParagraph = document.getElementById(
  "didnt-find-word-paragraph"
);
let congratsParagraph = document.getElementById("congrats-paragraph");
let numberOfGuessesSpanElement = document.getElementById("number-of-guesses");
let wordOfTheDaySpanElement = document.getElementById("word-of-the-day");
let restartBtn = document.getElementById("restart-btn");

function generateRandomFiveLetterWord() {
  let rijeci = [
    "možeš",
    "glava",
    "radio",
    "podne",
    "zaron",
    "ogled",
    "burek",
    "golub",
    "ploča",
    "misao",
    "nisam",
    "drlog",
    "crven",
    "modro",
    "jedro",
    "zlato",
    "vidio",
    "zašto",
    "zakon",
    "sedam",
    "plava",
    "prost",
    "pusto",
    "svime",
    "sprej",
    "nokti",
    "nakon",
    "mašta",
    "pozor",
    "usred",
    "oganj",
    "kadar",
    "mudro",
    "kreda",
    "presa",
    "sarma",
    "lijes",
    "krmak",
    "šaran",
    "vidra",
  ];

  let randomWord = rijeci[Math.floor(Math.random() * rijeci.length)];
  return randomWord;
}

function displayExplanationParagraph() {
  asideList.style.display = "none";
  backdrop.style.display = "block";
  explanationParagraph.style.display = "block";
}

function closeOverlay() {
  asideList.style.display = "grid";
  backdrop.style.display = "none";
  explanationParagraph.style.display = "none";
}

function checkUserInput(userInput) {
  // Hrvatska abeceda (bez slova Q, W, X i Y)
  const croatianAlphabet = /^[a-zA-ZčćđšžČĆĐŠŽ]+$/;
  return croatianAlphabet.test(userInput) && !/[qwxyQWXY]/.test(userInput);
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

let wordOfTheDay = generateRandomFiveLetterWord();
wordOfTheDaySpanElement.textContent = wordOfTheDay;
let wordOfTheDayArray = wordOfTheDay.split("");
for (let listItem of gameBoardListItems) {
  listItem.classList.add("grey");
}
console.log(wordOfTheDayArray);

///////////////////////////////////////////////////////////

function getUserInputAndDisplayIt() {
  let userWord = inputElement.value;
  inputElement.value = "";

  if (userWord.length !== 5) {
    return (warning1.style.display = "block");
  } else {
    warning1.style.display = "none";
  }

  if (!checkUserInput(userWord)) {
    return (warning2.style.display = "block");
  } else {
    warning2.style.display = "none";
  }

  let fiveLetterArray = userWord.split("");
  console.log(fiveLetterArray);

  for (let letter of fiveLetterArray) {
    board[rowIndex][colIndex] = letter;

    for (let listItem of gameBoardListItems) {
      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex
      ) {
        listItem.textContent = letter;
      }
    }

    numberOfGuessesSpanElement.textContent = rowIndex + 1;

    /* RIJEČ NE SADRŽI SLOVO */

    for (let listItem of gameBoardListItems) {
      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex &&
        !wordOfTheDayArray.includes(listItem.textContent)
      ) {
        listItem.classList.remove("grey");
        listItem.classList.add("dark-grey");

        let asideListItemsArray = Array.from(asideListItems);
        let asideListItem = asideListItemsArray.find(
          (item) => item.textContent == listItem.textContent
        );
        asideListItem.classList.add("dark-grey");
      }

      /* RIJEČ SADRŽI SLOVO, ALI NIJE NA PRAVOM MJESTU*/

      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex &&
        listItem.textContent != wordOfTheDayArray[colIndex] &&
        wordOfTheDayArray.includes(listItem.textContent)
      ) {
        listItem.classList.remove("grey", "dark-grey");
        listItem.classList.add("includes-purple");

        let asideListItemsArray = Array.from(asideListItems);
        let asideListItem = asideListItemsArray.find(
          (item) => item.textContent == listItem.textContent
        );
        asideListItem.classList.add("includes-purple");
      }

      /* SLOV0 NA PRAVOM MJESTU U RIJEČI*/

      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex &&
        listItem.textContent == wordOfTheDayArray[colIndex]
      ) {
        listItem.classList.remove("grey", "dark-grey", "includes-purple");
        listItem.classList.add("matching-purple");

        let asideListItemsArray = Array.from(asideListItems);
        let asideListItem = asideListItemsArray.find(
          (item) => item.textContent == listItem.textContent
        );
        asideListItem.classList.remove("includes-purple");
        asideListItem.classList.add("matching-purple");
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
    explanationDiv.style.display = "none";
    gameLogicBtn.style.display = "none";
    didntFindWordParagraph.style.display = "block";
    restartBtn.style.display = "block";
    writeToBoardBtn.removeEventListener("click", getUserInputAndDisplayIt);
  } else {
    rowIndex++;
    spanElementWordNumber.textContent = rowIndex + 1;
    console.log(board);
    console.log(rowIndex);
  }

  if (wordOfTheDay == userWord) {
    explanationDiv.style.display = "none";
    gameLogicBtn.style.display = "none";
    congratsParagraph.style.display = "block";
    didntFindWordParagraph.style.display = "none";
    restartBtn.style.display = "block";
    writeToBoardBtn.removeEventListener("click", getUserInputAndDisplayIt);
  }
}

function restartGame() {
  rowIndex = 0;
  colIndex = 0;

  board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  didntFindWordParagraph.style.display = "none";
  gameLogicBtn.style.display = "block";
  explanationDiv.style.display = "block";
  restartBtn.style.display = "none";
  congratsParagraph.style.display = "none";
  spanElementWordNumber.textContent = "1";

  wordOfTheDay = generateRandomFiveLetterWord();
  wordOfTheDaySpanElement.textContent = wordOfTheDay;
  wordOfTheDayArray = wordOfTheDay.split("");
  let asideListItemsArray = Array.from(asideListItems);
  for (let listItem of gameBoardListItems) {
    listItem.classList.remove(
      "dark-grey",
      "includes-purple",
      "matching-purple"
    );
    listItem.classList.add("grey");
    listItem.textContent = "";
  }

  for (let asideListItem of asideListItemsArray) {
    asideListItem.classList.remove(
      "dark-grey",
      "includes-purple",
      "matching-purple"
    );
  }
  writeToBoardBtn.addEventListener("click", getUserInputAndDisplayIt);
}

gameLogicBtn.addEventListener("click", displayExplanationParagraph);
backdrop.addEventListener("click", closeOverlay);
writeToBoardBtn.addEventListener("click", getUserInputAndDisplayIt);
restartBtn.addEventListener("click", restartGame);
