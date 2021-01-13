import { deck } from "./deck.js";


let deckIndex = 0;
let currentCardValue = 0;

let currentChips = 500;
let currentBet = 0;
let record = 0;
let winstreak = 0;

// gatheirng elements

// FIELDS
let currentChipsField = document.getElementById("yourChips-value");
let currentBetField = document.getElementById("currentBet-value");
let recordField = document.getElementById("record-value");
let winStreakField = document.getElementById("winStreak-value");
let playerFinalScoreField = document.getElementById("player-final-score");

// BUTTONS
let minusBtn = document.getElementById("minus-btn");
let plusBtn = document.getElementById("plus-btn");
let hitBtn = document.getElementById("hit-btn");
let resetDataBtn = document.getElementById("reset-data");
let playAgainBtn = document.getElementById("play-again-btn");
// SCREENS
let resultScreen = document.getElementById("result-screen");

function initializeDataUI() {
   currentChipsField.innerHTML = currentChips;
   currentBetField.innerHTML = currentBet;
   recordField.innerHTML = record;
   winStreakField.innerHTML = winstreak;
}


initializeDataUI();


// MINUS BTN
function minus(minusBtn) {
   if (currentBet >= 50) {
      currentBet -= 50;
      currentBetField.innerHTML = currentBet;
   }
}

minusBtn.onclick = function () {
   minus();
};
// PLUS BUTTON
function plus() {
   if (currentBet < currentChips) {
      currentBet += 50;
      currentBetField.innerHTML = currentBet;
   }
}

plusBtn.onclick = function () {
   plus();
};

// Result screen
function showResultScreen(){
   resultScreen.style.visibility = "visible";
}


// HIT BUTTON FUNCTIONS 
let cardImagesArray = [];
let arrayCounter = 0;

function hit() {
   // Checking bet conditions
   // 1 - Has placed bet?
   /*if(currentBet==0){
        alert("You have to place a bet.")
    }*/
   currentCardValue = currentCardValue + deck[deckIndex].value;
   document.getElementById('player-name').innerHTML = currentCardValue;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   cardImagesArray.push(image);
   document.getElementById("player-cards").appendChild(cardImagesArray[arrayCounter]);
   arrayCounter++;
   for (let i = 0; i < arrayCounter; i++) {
      document.getElementById("player-cards").appendChild(cardImagesArray[i]);
      
   }
   deckIndex++;
}

function check(){
   // Self Lose
   if (currentCardValue > 21) {
      document.getElementById("player-name").innerHTML += " - You lose!";
      currentChips = currentChips - currentBet;
      currentChipsField.innerHTML = currentChips;
   
      playerFinalScoreField.innerHTML = currentCardValue;
   
      hitBtn.disabled = true;
      setTimeout(showResultScreen, 1000);
    
   }
   // Blackjack
   if (currentCardValue == 21) {
      document.getElementById("player-name").innerHTML += " - Blackjack!";
      currentChips = currentChips + currentBet;
      currentChipsField.innerHTML = currentChips;
   }
   // Lose to the house
}



hitBtn.onclick = function () {
   hit();
   check();
};



// PLAY AGAIN
function playAgain(){
   // clearing values 
   deckIndex = 0;
   cardImagesArray = [];
   arrayCounter = 0;
   currentCardValue = 0;
   
   hitBtn.disabled = false;

   // clearing UI
   let removeChilds = function (node) {
      let last;
      while (last = document.getElementById("player-cards").lastChild){
         document.getElementById("player-cards").removeChild(last);
      }
   };
   removeChilds();
   document.getElementById("player-name").innerHTML = "Player"
   resultScreen.style.visibility = "hidden";
   
}

playAgainBtn.onclick = function () {playAgain();};

// RESET DATA
function resetData() {
   currentChips = 500;
   currentBet= 0;
   record= 0;
   winStreak =0;
}

function resetDataUI() {
   currentChipsField.innerHTML = 500;
   currentBetField.innerHTML = 0;
   recordField.innerHTML = 0;
   winStreakField.innerHTML = 0;
}

resetDataBtn.onclick = function () {
   resetDataUI();
   resetData();
};

// HOLD BUTTON
