function dealTable(deck){
  //deal the starter columns. 
  var table = {
    stock: undefined, 
    foundations: [],
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
        table.foundations[i] = [];
        nextCard = deck.getTopCard();
        table.foundations[i].push(nextCard);
      } else {
        nextCard = deck.getTopCard();
        table.foundations[i].push(nextCard);
      }
    }
  }
  
  function moveCard(card){
    //store previous location
    //set card to active card
    //check possible locations with hover
    //set card down. adjust state.
  };
  table.stock = deck;
  return table;
}