document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the selected character from localStorage
  const selectedCharacter = JSON.parse(localStorage.getItem("selectedCharacter"));

  if (selectedCharacter) {
    // Update the character image
    const characterImage = document.querySelector("#left-panel img");
    characterImage.src = `${selectedCharacter.directory}idle.gif`; // Load the idle animation
    characterImage.alt = selectedCharacter.name;

    // Optionally, display the character's name or description
    console.log(`Playing as ${selectedCharacter.name}: ${selectedCharacter.description}`);
  } else {
    // If no character is selected, redirect back to the main page
    window.location.href = "index.html";
  }
});