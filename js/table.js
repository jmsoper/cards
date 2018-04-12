function dealTable(fullDeck){
  //deal the starter columns. 
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
    moveCard: moveCard,
    moveCards: moveCards
  };
  
  for (var i = 0; i < 7; i++){
    for (var j = 0; j <= i; j++){
      if (!table.foundations[i]){
        var nextCard;
        table.foundations[i] = deck();
        nextCard = fullDeck.getTopCard();
        table.foundations[i].addCard(nextCard);
      } else {
        nextCard = fullDeck.getTopCard();
        table.foundations[i].addCard(nextCard);
      }
    }
  }
  function moveCard({ originDeck, destinationDeck }){
    var movingCard = originDeck.peekAtCard();
    var destinationCard = destinationDeck.peekAtCard();
    if ( isValidMove({movingCard, destinationCard}) ){
      var card = originDeck.getTopCard();
      destinationDeck.addCard(card);
    }
  }
  
  function moveCards({ originDeck, topCardIndex, destinationDeck}){
    var topMovingCard = originDeck.peekAtCard(topCardIndex);
    var destinationCard = destinationDeck.peekAtCard();
    if ( isValidMove({movingCard: topMovingCard, destinationCard})){
      var cards = originDeck.getCards(topCardIndex);
      destinationDeck.addCards(cards);
    }
  }
  
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

  table.stock = deck(fullDeck.cards);
  return table;
}