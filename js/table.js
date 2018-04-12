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
    piles: [],
    offcast: undefined,
    /* each value in "foundations" is a single card which can be overwritten if the directly next card in the same suit is put on top.
    */
    foundations: {
      clubs: undefined,
      spades: undefined,
      diamonds: undefined,
      hearts: undefined
    },
    moveCard: function ({ originPile, destinationPile }){
      var movingCard = originPile.peekAtCard();
      var destinationCard = destinationPile.peekAtCard();
      if ( isValidMove({movingCard, destinationCard}) ){
        var card = originPile.getTopCard();
        destinationPile.addCard(card);
      }
    },
    moveCards: function ({ originPile, topCardIndex, destinationPile}){
      var topMovingCard = originPile.peekAtCard(topCardIndex);
      var destinationCard = destinationPile.peekAtCard();
      if ( isValidMove({movingCard: topMovingCard, destinationCard})){
        var cards = originPile.getCards(topCardIndex);
        destinationPile.addCards(cards);
      }
    },
    foundationsAreFull: function(){
      var allFoundationsAreFull = true;
      for (suit in this.foundations){
        if (this.foundations[suit].cardValue < 13){
          allFoundationsareFull =  false;
        }
      }
      return allFoundationsareFull;
    },
    storeCard: function({ originPile }){
      var cardToBeStored = originPile.peekAtCard();
      var lastStoredCardOfSuit = this.foundations[cardToBeStored.suit];
      if ( cardToBeStored.cardValue  = lastStoredCardOfSuit.cardValue + 1 ){
        originPile.getTopCard;
        this.foundations[cardToBeStored.suit] = cardToBeStored;
      } else {
        console.log("that card cannot be added to the foundation yet.");
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
      if (!dealtTable.piles[i]){
        var nextCard;
        dealtTable.piles[i] = deck();
        nextCard = fullDeck.getTopCard();
        dealtTable.piles[i].addCard(nextCard);
      } else {
        nextCard = fullDeck.getTopCard();
        dealtTable.piles[i].addCard(nextCard);
      }
    }
  }

  dealtTable.stock = deck(fullDeck.cards);
  return dealtTable;
}