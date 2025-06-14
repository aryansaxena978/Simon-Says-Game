let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;
let btns = ["red", "yellow", "green", "purple"];

const h4 = document.querySelector("#level-display");
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const btnContainer = document.querySelector(".btn-container");

// Sound effects
const sounds = {
    red: document.getElementById("red-sound"),
    yellow: document.getElementById("yellow-sound"),
    green: document.getElementById("green-sound"),
    purple: document.getElementById("purple-sound"),
    gameover: document.getElementById("gameover-sound"),
    levelup: document.getElementById("levelup-sound")
};

// Event Listeners
document.addEventListener("keypress", function() {
    if (!started) {
        startGame();
    }
});

startBtn.addEventListener("click", function() {
    if (!started) {
        startGame();
    }
});

resetBtn.addEventListener("click", resetGame);

const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Game Functions
function startGame() {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    btnContainer.classList.remove("game-over");
    levelUp();
}

function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h4.innerText = "Press any key to start";
    scoreDisplay.textContent = "0";
    btnContainer.classList.remove("game-over");
}

function playSound(color) {
    if (sounds[color]) {
        sounds[color].currentTime = 0;
        sounds[color].play();
    }
}

function gameBtnFlash(btn) {
    btn.classList.add("flash");
    playSound(btn.id);
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function userBtnFlash(btn) {
    btn.classList.add("userFlash");
    playSound(btn.id);
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h4.innerText = `Level ${level}`;
    scoreDisplay.textContent = level - 1;
    
    if (level - 1 > highScore) {
        highScore = level - 1;
    }
    
    // Random button selection with more variety
    let randIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    
    // Show sequence with delays
    showSequence();
}

function showSequence() {
    let i = 0;
    let interval = setInterval(() => {
        if (i >= gameSeq.length) {
            clearInterval(interval);
            return;
        }
        
        let btn = document.querySelector(`.${gameSeq[i]}`);
        setTimeout(() => {
            gameBtnFlash(btn);
        }, 200 * i);
        
        i++;
    }, 600);
}

function btnPress() {
    if (!started) return;
    
    let btn = this;
    userBtnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            sounds.levelup.play();
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    sounds.gameover.play();
    h4.innerHTML = `Game Over! Score: ${level - 1}<br>High Score: ${highScore}<br>Press any key to restart`;
    btnContainer.classList.add("game-over");
    started = false;
}
