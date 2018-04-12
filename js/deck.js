function deck(givenCards) {
  var cardDeck = {};
  var cards = givenCards || [];
  cardDeck.length = cards.length;
  cardDeck.flipCard = function(card){
    card.faceDown = !card.faceDown;
  }
  cardDeck.setTopCard = function(){
    var index = cards.length - 1;
    var topCard = cards[index];
    return topCard;
  }
  cardDeck.readCard = function(cardIndex){
    var index = cardIndex || 0;
    return cards[index];
  }
  cardDeck.topCard = cardDeck.setTopCard();
  cardDeck.takeCard = function(numberOfCards){
    /* decks which are piles will be rendered from zero (the topmost, furthest back card),
    to the last index, the frontmost card which is visible.
    So the topmost card in a stack of cards you want to move
    (named such for clarity in game movement),
    if it's three cards back from the frontmost card,
    is located at arrayLength - topCardIndex.
    */
    var sliceDepth = numberOfCards || 1;
    if (sliceDepth > this.length){
      return Error('number of cards asked for exceeded length of deck.');
    }

    var topOfTakenStack = cards[this.length - sliceDepth];
    var takenCards = cards.slice(this.length - sliceDepth);
    cards = cards.slice(sliceDepth);
    this.length = cards.length;
    this.setTopCard();

    return takenCards;
  }
  cardDeck.addCard = function(card){
    cards.push(card);
    this.length = cards.length;
    this.topCard = this.setTopCard();
  }
  cardDeck.addCards = function(cards){
    this.cards = cards + this.cards;
  }

  return cardDeck;
}

function stock(givenCards){
  //the stock can only take one card out at a time.
  //the stock has its own pile, the castoff stack.
  var stock = deck(givenCards);
  //initialize the castoff pile as a deck.
  stock.castOff = deck();
  stock.revealCard = function(){
    if (stock.length){
      //show a new card and move it into the castoff pile
      var nextCard = stock.takeCard(1);
      stock.castOff.addCard(nextCard);
    } else if (stock.castOff.length){
      //rotate the cards in the castoff pile back into the stock.
      while (stock.castOff.length){
        var card = stock.castOff.takeCard();
        stock.addCard(card);
      }
    }
  }
  return stock;
}

function createFullDeck(){
  var shuffledCards = shuffleDeckInPlace(getAllCards());
  var fullDeck = deck(shuffledCards);

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
