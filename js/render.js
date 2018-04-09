function buildCard(card){
  var cardImage = document.createElement("div");
  cardImage.classList.add("card");
  
  var image = document.createElement("div");
  image.setAttribute("style", "background-image: url('./images/" + card.suit + ".svg');");
  image.classList.add("card-suit");
  
  var cardFace = document.createElement("p");
  cardFace.innerHTML = String(card.cardFace).slice(0,1);
  cardFace.classList.add("card-face");
  
  cardImage.appendChild(image);
  cardImage.appendChild(cardFace);
  
  return cardImage;
}

function render(table){
  //check each of the seven stacks in table.foundations() and render them. 
  for (var i = 0; i < table.foundations.length; i++){
    var givenColumn = document.getElementById("column-" + i);
    while (givenColumn.firstChild) {
      givenColumn.removeChild(givenColumn.firstChild);
    }
    for (var j = 0; j < table.foundations[i].length; j++){
      var cardSVG = buildCard(table.foundations[i][j]);
      var cardYPosition = "top: " + (j * 18 + 2) + "px;";
      cardSVG.setAttribute("style", cardYPosition);
      givenColumn.appendChild(cardSVG);
    }
  }
  
  if (table.stock.cards.length){
    //first just display the top card in stock.
    var cardSVG = buildCard(table.stock.getTopCard());
    var cardYPosition = "top: " + 2 + "px;";
    cardSVG.setAttribute("style", cardYPosition);
    document.getElementById("stock").appendChild(cardSVG);
    //then make a stack that shows revealed cards, and pull off of stock.
    //they should cycle back and forth.
  }
  
  // if (stored){
  //   //check against each of these stacks in stored. all we need to retain is the top card.
  //   //each of these values will always be a single card. display the card.
  // }
}