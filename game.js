document.addEventListener("DOMContentLoaded", function(event) { 
  function newGame(){
    var game = {};
    game.deck = createDeck();
    game.board = dealTable(game.deck);
    game.isOver = false;

    return game;
  }
  // generate and shuffle deck ******************************************
  function createDeck(){
    var deck = {};
    var cards = getAllCards();
    var shuffledCards = shuffleDeckInPlace(cards);
    deck.cards = shuffledCards;
    deck.getTopCard = function(){
      var topCard = this.cards[0];
      this.cards = this.cards.slice(1);
      return topCard;
    }
  
    function getAllCards(){
      var suits = ["spades", "hearts", "clubs", "diamonds"];
      var deck = [];
      
      function getCardType(cardNumber){
        var cardFace;
        switch (cardNumber){
          case 1:
            cardFace = "ace";
            break;
          case 11: 
            cardFace = "jack";
            break;
          case 12:
            cardFace = "queen";
            break;
          case 13:
            cardFace = "king";
            break;
          default:
            cardFace = cardNumber;
        }
        return cardFace;
      }
      
      for (var i = 0; i < suits.length; i++){
        for (var j = 1; j < 14; j++){
          var cardFace = getCardType(j);
          var card = { cardFace, suit: suits[i]};
          deck.push(card);
        }
      }
      return deck;
    }
    //shuffle the cards so that they're random. Use fisher-bates.
    function shuffleDeckInPlace(cardDeck){
      function swapCards(firstCardIdx, secondCardIdx){
        var initialFirstCard = cardDeck[firstCardIdx];
        cardDeck[firstCardIdx] = cardDeck[secondCardIdx];
        cardDeck[secondCardIdx] = initialFirstCard;
      }
      function randomIndex(sliceStart, sliceEnd) {
        return Math.floor(Math.random() * ( sliceEnd - sliceStart + 1)) + sliceStart;
      }
      
      for (var deckIndexToBeSet = 0; deckIndexToBeSet < cardDeck.length - 1; deckIndexToBeSet++) {
        var chosenCardIndex = randomIndex(deckIndexToBeSet, cardDeck.length - 1);
      
        if (chosenCardIndex !== deckIndexToBeSet){
          swapCards(deckIndexToBeSet, chosenCardIndex);
        }
      }
      
      return cardDeck;
    }
    return deck;
  }
  //********************************************************
  //paint the cards.
  function drawCard(givenCard){
    var cardSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var cardId = card.suit + card.cardFace;
    cardSVG.setAttribute("stroke","black");
    cardSVG.setAttribute("id", cardId);
    cardSVG.setAttribute("fill", "white");
    cardSVG.setAttribute("height", "65");
    cardSVG.setAttribute("width", "45");

    
    document.body.appendChild(cardSVG);
    
    var paths = {
      spade: "M26,48 L20,48 L20,49 L18,49 L18,48 L17,48 L17,42 L29,42 L29,48 L28,48 L28,49 L26,49 L26,48 Z M19,39 L27,39 L27,42 L19,42 L19,39 Z M22.1165764,36 L24.1165764,36 L24.1165764,39 L22.1165764,39 L22.1165764,36 Z M22.1165764,48 L24.1165764,48 L24.1165764,54 L22.1165764,54 L22.1165764,48 Z",
      outline: "M1.5,62.5 L43.5,62.5 L43.5,1.5 L1.5,1.5 L1.5,62.5 Z M0.5,62.75 L0.5,62.5 L0.5,1 L0.5,0.75 L0.5,0.5 L1,0.5 L43.5,0.5 L43.75,0.5 L44.5,0.5 L44.5,1 L44.5,62.5 L44.5,62.75 L44.5,63.5 L44,63.5 L1,63.5 L0.5,63.5 L0.5,62.75 Z"
    }
    
    var cardGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var cardGroupId = cardId + "-group";
    cardGroup.setAttribute("id", cardGroupId);
    document.getElementById(cardId).appendChild(cardGroup);
    
    var cardOutline = document.createElementNS("http://www.w3.org/2000/svg","path");
    cardOutline.setAttribute("stroke","gray");
    cardOutline.setAttribute("fill", "black");
    cardOutline.setAttribute("stroke-width", 3);
    cardOutline.setAttribute("d", paths["outline"]);
    document.getElementById(cardGroupId).appendChild(cardOutline);
  
    var cardSuit = document.createElementNS("http://www.w3.org/2000/svg","path");
    cardSuit.setAttribute("stroke","black");
    cardSuit.setAttribute("fill", "black");
    cardSuit.setAttribute("d", paths[card.suit]);
    document.getElementById(cardGroupId).appendChild(cardSuit);
    
    var cardFace = document.createElementNS("http://www.w3.org/2000/svg","text");
    cardFace.textContent = card.cardFace;
    cardFace.setAttribute("fill", "black");
    cardFace.setAttribute("x", "3");

    cardFace.setAttribute("y", "20");

    document.getElementById(cardGroupId).appendChild(cardFace);
  
  }
  
  function dealTable(deck){
    //deal the starter columns. 
    var table = {
      stack: undefined, 
      foundations: [],
      stored: {clubs: undefined,
        spades: undefined,
        diamonds: undefined,
        hearts: undefined}
      };
    
    for (var i = 0; i < 7; i++){
      for (var j = 0; j <= i; j++){
        if (!table.foundations[i]){
          table.foundations[i] = [];
          table.foundations[i].push(deck.getTopCard());
        } else {
          table.foundations[i].push(deck.getTopCard());
        }
      }
    }
    table.stack = deck;
    return table;
  }
  
  
  
  //get the remaining count for the deck. 
    
});