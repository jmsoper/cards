function deck(cards) {
  var cardDeck = {};
  cardDeck.cards = cards || [];
  cardDeck.getTopCard = function(){
    var topCard = this.cards[0];
    this.cards = this.cards.slice(1);
    return topCard;
  }
  cardDeck.addCard = function(card){
    this.cards.push(card);
  }
  cardDeck.peekAtCard = function(cardNumber){
    var index = cardNumber || 0;
    return this.cards[index];
  }
  return cardDeck;
}

function createFullDeck(){
  var fullDeck = deck();
  fullDeck.cards = shuffleDeckInPlace(getAllCards());

  function getAllCards(){
    var suits = [
      { name: "spades", color: "black" }, 
      { name: "hearts", color: "red"},
      { name: "clubs", color: "black" },
      { name: "diamonds", color: "red"}
    ];
    var allCardsDeck = [];
    
    function getCardType(cardNumber){
      var cardName;
      switch (cardNumber){
        case 1:
          cardName = "ace";
          break;
        case 11: 
          cardName = "jack";
          break;
        case 12:
          cardName = "queen";
          break;
        case 13:
          cardName = "king";
          break;
        default:
          cardName = cardNumber;
      }
      return cardName;
    }
    
    for (var i = 0; i < suits.length; i++){
      for (var j = 1; j < 14; j++){
        var cardName = getCardType(j);
        var card = {
          color: suits[i].color,
          cardName,
          suit: suits[i].name,
          faceDown: true,
          cardNumber: j,
        };
        allCardsDeck.push(card);
      }
    }
    return allCardsDeck;
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
  return fullDeck;
}