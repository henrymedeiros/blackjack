import { deck, shuffle} from "./deck.js";

shuffle(deck);


let deckIndex = 0;
let playerCurrentCardValue = 0;
let dealerCurrentCardValue = 0;

let currentChips = 500;
let currentBet = 25;
let record = 0;
let winstreak = 0;

// gatheirng elements

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
let resetGameBtn = document.getElementById("reset-game")
let playAgainBtn = document.getElementById("play-again-btn");
// SCREENS
let resultScreen = document.getElementById("result-screen");
// UI Parts
let dealerHand = document.getElementById("dealer-cards");
let playerHand = document.getElementById("player-cards");

let totalDraws = 0;
let totalWins= 0;
let totalLosses = 0;

function initializeDataUI() {
   currentChipsField.innerHTML = currentChips;
   currentBetField.innerHTML = currentBet;
   recordField.innerHTML = record;
   winStreakField.innerHTML = winstreak;
}


initializeDataUI();


// MINUS BTN
function minus() {
   if (currentBet > 25) {
      currentBet -= 25;
      currentBetField.innerHTML = currentBet;
   }
}

minusBtn.onclick = function () {
   minus();
};
// PLUS BUTTON
function plus() {
   if (currentBet <= 75) {
      currentBet += 25;
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




let playerCardsImagesArray = [];
let dealerCardsImagesArray = [];

let playerArrayCounter = 0;
let dealerArrayCounter = 0;


// DRAWS
function playerDrawCard() {
   // ACE CHECK
   if(playerCurrentCardValue+deck[deckIndex].value>21 && deck[deckIndex].value==11){
      deck[deckIndex].value=1;
      console.log("CONVERTED ACE")
      
   }
   
   playerCurrentCardValue = playerCurrentCardValue + deck[deckIndex].value;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   playerCardsImagesArray.push(image);

   document.getElementById('player-name-span').innerHTML = playerCurrentCardValue;
   playerHand.appendChild(playerCardsImagesArray[playerArrayCounter]);
   playerArrayCounter++;
   for (let i = 0; i <playerArrayCounter; i++) {
      playerHand.appendChild(playerCardsImagesArray[i]); 
   }
   deckIndex++;
}


function dealerDrawCard() {
   // CONVER ACE
   if(dealerCurrentCardValue+deck[deckIndex].value>21 && deck[deckIndex].value==11){
      deck[deckIndex].value=1;
      console.log("CONVERTED ACE")  
   }

   dealerCurrentCardValue = dealerCurrentCardValue + deck[deckIndex].value;
   let image = document.createElement("img");
   image.src = deck[deckIndex].img;
   image.id = deckIndex;
   dealerCardsImagesArray.push(image);
   
   document.getElementById('dealer-name-span').innerHTML = dealerCurrentCardValue;
   dealerHand.appendChild(dealerCardsImagesArray[dealerArrayCounter]);
   dealerArrayCounter++;
   for (let i = 0; i < dealerArrayCounter; i++) {
      dealerHand.appendChild(dealerCardsImagesArray[i]);
   }
   deckIndex++;

}

function turnCardDown(){
   let image = document.getElementById("2");
   image.src = "assets/cards/back.svg"
}

function turnCardUp(){
   let image = document.getElementById("2");
   image.src = deck[2].img;
}

function dealHands(){
   
   for(let i=0;i<2;i++){
      dealerDrawCard();
      if(i==1){
         turnCardDown();
         document.getElementById('dealer-name-span').innerHTML = dealerCurrentCardValue-  deck[2].value;
      }
      playerDrawCard();
   }


}

dealHands();

let held = false;
holdBtn.onclick = function () {
         
         checkBetConditions();
         if(forbiddenBet==1){
            return alert("You have to place a bet.");
         }
         if(forbiddenBet==3){
            return alert("Can't place that bet, lower it");
         }
         else if(forbiddenBet==0){
            holdBtn.disabled = true;
            held = true;
            turnCardUp();
            check(); 
         }
}

function winner(blackjackWin){
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;
   
   if(blackjackWin===1){
      resultTitle.innerHTML = 'Blackjack!';
      currentChips = currentChips + (currentBet*3);
      currentChipsField.innerHTML = currentChips;
   }
   else{
      resultTitle.innerHTML = 'You win';
      currentChips = currentChips + currentBet;
      currentChipsField.innerHTML = currentChips;
      
   }
   totalWins++;
   totalWinsField.innerHTML = totalWins;
   setTimeout(showResultScreen, 1000);
   
}

function draw(){
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;
   resultTitle.innerHTML = "It's a draw!";
   setTimeout(showResultScreen, 1000);
   totalDraws++;
   totalDrawsField.innerHTML = totalDraws;
}

function loser(){
   hitBtn.disabled = true;
   playerFinalScoreField.innerHTML = playerCurrentCardValue;
   dealerFinalScoreField.innerHTML = dealerCurrentCardValue;
   resultTitle.innerHTML = 'You lose';
   currentChips = currentChips - currentBet;
   currentChipsField.innerHTML = currentChips;
   setTimeout(showResultScreen, 1000);
   totalLosses++;
   totalLossesField.innerHTML = totalLosses;

}

let forbiddenBet = 0;
function checkBetConditions(){
   if(currentBet==0){
      forbiddenBet = 1;
   }
   else if(currentChips==0){
      forbiddenBet = 2;
   }
   else if(currentBet>currentChips){
      forbiddenBet = 3
   }
   else if(currentBet>0){
      hitBtn.disabled = false;
      forbiddenBet = 0;
   }
   else if(currentChips>25){
      hitBtn.disabled = false;
      forbiddenBet = 0;
   }
   
}

// Double BTN
function double(){
   currentBet = currentBet*2;
   currentBetField.innerHTML = currentBet;
   doubleBtn.disabled = true;
}

doubleBtn.onclick = function () {
   double();
}

function check(){
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
   else if(held){
      held = false;
      if(dealerCurrentCardValue==playerCurrentCardValue){
         draw();
      }
      // less than player
      if(dealerCurrentCardValue<playerCurrentCardValue){
         while(dealerCurrentCardValue<playerCurrentCardValue){
            dealerDrawCard();
         }
      }
      // look for draw
      if(dealerCurrentCardValue==playerCurrentCardValue){
         let decide = Math.random() * (2 - 0) +0
         if(decide<1){
            dealerDrawCard();
            
         }
         else{
            draw();
            resultTitle.innerHTML = 'Draw';
            
         }  
      }
      // dealer exceed
      if(dealerCurrentCardValue>21){
         winner(0);
         resultTitle.innerHTML = 'You win';
      }
      // dealer won | NO BLACKJACK
      if(dealerCurrentCardValue<21 && dealerCurrentCardValue>playerCurrentCardValue){
         resultTitle.innerHTML = 'You lose';
         loser();
      }
      // dealer won |  BLACKJACK
      if(dealerCurrentCardValue==21){
         resultTitle.innerHTML = 'You lose';
         loser();
      }
      // normal win
      if(playerCurrentCardValue<21 && playerCurrentCardValue>dealerCurrentCardValue){
         winner(0);
      }
   }
   
}



hitBtn.onclick = function () {
         checkBetConditions();
         if(forbiddenBet==1){
            return alert("You have to place a bet.");
         }
         if(forbiddenBet==3){
            return alert("Can't place that bet, lower it");
         }
         else if(forbiddenBet==0){
            playerDrawCard();
            check();
         }
         minusBtn.disabled = true;
         plusBtn.disabled = true;
};



// PLAY AGAI
function playAgain(){
   // clearing values 
   checkBetConditions();
   if(forbiddenBet==2){
      holdBtn.disabled = true;
      hitBtn.disabled = true;
      return alert("You have no chips - Reset the game!")
   }
   deckIndex = 0;
   holdBtn.disabled = false;
   minusBtn.disabled = false;
   plusBtn.disabled = false;
   doubleBtn.disabled = false;
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
   document.getElementById("player-name-span").innerHTML = ""
   document.getElementById("dealer-name-span").innerHTML = ""
   resultScreen.style.visibility = "hidden";
   dealHands(); 
}

playAgainBtn.onclick = function () {playAgain();};




// RESET GAME

function resetGame() {
   currentChips = 500;
   currentBet= 25;
}

function resetGameUI() {
   currentChipsField.innerHTML = 500;
   currentBetField.innerHTML = 0;
}

resetGameBtn.onclick = function () {
   resetGame();
   resetGameUI();
  
};

// RESET DATA
function resetData() {
   currentChips = 500;
   currentBet= 0;
   record= 0;
   winstreak = 0;
   totalLosses = 0;
   totalWins = 0;
   totalDraws = 0;
}

function resetDataUI() {
   currentChipsField.innerHTML = 500;
   currentBetField.innerHTML = 0;
   recordField.innerHTML = 0;
   winStreakField.innerHTML = 0;
   totalLossesField.innerHTML = 0;
   totalWinsField.innerHTML = 0;
   totalDrawsField.innerHTML = 0;
}

resetDataBtn.onclick = function () {
   resetData();
   resetDataUI();
   
};




// HOLD BUTTON
