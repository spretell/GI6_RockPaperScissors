// - - - created variables - - - //
// top section variables ( using their id )
const userChoiceInput = document.getElementById("user-choice-input");
const playButton = document.getElementById("play-button");
const messageElement = document.getElementById("message");

// paw variables ( using their class )
const userPaw = document.querySelector(".user-paw");
const computerPaw = document.querySelector(".computer-paw");

// image variables ( using their id )
const userChoiceImg = document.getElementById("user-choice-img");
const computerChoiceImg = document.getElementById("computer-choice-img");

// popup variables ( using their id )
const resultPopup = document.getElementById("result-popup");
const popupText = document.getElementById("popup-text");
const closePopupButton = document.getElementById("close-popup-button");
const popupGif = document.getElementById("popup-gif");

// scoreboard variables ( using their id )
const winsCountElement = document.getElementById("wins-count");
const lossesCountElement = document.getElementById("losses-count");
const tiesCountElement = document.getElementById("ties-count");
const resetButton = document.getElementById("reset-button");

// start scores at 0
let wins = 0;
let losses = 0;
let ties = 0;


// - - - play game - - - //
playButton.addEventListener("click", function () {
  const rawUserChoice = userChoiceInput.value; // what user typed in box 
  const userChoice = rawUserChoice.toLowerCase().trim(); // makes all lowercase ; removes extra spaces

  // if the choice is not a valid choice , show error in message element with the created string
  if (!isValidChoice(userChoice)) {
    messageElement.textContent =
      "Please type rock, paper, or scissors."; // validation message output 
    return;
  }

  // clears old error message
  messageElement.textContent = "";

  // created variable to store a random computer choice ( "rock", "paper", "scissors" )
  const computerChoice = getRandomComputerChoice();

  // sets user's paw img based on the user's choice / sets computer's paw img based on the computer's random choice 
  setPawAppearance(userChoiceImg, userChoice);
  setPawAppearance(computerChoiceImg, computerChoice);

  // removes and resets animation each time user clicks play
  animatePaw(userPaw);
  animatePaw(computerPaw);

  // winner
  const result = determineWinner(userChoice, computerChoice);

  // updates scores and popup texts
    if (result === "win") {
    wins++; // adds 1 to win score
    popupText.textContent = "You win! (˶˃ ᵕ ˂˶) .ᐟ.ᐟ"; // popup win message
    popupGif.src = "https://gifdb.com/images/featured/happy-cat-2cxp5723g93tahsv.gif"; // popup win gif
    popupGif.alt = "happy cat";
  } else if (result === "lose") {
    losses++; // adds 1 to loss score
    popupText.textContent = "You lose! <(˶`ロ´˶)> "; // popup lose message
    popupGif.src = "https://media.tenor.com/LN7_2tBU2oIAAAAM/twicedior-chaeyoungdior.gif"; // popup lose gif
    popupGif.alt = "mad cat";
  } else {
    ties++; // adds 1 to tie score
    popupText.textContent = "It's a tie! ˙𐃷˙"; // popup tie message
    popupGif.src = "https://media.tenor.com/4aCkAvBWvxIAAAAM/cat.gif"; // popup tie gif 
    popupGif.alt = "confused cat";
  }

  updateScoreboard(); // writes new scores into span elements
  showPopup(); // makes popup visible 

  // clears input so ready for next round
  userChoiceInput.value = "";
});


// reset button
// when reset button is clicked, it runs a function to reset scoreboard back to 0 and calls on updateScoreboard
resetButton.addEventListener("click", function () {
  wins = 0;
  losses = 0;
  ties = 0;
  updateScoreboard();

  // clears paw imgs
  userChoiceImg.src = "";
  userChoiceImg.alt = "";
  computerChoiceImg.src = "";
  computerChoiceImg.alt = "";
  // clears gif imgs
  popupGif.src = "";
  popupGif.alt = "";
  // clears popup messages
  messageElement.textContent = "";

  // hides popup window
  hidePopup();

  // removes show class so paws are hidden once again
  userPaw.classList.remove("show");
  computerPaw.classList.remove("show");
});


// - - - functions - - - //
// close popup button
closePopupButton.addEventListener("click", function () {
  hidePopup();
  // when OK is clicked , it calls on hidePopup
});

// user validation
function isValidChoice(choice) {
  return choice === "rock" || choice === "paper" || choice === "scissors";
} // checks if user choice matches any of these strings

// random computer choice
function getRandomComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length); // gives number between 0 and 3 ( not including 3 )
  return choices[randomIndex]; // picks an option based on index
}

// set paw appearance
function setPawAppearance(imgElement, choice) {
  if (choice === "rock") {
    imgElement.src = "gi6_media/rock.jpg";
    imgElement.alt = "Rock paw";
  } else if (choice === "paper") {
    imgElement.src = "gi6_media/paper.jpg";
    imgElement.alt = "Paper paw";
  } else {
    imgElement.src = "gi6_media/scissors.jpg";
    imgElement.alt = "Scissors paw";
  }
  // based on choice , the src and alt of image is set
}

// animate paw
function animatePaw(pawElement) {
  // remove class so animation can restart
  pawElement.classList.remove("show");
  // css animation forced to reset
  void pawElement.offsetWidth;
  // add class again to restart animation
  pawElement.classList.add("show");
}

// determine winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "tie";
  }

  const userWins = // checks all conditions for which beats which
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper");

  if (userWins) {
    return "win";
  } else {
    return "lose";
  }
}

// update scoreboard
function updateScoreboard() {
  // .textcontent - between span tags ; updates span tags with current value of wins, losses, or ties
  winsCountElement.textContent = wins;
  lossesCountElement.textContent = losses;
  tiesCountElement.textContent = ties;
}

// show / hide popup
function showPopup() {
  resultPopup.classList.add("visible");
  // becomes visible + clickable 
}

function hidePopup() {
  resultPopup.classList.remove("visible");
  // removes visibility and clickableness 
}