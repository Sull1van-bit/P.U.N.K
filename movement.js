const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Gambar background
const background = new Image();
background.src = 'Map inti.png'; // pastikan file ini ada di direktori yang sama

const player = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  speed: 3,
  color: 'blue'
};

const box = {
  x: 300,
  y: 200,
  width: 20,
  height: 20,
  color: 'red'
};

const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  action: false
};

let message = "";
let messageTimer = 0;

// Daftar tembok yang jadi batasan
const walls = [
  { x: 0, y: 0, width: 50, height: 150 },
  { x: 100, y: 100, width: 200, height: 20 },
  { x: 350, y: 200, width: 20, height: 150 },
  { x: 200, y: 300, width: 100, height: 20 },
  
];

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') keys.up = true;
  if (e.key === 'ArrowDown' || e.key === 's') keys.down = true;
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;

  if (e.code === 'Space') {
    keys.action = true;
    if (isColliding(player, box)) {
      message = "Hallo";
      messageTimer = 120;
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') keys.up = false;
  if (e.key === 'ArrowDown' || e.key === 's') keys.down = false;
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
  if (e.code === 'Space') keys.action = false;
});

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function willCollide(nx, ny) {
  const temp = { x: nx, y: ny, width: player.width, height: player.height };
  return walls.some(wall => isColliding(temp, wall));
}

function update() {
  let nx = player.x;
  let ny = player.y;

  if (keys.up) ny -= player.speed;
  if (keys.down) ny += player.speed;
  if (keys.left) nx -= player.speed;
  if (keys.right) nx += player.speed;

  if (!willCollide(nx, player.y)) player.x = nx;
  if (!willCollide(player.x, ny)) player.y = ny;

  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

  if (messageTimer > 0) {
    messageTimer--;
    if (messageTimer === 0) {
      message = "";
    }
  }
}

function draw() {
  // gambar background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // gambar kotak merah
  ctx.fillStyle = box.color;
  ctx.fillRect(box.x, box.y, box.width, box.height);

  // gambar player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  if (message !== "") {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(message, 10, 30);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

background.onload = () => {
  gameLoop();
};
