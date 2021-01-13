
import {cards} from './cards.js'

// DECK BEHAVIOR
let deck = [];

function createDeck(){

    for(let i=0;i<4;i++){
        for(let j = 0;j<cards.length;j++){
            deck.push(cards[j]);
        }
    }   
    return deck;
}

deck = createDeck();

function shuffle(deck){
    for(let i=0;i<48;i++){
        let aux = deck[i];
        let randomIndex = Math.floor(Math.random() * 48);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = aux;
    } 
    return deck;
}

shuffle(deck);

// console.log(shuffle(deck));

export {deck};
// END OF DECK BEHAVIOR
