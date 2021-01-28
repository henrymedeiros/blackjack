import { deck, shuffle } from "./deck.js";

shuffle(deck);

let deckIndex = 0;
let playerCurrentCardValue = 0;
let dealerCurrentCardValue = 0;

let currentChips = 500;
let currentBet = 25;
let record = 500;
let winstreak = 0;

let currentStreak = 0;

let totalDraws = 0;
let totalWins = 0;
let totalLosses = 0;

let playerCardsImagesArray = [];
let dealerCardsImagesArray = [];

let playerArrayCounter = 0;
let dealerArrayCounter = 0;


// FIELDS
let currentChipsField = document.getElementById("yourChips-value");
let currentBetField = document.getElementById("currentBet-value");
let recordField = document.getElementById("record-value");
let winStreakField = document.getElementById("winStreak-value");
let totalWinsField = document.getElementById("total-wins");
let totalLossesField = document.getElementById("total-losses");
let totalDrawsField = document.getElementById("total-draws");
let playerFinalScoreField = document.getElementById("player-final-score");
let dealerFinalScoreField = document.getElementById("dealer-final-score");
let resultTitle = document.getElementById("result-title");

// BUTTONS
let minusBtn = document.getElementById("minus-btn");
let plusBtn = document.getElementById("plus-btn");
let hitBtn = document.getElementById("hit-btn");
let holdBtn = document.getElementById("hold-btn");
let doubleBtn = document.getElementById("double");
let resetDataBtn = document.getElementById("reset-data");
let resetGameBtn = document.getElementById("reset-game");
let playAgainBtn = document.getElementById("play-again-btn");
// SCREENS
let resultScreen = document.getElementById("result-screen");
// UI Parts
let dealerHand = document.getElementById("dealer-cards");
let playerHand = document.getElementById("player-cards");

function initializeDataUI() {
   currentChipsField.innerHTML = currentChips;
   currentBetField.innerHTML = currentBet;
   recordField.innerHTML = record;
   winStreakField.innerHTML = winstreak;
}

function showResultScreen() {
   resultScreen.style.visibility = "visible";
}

function setRecord() {
   if (currentChips > record) {
      record = currentChips;
      recordField.innerHTML = record;
   }
}

function turnCardDown() {
   let image = document.getElementById("2");
   image.src = "assets/cards/back.svg";
}

function turnCardUp() {
   let image = document.getElementById("2");
   image.src = deck[2].img;
}

initializeDataUI();



// Result screen

function minus() {
   if (currentBet > 25) {
      currentBet -= 25;
      currentBetField.innerHTML = currentBet;
   }
}

function plus() {
   if (currentBet <= 75) {
      currentBet += 25;
      currentBetField.innerHTML = currentBet;
   }
}
minusBtn.onclick = function () {
   minus();
};
plusBtn.onclick = function () {
   plus();
};

function playerDrawCard() {
   // ACE CHECK
   if (
      playerCurrentCardValue + deck[deckIndex].value > 21 &&
      deck[deckIndex].value == 11
   ) {
      deck[deckIndex].value = 1;
      console.log("CONVERTED ACE");
   }

   playerCurrentCardValue = playerCurrentCardValue + deck[deckIndex].value;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   playerCardsImagesArray.push(image);

   document.getElementById(
      "player-name-span"
   ).innerHTML = playerCurrentCardValue;
   playerHand.appendChild(playerCardsImagesArray[playerArrayCounter]);
   playerArrayCounter++;
   for (let i = 0; i < playerArrayCounter; i++) {
      playerHand.appendChild(playerCardsImagesArray[i]);
   }
   deckIndex++;
}

function dealerDrawCard() {
   // CONVERt ACE
   if (
      dealerCurrentCardValue + deck[deckIndex].value > 21 &&
      deck[deckIndex].value == 11
   ) {
      deck[deckIndex].value = 1;
      console.log("CONVERTED ACE");
   }

   dealerCurrentCardValue = dealerCurrentCardValue + deck[deckIndex].value;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   image.id = deckIndex;
   dealerCardsImagesArray.push(image);

   document.getElementById(
      "dealer-name-span"
   ).innerHTML = dealerCurrentCardValue;
   dealerHand.appendChild(dealerCardsImagesArray[dealerArrayCounter]);
   dealerArrayCounter++;
   for (let i = 0; i < dealerArrayCounter; i++) {
      dealerHand.appendChild(dealerCardsImagesArray[i]);
   }
   deckIndex++;
}

function dealHands() {
   for (let i = 0; i < 2; i++) {
      dealerDrawCard();
      if (i == 1) {
         turnCardDown();
         document.getElementById("dealer-name-span").innerHTML =
            dealerCurrentCardValue - deck[2].value;
      }
      playerDrawCard();
   }
}

dealHands();

let held = false;
holdBtn.onclick = function () {
   checkBetConditions();
   if (forbiddenBet == 1) {
      return alert("You have to place a bet.");
   }
   if (forbiddenBet == 3) {
      return alert("Can't place that bet, lower it");
   } else if (forbiddenBet == 0) {
      holdBtn.disabled = true;
      held = true;
      turnCardUp();
      check();
      setRecord();
   }
};

function winner(blackjackWin) {
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;

   if (blackjackWin === 1) {
      resultTitle.innerHTML = "Blackjack!";
      currentChips = currentChips + currentBet * 3;
      currentChipsField.innerHTML = currentChips;
      resultScreen.style.background = "url(assets/images/result-background-blackjack.png) no-repeat"
      resultScreen.style.backgroundSize = "100% 100%"
   } else {
      resultTitle.innerHTML = "You win";
      currentChips = currentChips + currentBet;
      currentChipsField.innerHTML = currentChips;
      resultScreen.style.background = "url(assets/images/result-background.png) no-repeat"
      resultScreen.style.backgroundSize = "100% 100%"
   }
   totalWins++;
   totalWinsField.innerHTML = totalWins;
   currentStreak++;
   if (currentStreak > winstreak) {
      winstreak = currentStreak;
      winStreakField.innerHTML = winstreak;
   }
   setTimeout(showResultScreen, 1000);
   console.log(currentChips, record);
}

function draw() {
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;
   resultTitle.innerHTML = "It's a draw!";
   setTimeout(showResultScreen, 1000);
   console.log(currentChips, record);
   totalDraws++;
   totalDrawsField.innerHTML = totalDraws;
}

function loser() {
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;
   resultTitle.innerHTML = "You lose";
   currentChips = currentChips - currentBet;
   currentChipsField.innerHTML = currentChips;
   setTimeout(showResultScreen, 1000);
   console.log(currentChips, record);
   totalLosses++;
   totalLossesField.innerHTML = totalLosses;
   resultScreen.style.background = "url(assets/images/result-background-loser.png) no-repeat"
   resultScreen.style.backgroundSize = "100% 100%"
}

let forbiddenBet = 0;
function checkBetConditions() {
   if (currentBet == 0) {
      forbiddenBet = 1;
   } else if (currentChips == 0) {
      forbiddenBet = 2;
   } else if (currentBet > currentChips) {
      forbiddenBet = 3;
   } else if (currentBet > 0) {
      hitBtn.disabled = false;
      forbiddenBet = 0;
   } else if (currentChips > 25) {
      hitBtn.disabled = false;
      forbiddenBet = 0;
   }
}

// Double BTN
function double() {
   currentBet = currentBet * 2;
   currentBetField.innerHTML = currentBet;
   doubleBtn.disabled = true;
}

doubleBtn.onclick = function () {
   double();
};

function check() {
   // Self Lose
   if (playerCurrentCardValue > 21) {
      loser();
   }
   // Blackjack
   else if (playerCurrentCardValue == 21) {
      // calculate chips
      winner(1);
   }

   // HELD
   else if (held) {
      held = false;
      if (dealerCurrentCardValue == playerCurrentCardValue) {
         draw();
      }
      // less than player
      if (dealerCurrentCardValue < playerCurrentCardValue) {
         while (dealerCurrentCardValue < playerCurrentCardValue) {
            dealerDrawCard();
         }
      }
      // look for draw
      if (dealerCurrentCardValue == playerCurrentCardValue) {
         let decide = Math.random() * (2 - 0) + 0;
         if (decide < 1) {
            dealerDrawCard();
         } else {
            draw();
            resultTitle.innerHTML = "Draw";
         }
      }
      // dealer exceed
      if (dealerCurrentCardValue > 21) {
         winner(0);
         resultTitle.innerHTML = "You win";
      }
      // dealer won | NO BLACKJACK
      if (
         dealerCurrentCardValue < 21 &&
         dealerCurrentCardValue > playerCurrentCardValue
      ) {
         resultTitle.innerHTML = "You lose";
         loser();
      }
      // dealer won |  BLACKJACK
      if (dealerCurrentCardValue == 21) {
         resultTitle.innerHTML = "You lose";
         loser();
      }
      // normal win
      if (
         playerCurrentCardValue < 21 &&
         playerCurrentCardValue > dealerCurrentCardValue
      ) {
         winner(0);
      }
   }
}

hitBtn.onclick = function () {
   checkBetConditions();
   if (forbiddenBet == 1) {
      return alert("You have to place a bet.");
   }
   if (forbiddenBet == 3) {
      return alert("Can't place that bet, lower it");
   } else if (forbiddenBet == 0) {
      playerDrawCard();
      check();
   }
   minusBtn.disabled = true;
   plusBtn.disabled = true;
   setRecord();
};

// PLAY AGAIn
function playAgain() {
   // clearing values
   checkBetConditions();
   if (forbiddenBet == 2) {
      holdBtn.disabled = true;
      hitBtn.disabled = true;
      return alert("You have no chips - Reset the game!");
   }
   deckIndex = 0;
   holdBtn.disabled = false;
   minusBtn.disabled = false;
   plusBtn.disabled = false;
   doubleBtn.disabled = false;
   shuffle(deck);
   // player
   playerArrayCounter = 0;
   playerCardsImagesArray = [];
   playerCurrentCardValue = 0;
   // dealer
   dealerArrayCounter = 0;
   dealerCardsImagesArray = [];
   dealerCurrentCardValue = 0;

   hitBtn.disabled = false;

   // clearing UI
   let removeChild = function (node) {
      let last;
      while ((last = playerHand.lastChild)) {
         playerHand.removeChild(last);
      }
      while ((last = dealerHand.lastChild)) {
         dealerHand.removeChild(last);
      }
   };
   removeChild();
   document.getElementById("player-name-span").innerHTML = "";
   document.getElementById("dealer-name-span").innerHTML = "";
   resultScreen.style.visibility = "hidden";
   dealHands();
   currentBet = 25;
   currentBetField.innerHTML = 25;
   currentStreak = winstreak;
}

playAgainBtn.onclick = function () {
   playAgain();
};

// RESET GAME

function resetGame() {
   currentChips = 500;
   currentBet = 25;
}

function resetGameUI() {
   currentChipsField.innerHTML = 500;
   currentBetField.innerHTML = 25;
}

resetGameBtn.onclick = function () {
   resetGame();
   resetGameUI();
};

// RESET DATA
function resetData() {
   currentChips = 500;
   currentBet = 25;
   record = 500;
   winstreak = 0;
   totalLosses = 0;
   totalWins = 0;
   totalDraws = 0;
}

function resetDataUI() {
   let usernameElement = document.getElementById("username-element");
   let userDescriptionElement = document.getElementById("user-description-element");
   currentChipsField.innerHTML = 500;
   currentBetField.innerHTML = 25;
   recordField.innerHTML = 500;
   winStreakField.innerHTML = 0;
   totalLossesField.innerHTML = 0;
   totalWinsField.innerHTML = 0;
   totalDrawsField.innerHTML = 0;
   usernameElement.textContent = 'Player Name'
   userDescriptionElement.textContent = "\"I'm a winner\""
}

resetDataBtn.onclick = function () {
   resetData();
   resetDataUI();
};

// HOLD BUTTON
