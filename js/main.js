  function newGame(){
    var game = {};
    game.fullDeck = createFullDeck();
    game.table = dealTable(game.fullDeck);
    game.isOver = function(){
      return game.table.foundationsPilesAreFull();
    };
    return game;
  }
  
  var game = newGame();
  game.table.moveCard(
    {
      originPile: game.table.piles[0],
      destinationPile: game.table.piles[1]
    }
  );
  
  console.log(game.table);
  
  
  
  //XX we can move cards 
  //XX we can check if a move is legal 
  //we need to set up the stock pile with methods?
  //the stock needs to rotate with the discard pile
  //XX the ...piles? need to get built up
  //XX we need to check for the winning condition 