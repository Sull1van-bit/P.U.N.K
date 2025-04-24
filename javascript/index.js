window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // BG Music
  const music = document.getElementById('background-music');
  music.volume = 0.5;
  music.play().catch(error => {
    console.log('Music playback failed:', error);
  });
});

function playClickSound() {
  const clickSound = document.getElementById('click-sound');
  clickSound.currentTime = 0; // Restart Button sound
  clickSound.play().catch(error => {
    console.log('Click sound playback failed:', error);
  });
}

function startGame() {
  console.log("startGame function called"); // Debugging log
  document.body.classList.add('fading-out');
  setTimeout(() => {
    const titleContainer = document.querySelector('.game-title-container');
    const startButton = document.querySelector('.start-button');
    const characterSelection = document.getElementById('character-selection');

    console.log("Hiding title container and start button");
    titleContainer.classList.add('hidden'); // Hide the logo container
    startButton.classList.add('hidden'); // Hide the Start button
    startButton.style.display = 'none'; // Force hide the Start button
    console.log("Showing character selection");
    characterSelection.classList.remove('hidden'); // Show the character selection
    document.body.classList.remove('fading-out');
  }, 500); // Match the fade-out duration
}

function goBack() {
  // Tambahkan efek fade out
  document.body.classList.add('fading-out');

  setTimeout(() => {
    // Sembunyikan pemilihan karakter dan tampilkan layar utama
    document.getElementById('character-selection').classList.add('hidden'); // Sembunyikan pemilihan karakter
    const titleContainer = document.querySelector('.game-title-container');
    const startButton = document.querySelector('.start-button');

    titleContainer.classList.remove('hidden'); // Tampilkan logo container
    startButton.classList.remove('hidden'); // Tampilkan tombol Start
    startButton.style.display = 'flex'; // Pastikan tombol Start terlihat

    // Hapus efek fade out setelah selesai
    document.body.classList.remove('fading-out');
  }, 500); // Durasi fade out (sesuai dengan CSS transition)
}

let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const titles = ["Defrina", "Binar", "Purpla"];
const descriptions = [
  "Defrina is a composed and tactical presence in Bratindra, dressed in a practical yet sharp ensemble that hints at both professionalism and readiness for action. With her crisp white shirt, red tie, tactical vest, and short gray skirt, she balances corporate influence with street-smart survival. Her knee-high black boots signal that she’s always prepared to step into the city’s unpredictable chaos.",
  
  "Binar is a resourceful survivor in Bratindra, blending tradition with high-tech. Dressed in a tactical jacket with crimson accents, she thrives as a fixer and hacker in a neon-lit metropolis of holograms and digital vendors.",
  
  "Purpla is a bold and enigmatic presence in the neon-soaked streets of Bratindra. With her striking purple hair and futuristic attire, she exudes confidence and adaptability. Her outfit blends sleek cyberpunk aesthetics with practical elements, preparing her for anything—from high-stakes negotiations to daring escapes. Purpla thrives in the shadows, navigating the bustling markets and the city's underbelly with ease."
];

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  document.getElementById('image-title').textContent = titles[index];
  document.getElementById('image-description').textContent = descriptions[index];
  document.getElementById('selected-character-name').textContent = titles[index]; // Update the button text
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function playerChar() {
  const selectedCharacter = {
    name: titles[currentIndex],
    directory: `/P.U.N.K/asset/${titles[currentIndex]}/`, // Save the character's directory
    description: descriptions[currentIndex],
  };

  // Save the selected character to localStorage
  localStorage.setItem("selectedCharacter", JSON.stringify(selectedCharacter));

  // Redirect to game page
  window.location.href = "game.html";
}

function toggleMusic() {
  const music = document.getElementById('background-music');
  const musicControl = document.getElementById('music-control');

  if (music.paused) {
    music.play();
    musicControl.classList.remove('music-off');
  } else {
    music.pause();
    musicControl.classList.add('music-off');
  }
}