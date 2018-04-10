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
  
  
  
  //XX every deck has the method addCard
  //XX every deck has the method takeTopCard
  //every deck has the method takeTopCards
  //every deck has private method canAddCard?
  //every has a readCard method
  
  //XX table has method moveCard