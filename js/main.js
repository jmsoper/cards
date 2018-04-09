document.addEventListener("DOMContentLoaded", function(event) { 
  function newGame(){
    var game = {};
    game.deck = createDeck();
    game.table = dealTable(game.deck);
    game.render = function() {
      return render(game.table);
    }
    game.isOver = false;
    return game;
  }
  
  var game = newGame();
  game.render();
    
});