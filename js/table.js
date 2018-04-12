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
    /* each value in "foundations" is a single card which can be overwritten if the directly next card in the same suit is put on top.
    */
    foundations: {
      clubs: undefined,
      spades: undefined,
      diamonds: undefined,
      hearts: undefined
    },
    moveCard: function ({ originPile, destinationPile }){
      //we don't need to check for movingCard index because it's only one card.
      var movingCard = originPile.readCard();
      var destinationCard = destinationPile.readCard();
      if ( isValidMove({ movingCard, destinationCard }) ){
        var card = originPile.takeCard();
        destinationPile.addCard(card);
      }
    },
    moveCards: function ({ originPile, numberOfCards, destinationPile}){
      var topMovingCard = originPile.readCard(originPile.length - numberOfCards);
      var destinationCard = destinationPile.readCard();
      if ( isValidMove({movingCard: topMovingCard, destinationCard})){
        var cards = originPile.takeCard(numberOfCards);
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
      var cardToBeStored = originPile.readCard();
      var lastStoredCardOfSuit = this.foundations[cardToBeStored.suit];
      if ( cardToBeStored.cardValue  = lastStoredCardOfSuit.cardValue + 1 ){
        originPile.takeCard();
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
        nextCard = fullDeck.takeCard();
        dealtTable.piles[i].addCard(nextCard);
      } else {
        nextCard = fullDeck.takeCard();
        dealtTable.piles[i].addCard(nextCard);
      }
    }
  }
  //this is a mess...
  dealtTable.stock = stock();
  while (fullDeck.length){
    var leftoverCard = fullDeck.takeCard();
    dealtTable.stock.addCard(leftoverCard);
  }
  return dealtTable;
}
