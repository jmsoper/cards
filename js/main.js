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
  
  
  
  //we can move cards 
  //we can check if a move is legal 
  //we need to set up the stock pile with methods?
  //the stock needs to rotate with the discard pile
  //the ...foundations? need to get built up
  //the 