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
        var card = { cardFace, suit: suits[i], faceUp: false };
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