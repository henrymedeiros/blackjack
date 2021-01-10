import { deck } from "./deck.js";
// HIT BUTTON

let hitBtn = document.getElementById("hit-btn");
let deckIndex = 0;
let currentCardValue = 0;
let hitClickCounter = 0;

let currentChips = 500;
let currentBet = 0;
let record = 0;
let winstreak = 0;

// rendering initial data

let currentChipsField = document.getElementById("yourChips-value");
currentChipsField.innerHTML = currentChips;

let currentBetField = document.getElementById("currentBet-value");
currentBetField.innerHTML = currentBet;

let recordField = document.getElementById("record-value");
recordField.innerHTML = record;

let winStreakField = document.getElementById("winStreak-value");
winStreakField.innerHTML = winstreak;

// end rendering

//  BET BUTTONS

let minusBtn = document.getElementById("minus-btn");
let plusBtn = document.getElementById("plus-btn");

// MINUS BTN
function minus() {
   if (currentBet >= 50) {
      currentBet -= 50;
      currentBetField.innerHTML = currentBet;
   }
}
// PLUS BUTTON
function plus() {
   if (currentBet < currentChips) {
      currentBet += 50;
      currentBetField.innerHTML = currentBet;
   }
}

minusBtn.onclick = function () {
   minus();
};
plusBtn.onclick = function () {
   plus();
};


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
   // Self Lose
   if (currentCardValue > 21) {
      document.getElementById("player-name").innerHTML += " - You lose!";
      currentChips = currentChips - currentBet;
      currentChipsField.innerHTML = currentChips;
   }
   // Blackjack
   if (currentCardValue == 21) {
      document.getElementById("player-name").innerHTML += " - Blackjack!";
      currentChips = currentChips + currentBet;
      currentChipsField.innerHTML = currentChips;
   }
}

hitBtn.onclick = function () {
   hit();
};

let resetDataBtn = document.getElementById("reset-data");
function resetData() {
   currentChipsField.innerHTML = 500;
   currentBetField.innerHTML = 0;
   recordField.innerHTML = 0;
   winStreakField.innerHTML = 0;
}

resetDataBtn.onclick = function () {
   resetData();
};

// HOLD BUTTON
