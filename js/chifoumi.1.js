console.log("Chifoumi script loaded");

const symbol = ["✊🏼", "🤚🏼", "✌🏼"];
const computerChoice = document.querySelector(".computer-choice");
const userChoice = document.querySelector(".user-choice");
const result = document.querySelector(".result");
const buttons = userChoice.querySelectorAll("button");
const message = document.querySelector(".message");
let inGame = false;
let computerResult = "";
let userResult = "";

function getRandomNumber(arr) {
  return Math.floor(Math.random() * arr.length);
}

console.log("getRandomNumber(symbol):", getRandomNumber(symbol));

function displayRandomSymbol() {
  if (inGame) return;
  const result = symbol[getRandomNumber(symbol)];
  computerChoice.innerHTML = result;
  computerResult = result;
  console.log("computerResult:", computerResult);
  inGame = true;
}

function checkResult() {
  if (computerResult === userResult) return "draw";
  if (
    (computerResult === "✊🏼" && userResult === "🤚🏼") ||
    (computerResult === "🤚🏼" && userResult === "✌🏼") ||
    (computerResult === "✌🏼" && userResult === "✊🏼")
  )
    return "You win";
  return "You lose";
}

userChoice.addEventListener("click", (e) => {
  // Récupérer l'élément qui a été cliqué pour le rem
  let choice = e.target.closest(".btn-ui");
  if (!choice) return;
  if (!userChoice.children.length > 1) {
    console.log("Vous avez cliqué trop de fois");
  } else {
    userChoice.innerHTML = "";
    userChoice.appendChild(choice);
    userResult = choice.textContent;
    console.log("userResult:", userResult);
    displayRandomSymbol();
  }
  result.innerHTML = checkResult();
  message.style.display = "block";
  setTimeout(() => {
    buttons.forEach((button) => {
      userChoice.appendChild(button);
    });
    inGame = false;
    message.style.display = "none";
    computerChoice.innerHTML = "";
    result.innerHTML = "";
  }, 2000);
});
