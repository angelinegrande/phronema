// Get references to HTML elements
var userInput = document.getElementById("userInput");
var addButton = document.getElementById("addButton");
var outputElement = document.getElementById("outputElement");

// Add an event listener to the button
addButton.addEventListener("click", function () {
  // Get the user input
  var text = userInput.value;

  // Check if the input is not empty
  if (text.trim() !== "") {
    // Create a new card element
    var card = document.createElement("div");
    card.className = "card";

    // Create a card body
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    

    // Create a card text element
    var cardText = document.createElement("p");
    cardText.className = "card-text";

    // Replace newline characters with <br> elements for line breaks
    text = text.replace(/\n/g, "<br>");
    cardText.innerHTML = text;

    // Append the card text to the card body
    cardBody.appendChild(cardText);

    // Append the card body to the card
    card.appendChild(cardBody);

    // Append the card to the output element
    outputElement.appendChild(card);

    // Clear the textarea
    userInput.value = "";
  }
});
