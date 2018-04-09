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
    }
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
  function isLegalMove({ activeCard, orign, destination }){
    return true;
  }

  table.stock = deck(fullDeck.cards);
  return table;
}