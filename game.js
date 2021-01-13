import { deck, shuffle} from "./deck.js";

shuffle(deck);


let deckIndex = 0;
let playerCurrentCardValue = 0;
let dealerCurrentCardValue = 0;

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
let dealerFinalScoreField = document.getElementById("dealer-final-score");
let resultTitle = document.getElementById("result-title");
// BUTTONS
let minusBtn = document.getElementById("minus-btn");
let plusBtn = document.getElementById("plus-btn");
let hitBtn = document.getElementById("hit-btn");
let holdBtn = document.getElementById("hold-btn");
let resetDataBtn = document.getElementById("reset-data");
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

 // Checking bet conditions
   // 1 - Has placed bet?
   /*if(currentBet==0){
        alert("You have to place a bet.")
    }*/


let playerCardsImagesArray = [];
let dealerCardsImagesArray = [];

let playerArrayCounter = 0;
let dealerArrayCounter = 0;


// DRAWS
function playerDrawCard() {
   
   playerCurrentCardValue = playerCurrentCardValue + deck[deckIndex].value;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   playerCardsImagesArray.push(image);

   document.getElementById('player-name').innerHTML = playerCurrentCardValue;
   playerHand.appendChild(playerCardsImagesArray[playerArrayCounter]);
   playerArrayCounter++;
   for (let i = 0; i <playerArrayCounter; i++) {
      playerHand.appendChild(playerCardsImagesArray[i]); 
   }
   deckIndex++;
}

function dealerDrawCard() {
   
   dealerCurrentCardValue = dealerCurrentCardValue + deck[deckIndex].value;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   dealerCardsImagesArray.push(image);

   document.getElementById('dealer-name').innerHTML = dealerCurrentCardValue;
   dealerHand.appendChild(dealerCardsImagesArray[dealerArrayCounter]);
   dealerArrayCounter++;
   for (let i = 0; i < dealerArrayCounter; i++) {
      dealerHand.appendChild(dealerCardsImagesArray[i]);
   }
   deckIndex++;
}

function dealHands(){
   for(let i=0;i<2;i++){
      dealerDrawCard();
      playerDrawCard();
   }

}

dealHands();

let held = false;
holdBtn.onclick = function () {
   holdBtn.disabled = true;
   held = true;
   check();

};

function winner(){
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;
   setTimeout(showResultScreen, 1000);
}

function check(){
   // Self Lose
   if (playerCurrentCardValue > 21) {
      document.getElementById("player-name").innerHTML += " - You lose!";
      currentChips = currentChips - currentBet;
      currentChipsField.innerHTML = currentChips;
      resultTitle.innerHTML = 'You lose';
      winner();
      
    
   }
   // Blackjack
   else if (playerCurrentCardValue == 21) {
      // calculate chips 
      document.getElementById("player-name").innerHTML += " - Blackjack!";
      currentChips = currentChips + currentBet;
      currentChipsField.innerHTML = currentChips;
      resultTitle.innerHTML = 'You win';

      winner();
   }


   // HELD
   else if(held){
      held = false;
      // less than player
      if(dealerCurrentCardValue<playerCurrentCardValue){
         while(dealerCurrentCardValue<playerCurrentCardValue){
            dealerDrawCard();
         }
      }
      // look for draw
      if(dealerCurrentCardValue==playerCurrentCardValue){
         winner();
         resultTitle.innerHTML = 'Draw';
      }
      // dealer exceed
      if(dealerCurrentCardValue>21){
         winner();
         resultTitle.innerHTML = 'You win';
      }
      // dealer won | NO BLACKJACK
      if(dealerCurrentCardValue<21 && dealerCurrentCardValue>playerCurrentCardValue){
         resultTitle.innerHTML = 'You lose';
         winner();
      }
      // dealer won |  BLACKJACK
      if(dealerCurrentCardValue==21){
         resultTitle.innerHTML = 'You lose';
         winner();
      }
     
      
   }
   
}



hitBtn.onclick = function () {
   playerDrawCard();
   check();
};



// PLAY AGAIN
function playAgain(){
   // clearing values 
   deckIndex = 0;
   holdBtn.disabled = false;
   shuffle(deck);
   // player
   playerArrayCounter= 0;
   playerCardsImagesArray = [];
   playerCurrentCardValue = 0;
   // dealer
   dealerArrayCounter= 0;
   dealerCardsImagesArray = [];
   dealerCurrentCardValue = 0;
   
   hitBtn.disabled = false;

   // clearing UI
   let removeChilds = function (node) {
      let last;
      while (last = playerHand.lastChild){
         playerHand.removeChild(last);
      }
      while (last = dealerHand.lastChild){
         dealerHand.removeChild(last);
      }
   };
   removeChilds();
   document.getElementById("player-name").innerHTML = "Player"
   document.getElementById("dealer-name").innerHTML = "Dealer"
   resultScreen.style.visibility = "hidden";
   dealHands(); 
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
