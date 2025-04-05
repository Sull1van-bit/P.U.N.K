document.addEventListener("DOMContentLoaded", () => {
    const hpElement = document.getElementById("hp");
    const hungerElement = document.getElementById("hunger");
    const happinessElement = document.getElementById("happiness");
    const energyElement = document.getElementById("energy");
    const hungerBar = document.getElementById("hunger-bar");

    let hp = parseInt(hpElement.textContent);
    let hunger = parseInt(hungerElement.textContent);
    let happiness = parseInt(happinessElement.textContent);
    let energy = parseInt(energyElement.textContent);
    let hungerValue = 40;

    function updateStats() {
        if (hunger < 20 || happiness < 20 || energy <= 0) {
            hp -= 5;
            if (hp < 0) hp = 0;
        }

        hpElement.textContent = hp;

        hunger -= 2;
        happiness -= 1;
        energy -= 1;

        if (hunger < 0) hunger = 0;
        if (happiness < 0) happiness = 0;
        if (energy < 0) energy = 0;

        hungerElement.textContent = hunger;
        happinessElement.textContent = happiness;
        energyElement.textContent = energy;

        if (hp === 0) {
            if (hunger <= 0) {
                showGameOverScreen("Game Over!\nYou starved to death!");
            } else if (happiness <= 0) {
                showGameOverScreen("Game Over!\nYou got depressed!");
            } else if (energy <= 0) {
                showGameOverScreen("Game Over!\nYou are terribly tired!");
            } else {
                showGameOverScreen("Game Over!\nYou died!");
            }
            clearInterval(gameLoop);
        }
    }

    function updateHungerBar() {
        hungerBar.style.width = `${hungerValue}%`;
        if (hungerValue <= 0) {
            hungerValue = 0;
            console.log("Character is starving!");
        }
    }

    function drainHunger() {
        hungerValue -= 1;
        if (hungerValue < 0) hungerValue = 0;
        updateHungerBar();
    }

    function eatFood(amount) {
        hungerValue += amount;
        if (hungerValue > 100) hungerValue = 100;
        updateHungerBar();
    }

    function showGameOverScreen(message) {
        const gameOverScreen = document.createElement("div");
        gameOverScreen.style.position = "fixed";
        gameOverScreen.style.top = "0";
        gameOverScreen.style.left = "0";
        gameOverScreen.style.width = "100%";
        gameOverScreen.style.height = "100%";
        gameOverScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        gameOverScreen.style.color = "white";
        gameOverScreen.style.display = "flex";
        gameOverScreen.style.flexDirection = "column";
        gameOverScreen.style.justifyContent = "center";
        gameOverScreen.style.alignItems = "center";
        gameOverScreen.style.fontSize = "2rem";
        gameOverScreen.style.zIndex = "1000";
        gameOverScreen.innerHTML = `
            <p>${message}</p>
            <button style="margin-top: 20px; padding: 10px 20px; font-size: 1rem;" onclick="location.reload()">Restart</button>
        `;
        document.body.appendChild(gameOverScreen);
    }

    const gameLoop = setInterval(updateStats, 1000);
    setInterval(drainHunger, 1000);

    document.addEventListener("keydown", (event) => {
        if (event.key === "e") {
            eatFood(20);
            console.log("Character ate food!");
        }
    });
});