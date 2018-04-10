  function newGame(){
    var game = {};
    game.fullDeck = createFullDeck();
    game.table = dealTable(game.fullDeck);
    game.isOver = false;
    return game;
  }
  
  var game = newGame();
  game.table.moveCard(
    {
      originDeck: game.table.foundations[0],
      destinationDeck: game.table.foundations[1]
    }
  );
  
  console.log(game.table);
  
  
  
  //XX every deck has the method addCard
  //XX every deck has the method takeTopCard
  //every deck has the method takeTopCards
  //cards need sufficient data to check for movability
  //every deck has private method canAddCard?
  //XX every has a readCard method
  
  //XX table has method moveCard