let gameBoardListItems = document.querySelectorAll("li");
let inputElement = document.querySelector("input");
let buttonElement = document.querySelector("button");
let warning1 = document.getElementById("warning1");
let warning2 = document.getElementById("warning2");
let spanElementWordNumber = document.getElementById("span-number");
let explanationDiv = document.getElementById("explanation-div");

function generateRandomFiveLetterWord() {
  let rijeci = [
    "možeš", "glava", "radio", "podne", "zaron", "ogled", "burek", "golub",
    "ploča", "misao", "nisam", "drlog", "crven", "modro", "jedro", "zlato",
    "vidio", "zašto", "zakon", "sedam", "plava", "prost", "pusto", "svime",
    "sprej", "nokti", "nakon", "mašta", "pozor", "usred", "oganj", "kadar",
    "mudro", "kreda", "presa", "sarma", "lijes", "krmak", "šaran", "vidra",
  ];

  let randomWord = rijeci[Math.floor(Math.random() * rijeci.length)];
  return randomWord;
}

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

let wordOfTheDay = generateRandomFiveLetterWord();
let wordOfTheDayArray = wordOfTheDay.split("");
for (let listItem of gameBoardListItems) {
  listItem.classList.add("grey");
}
console.log(wordOfTheDayArray);

///////////////////////////////////////////////////////////

function getUserInputAndDisplayIt() {
  let userWord = inputElement.value;

  if (userWord.length !== 5) {
    return (warning1.style.display = "block");
  } else {
    warning1.style.display = "none";
  }

  if (checkUserInput(userWord)) {
    return (warning2.style.display = "block");
  } else {
    warning2.style.display = "none";
  }

  inputElement.value = "";

  let fiveLetterArray = userWord.split("");

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

    for (let listItem of gameBoardListItems) {
      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex &&
        listItem.textContent == wordOfTheDayArray[colIndex]
      ) {
        listItem.classList.remove("grey");
        listItem.classList.add("matching-purple");
      }

      if (
        listItem.dataset.row == rowIndex &&
        listItem.dataset.col == colIndex &&
        listItem.textContent != wordOfTheDayArray[colIndex] &&
        wordOfTheDayArray.includes(listItem.textContent)
      ) {
        listItem.classList.remove("grey");
        listItem.classList.add("includes-purple");
      }
    }

    if (wordOfTheDay == userWord) {
      explanationDiv.style.display = "none";
      alert("Pogodio si!");
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
    spanElementWordNumber.textContent = rowIndex + 1;
    console.log(board);
  }
}

buttonElement.addEventListener("click", getUserInputAndDisplayIt);
