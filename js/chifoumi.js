console.log("Chifoumi script loaded");

const symbol = ["✊🏼", "🤚🏼", "✌🏼"];
const computerChoice = document.querySelector(".computer-choice");
const userChoice = document.querySelector(".user-choice");
const buttons = userChoice.querySelectorAll(".user-choice__button");
const result = document.querySelector(".result");
const messageBox = document.querySelector(".message");
const userNameInput = document.querySelector("#user-name-input");
const userScoreContainer = document.querySelector(".user-score");
const computerScoreContainer = document.querySelector(".computer-score");
const userBar = document.querySelector(".user-bar");
const computerBar = document.querySelector(".computer-bar");
const userImg = document.querySelector(".image-box img");
let userName = "anonymous";
const imgUrl ="";
let userScore = 0;
let computerScore = 0;
let inGame = false;
let computerResult = "";
let userResult = "";
let timeoutId1;
let timeoutId2;

function getRandomNumber(arr) {
  return Math.floor(Math.random() * arr.length);
}

function displayRandomSymbol() {
  return new Promise((resolve) => {
    timeoutId2 = setTimeout(() => {
      computerResult = symbol[getRandomNumber(symbol)];
      computerChoice.innerHTML = computerResult;

      resolve();
    }, 2000);
  });
}

function checkResult() {
  if (computerResult === userResult) {
    updateUserImage("Player", "b89585", "variant08", "variant24", "variant09", "false");
    return "🤨 Egalité";
  }
  if (
    (computerResult === "✊🏼" && userResult === "🤚🏼") ||
    (computerResult === "🤚🏼" && userResult === "✌🏼") ||
    (computerResult === "✌🏼" && userResult === "✊🏼")
  ) {
    userScore++;
    userScoreContainer.textContent = `SCORE: ${userScore}`;
    userBar.style.width = `${userScore * 10}px`;
    updateUserImage("Player", "b89585", "variant10", "variant19", "variant01", "false");
    return "Gagné";
  }
  computerScore++;
  computerScoreContainer.textContent = `SCORE: ${computerScore}`;
  computerBar.style.width = `${computerScore * 10}px`;
  updateUserImage("Player", "FF9585", "variant02", "variant09", "variant23", "false");
  return "Perdu";
}

function updateUserImage(
  userName,
  color,
  eyebrows,
  userEyes,
  userMouth,
  flip
) {
  // https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Nico&eyes=variant01&mouth=variant01
  const updatedImgUrl = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userName}&backgroundColor=${color}&eyebrows=${eyebrows}&eyes=${userEyes}&mouth=${userMouth}&flip=${flip}`;
  userImg.src = updatedImgUrl;
}

userChoice.addEventListener("click", async (e) => {
  // Récupérer l'élément qui a été cliqué pour le rem
  // console.log(e);
  updateUserImage("Player", "b89585", "variant02", "variant14", "variant29", "true");
  let choice = e.target.closest(".user-choice__button");
  if (!choice || inGame) return;
  if (!userChoice.children.length > 1 && inGame) {
    console.log("Vous avez cliqué trop de fois");
  } else {
    inGame = true;
    choice.classList.add("scale");
    userChoice.innerHTML = "";
    userChoice.appendChild(choice);
    userResult = choice.textContent;
    console.log("User Choice :", userResult);
    messageBox.style.display = "block";
    await displayRandomSymbol();
    if (choice.classList.contains("scale")) {
      choice.classList.remove("scale");
    }
    messageBox.style.display = "none";
    result.innerHTML = checkResult();
    // messageBox.style.display = "block";
    timeoutId1 = setTimeout(() => {
      buttons.forEach((button) => {
        userChoice.appendChild(button);
      });
      inGame = false;
      // messageBox.style.display = "none";
      computerChoice.innerHTML = "<p>Ready</p>";
      result.innerHTML = "";
      updateUserImage("Player", "b89585", "variant02", "variant24", "variant02", "false");
    }, 2000);
  }
});


userNameInput.addEventListener("input", (e) => {
  userName = e.target.value;
  const userNameTitle = document.querySelector("#nickNameTitle");
  userNameTitle.textContent = userName ? userName : "Joueur";
});
