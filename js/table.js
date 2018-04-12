function table(){
  
  function isValidMove({ movingCard, destinationCard }){
    if ( 
      movingCard.faceDown ||
      destinationCard.faceDown ||
      (movingCard.color === destinationCard.color ) ||
      (movingCard.cardValue != (destinationCard.cardValue - 1))
    ){
      console.log("invalid move");
      return false
    } else {
      return true;
    }  
  }
  
  var table = {
    stock: undefined, 
    foundations: [],
    offcast: undefined,
    /* each value in "stored" is a single card which can be overwritten if the directly next card in the same suit is put on top.
    */
    stored: {
      clubs: undefined,
      spades: undefined,
      diamonds: undefined,
      hearts: undefined
    },
    moveCard: function ({ originDeck, destinationDeck }){
      var movingCard = originDeck.peekAtCard();
      var destinationCard = destinationDeck.peekAtCard();
      if ( isValidMove({movingCard, destinationCard}) ){
        var card = originDeck.getTopCard();
        destinationDeck.addCard(card);
      }
    },
    moveCards: function ({ originDeck, topCardIndex, destinationDeck}){
      var topMovingCard = originDeck.peekAtCard(topCardIndex);
      var destinationCard = destinationDeck.peekAtCard();
      if ( isValidMove({movingCard: topMovingCard, destinationCard})){
        var cards = originDeck.getCards(topCardIndex);
        destinationDeck.addCards(cards);
      }
    },
    storedPilesAreFull: function(){
      var allStoredPilesAreFull = true;
      for (suit in this.stored){
        if (this.stored[suit].cardValue < 13){
          allStoredPilesareFull =  false;
        }
      }
      return allStoredPilesareFull;
    }
    storeCard: function({ originDeck }){
      var cardToBeStored = originDeck.peekAtCard();
      var lastStoredCardOfSuit = this.stored[cardToBeStored.suit];
      if ( cardToBeStored.cardValue  = lastStoredCardOfSuit.cardValue + 1 ){
        originDeck.getTopCard;
        this.stored[cardToBeStored.suit] = cardToBeStored;
      } else {
        console.log("that card cannot be stored yet.");
      }
    },
  };
  
  return table;
}

function dealTable(fullDeck){
  //deal the starter columns. 
  var dealtTable = table();
  
  for (var i = 0; i < 7; i++){
    for (var j = 0; j <= i; j++){
      if (!dealtTable.foundations[i]){
        var nextCard;
        dealtTable.foundations[i] = deck();
        nextCard = fullDeck.getTopCard();
        dealtTable.foundations[i].addCard(nextCard);
      } else {
        nextCard = fullDeck.getTopCard();
        dealtTable.foundations[i].addCard(nextCard);
      }
    }
  }

  dealtTable.stock = deck(fullDeck.cards);
  return dealtTable;
}