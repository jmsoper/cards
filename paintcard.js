document.addEventListener("DOMContentLoaded", function(){
  
  var card = { suit: "spade", cardFace: "jack", faceUp: true };
  
  function drawCard(givenCard){
    var cardSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var cardId = card.suit + card.cardFace;
    cardSVG.setAttribute("stroke","black");
    cardSVG.setAttribute("id", cardId);
    cardSVG.setAttribute("fill", "white");
    
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
    cardFace.setAttribute("x", "10");

    cardFace.setAttribute("y", "20");

    document.getElementById(cardGroupId).appendChild(cardFace);
  
  }
  
  drawCard(card);
});