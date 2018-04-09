document.addEventListener("DOMContentLoaded", function(event) { 
  function newGame(){
    var game = {};
    game.deck = createDeck();
    game.board = dealTable(game.deck);
    game.isOver = false;
    console.log(game.board);
    return game;
  }
  
  function render(){
    
  }
  
  
  newGame();
    
});